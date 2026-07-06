import { useState } from 'react';
import { useApi } from '@shared/hooks/useApi';
import api from '@shared/api/axios';
import { Download, Search, DollarSign, TrendingUp, AlertCircle, CheckCircle2, ArrowUpRight, Plus, Loader2 } from 'lucide-react';

export default function FinancePage() {
  const { data: financeData, loading, error, refetch } = useApi('/admin/finance');
  const { data: studentsData } = useApi('/admin/users', { params: { role: 'student' } });

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetStudentId, setTargetStudentId] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [invoiceDueDate, setInvoiceDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const summary = financeData?.data || {
    totalRevenue: 0,
    monthlyRevenue: 0,
    pendingPayments: 0,
    overdueRevenue: 0,
    collectionRate: 100,
    transactions: [],
  };

  const students = studentsData?.results || [];

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    if (!targetStudentId || !invoiceAmount) {
      alert('Student and Amount are required.');
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post('/admin/finance/invoices', {
        userId: targetStudentId,
        amount: parseFloat(invoiceAmount),
        dueDate: invoiceDueDate || undefined,
      });
      setIsModalOpen(false);
      setTargetStudentId('');
      setInvoiceAmount('');
      setInvoiceDueDate('');
      refetch();
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to generate invoice.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTransactions = summary.transactions.filter(t => 
    t.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Finance Management</h1>
          <p className="text-sm text-slate-500 mt-1">Track fee collections, manage invoices, and monitor financial health.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm shadow-sky-600/20"
          >
            <Plus className="w-4 h-4" />
            Generate Invoice
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading financial summaries...</div>
      ) : error ? (
        <div className="text-center py-12 text-rose-500">{error}</div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Revenue', value: `$${summary.totalRevenue.toLocaleString()}`, trend: 'Lifetime', icon: DollarSign, color: 'text-sky-600', bg: 'bg-sky-100' },
              { label: 'Revenue This Month', value: `$${summary.monthlyRevenue.toLocaleString()}`, trend: 'This Month', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
              { label: 'Pending Payments', value: `$${summary.pendingPayments.toLocaleString()}`, trend: 'Outstanding', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-100' },
              { label: 'Collection Rate', value: `${summary.collectionRate}%`, trend: 'Paid vs Issued', icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-100' },
            ].map((kpi, i) => (
              <div key={i} className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                    <kpi.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                    {kpi.trend}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">{kpi.label}</p>
                  <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{kpi.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Main Panel */}
          <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg font-bold text-slate-800">Recent Transactions</h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50/50 text-slate-500 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 font-medium">Transaction ID</th>
                    <th className="px-6 py-3 font-medium">Student</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Type</th>
                    <th className="px-6 py-3 font-medium">Amount</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map(trx => (
                      <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4 font-medium text-slate-750">{trx.id}</td>
                        <td className="px-6 py-4 font-semibold text-slate-800">{trx.student}</td>
                        <td className="px-6 py-4 text-slate-500">{trx.date}</td>
                        <td className="px-6 py-4 text-slate-600">{trx.type}</td>
                        <td className="px-6 py-4 font-bold text-slate-800">${trx.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold">
                            Completed
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                        No transactions recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Generate Fee Invoice</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-medium"
              >
                Close
              </button>
            </div>
            
            <form onSubmit={handleCreateInvoice} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Select Student *</label>
                <select 
                  required
                  value={targetStudentId}
                  onChange={(e) => setTargetStudentId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                >
                  <option value="">-- Select Student --</option>
                  {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Amount ($) *</label>
                <input 
                  type="number" 
                  required
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(e.target.value)}
                  placeholder="e.g. 1200"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Due Date</label>
                <input 
                  type="date" 
                  value={invoiceDueDate}
                  onChange={(e) => setInvoiceDueDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                />
              </div>

              <div className="pt-4 flex gap-3 justify-end border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-medium text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
