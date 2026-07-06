import { useState } from 'react';
import { Download, Search, Filter, DollarSign, TrendingUp, AlertCircle, CheckCircle2, ArrowUpRight } from 'lucide-react';

const mockTransactions = [
  { id: 'TRX-8921', student: 'Alice Johnson', date: '2026-07-01', amount: 1200, type: 'Tuition Fee', status: 'Completed' },
  { id: 'TRX-8922', student: 'Charlie Davis', date: '2026-07-02', amount: 300, type: 'Library Fee', status: 'Pending' },
  { id: 'TRX-8923', student: 'Fiona Gallagher', date: '2026-07-03', amount: 1200, type: 'Tuition Fee', status: 'Completed' },
  { id: 'TRX-8924', student: 'David Kim', date: '2026-07-03', amount: 150, type: 'Lab Fee', status: 'Overdue' },
  { id: 'TRX-8925', student: 'Emma Watson', date: '2026-07-04', amount: 1200, type: 'Tuition Fee', status: 'Completed' },
];

export default function FinancePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Finance Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Track fee collections, manage invoices, and monitor financial health.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$124,500', trend: '+12%', icon: DollarSign, color: 'text-sky-600', bg: 'bg-sky-100' },
          { label: 'Pending Payments', value: '$8,400', trend: '-2%', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-100' },
          { label: 'Overdue Fees', value: '$2,150', trend: '+5%', icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-100' },
          { label: 'Collection Rate', value: '94%', trend: '+1%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                kpi.trend.startsWith('+') && kpi.label !== 'Overdue Fees' ? 'bg-emerald-50 text-emerald-600' : 
                kpi.label === 'Overdue Fees' && kpi.trend.startsWith('+') ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
              }`}>
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
          <div className="flex items-center gap-3 w-full sm:w-auto">
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
            <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
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
                <th className="px-6 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockTransactions.map(trx => (
                <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-700">{trx.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{trx.student}</td>
                  <td className="px-6 py-4 text-slate-500">{trx.date}</td>
                  <td className="px-6 py-4 text-slate-600">{trx.type}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">${trx.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                      trx.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 
                      trx.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {trx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-md transition-all inline-flex items-center gap-1 text-xs font-medium">
                      View <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
