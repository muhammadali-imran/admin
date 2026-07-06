import { useState } from 'react';
import { useApi } from '@shared/hooks/useApi';
import { UserCheck, ShieldCheck, XCircle, Search, Filter, Plus, Calendar, DollarSign } from 'lucide-react';

const mockLeaves = [
  { id: 1, name: 'Bob Smith', role: 'Instructor', type: 'Sick Leave', duration: 'Jul 10 - Jul 12 (3 days)', reason: 'Medical appointment & recovery', status: 'Pending' },
  { id: 2, name: 'Evan Wright', role: 'Instructor', type: 'Casual Leave', duration: 'Jul 15 (1 day)', reason: 'Personal family matter', status: 'Pending' },
  { id: 3, name: 'Diana Prince', role: 'Administrator', type: 'Annual Leave', duration: 'Aug 01 - Aug 07 (7 days)', reason: 'Summer holiday trip', status: 'Approved' }
];

export default function HRPage() {
  const { data: usersData, loading, error } = useApi('/admin/users', { params: { role: 'instructor' } });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('directory'); // directory, leaves
  const [leavesList, setLeavesList] = useState(mockLeaves);

  const staff = usersData?.results || [];

  const handleLeaveAction = (id, action) => {
    setLeavesList(prev => prev.map(leave => 
      leave.id === id ? { ...leave, status: action } : leave
    ));
  };

  const filteredStaff = staff.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Staff & HR Portal</h1>
          <p className="text-sm text-slate-500 mt-1">Manage employee records, oversee monthly payroll, and review leave applications.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('directory')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'directory' ? 'border-sky-600 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Staff Directory & Payroll
        </button>
        <button 
          onClick={() => setActiveTab('leaves')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'leaves' ? 'border-sky-600 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Leave Management
        </button>
      </div>

      {activeTab === 'directory' ? (
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm flex flex-col overflow-hidden">
          {/* Search bar */}
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Active Staff Registry</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search staff..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center text-slate-500">Loading staff records...</div>
            ) : error ? (
              <div className="p-12 text-center text-rose-500">{error}</div>
            ) : filteredStaff.length === 0 ? (
              <div className="p-12 text-center text-slate-500">No staff members found.</div>
            ) : (
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50/50 text-slate-500">
                  <tr>
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Role</th>
                    <th className="px-6 py-3 font-medium">Hourly / Base Salary</th>
                    <th className="px-6 py-3 font-medium">Payroll Month</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStaff.map(member => (
                    <tr key={member._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-800">{member.name}</td>
                      <td className="px-6 py-4 text-slate-600 capitalize">{member.role}</td>
                      <td className="px-6 py-4 text-slate-800 font-bold">$4,500 / month</td>
                      <td className="px-6 py-4 text-slate-500">July 2026</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold">
                          ● Paid
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-bold text-slate-800">Leave Requests</h2>
          <div className="space-y-4">
            {leavesList.map(request => (
              <div key={request.id} className="border border-slate-150 rounded-2xl p-5 hover:shadow-sm transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800">{request.name}</h3>
                    <span className="text-xs text-slate-400 font-medium">({request.role})</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{request.type}:</span>
                    <span>{request.duration}</span>
                  </div>
                  <p className="text-sm text-slate-500 italic mt-1">Reason: "{request.reason}"</p>
                </div>

                <div className="flex items-center gap-3">
                  {request.status === 'Pending' ? (
                    <>
                      <button 
                        onClick={() => handleLeaveAction(request.id, 'Rejected')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-rose-200 text-rose-700 hover:bg-rose-50 font-medium text-xs rounded-lg transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                      <button 
                        onClick={() => handleLeaveAction(request.id, 'Approved')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm"
                      >
                        <UserCheck className="w-4 h-4" />
                        Approve
                      </button>
                    </>
                  ) : (
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      request.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {request.status === 'Approved' ? '✓ Approved' : '✗ Rejected'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
