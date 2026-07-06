import { useState } from 'react';
import { useApi } from '@shared/hooks/useApi';
import api from '@shared/api/axios';
import { Search, Filter, CheckCircle2, XCircle, Clock, Eye, AlertCircle, FileText } from 'lucide-react';

export default function AdmissionsPage() {
  const [activeTab, setActiveTab] = useState('pending'); // pending, approved, rejected
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, loading, error, refetch } = useApi('/admin/admissions', {
    params: {
      status: activeTab,
      search: searchQuery || undefined
    }
  });

  const applications = data?.results || [];

  const handleReview = async (status) => {
    if (!selectedApplication) return;
    setIsSubmitting(true);
    try {
      await api.put(`/admin/admissions/${selectedApplication._id}/review`, {
        status,
        notes: reviewNotes
      });
      setSelectedApplication(null);
      setReviewNotes('');
      refetch();
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to update application status.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'pending', label: 'Pending Review', icon: Clock, color: 'text-amber-500 bg-amber-50' },
    { id: 'approved', label: 'Approved', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
    { id: 'rejected', label: 'Rejected', icon: XCircle, color: 'text-rose-500 bg-rose-50' }
  ];

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Admissions Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Review student admission requests, inspect uploads, and approve enrollment.</p>
        </div>
      </div>

      {/* Main Panel */}
      <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex bg-slate-100/50 p-1 rounded-lg">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedApplication(null);
                }}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-white text-sky-700 shadow-sm ring-1 ring-slate-900/5' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search applications..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Content list */}
        <div className="overflow-x-auto flex-1">
          {loading ? (
            <div className="p-12 text-center text-slate-500">Loading applications...</div>
          ) : error ? (
            <div className="p-12 text-center text-rose-500 flex flex-col items-center justify-center gap-2">
              <AlertCircle className="w-8 h-8" />
              <span>{error}</span>
            </div>
          ) : applications.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              No applications found in this status.
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/50 text-slate-500 sticky top-0">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Phone</th>
                  <th className="px-6 py-3 font-medium">Documents</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map(app => (
                  <tr key={app._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 font-semibold text-slate-800">{app.name}</td>
                    <td className="px-6 py-4 text-slate-600">{app.email}</td>
                    <td className="px-6 py-4 text-slate-500">{app.phone || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded text-xs font-medium text-slate-600">
                        <FileText className="w-3.5 h-3.5" />
                        {app.documents?.length || 0} files
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedApplication(app)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-medium rounded-lg transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Application Review</h3>
              <button 
                onClick={() => setSelectedApplication(null)}
                className="text-slate-400 hover:text-slate-600 font-medium"
              >
                Close
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Applicant Name</span>
                <p className="font-semibold text-slate-800 text-base">{selectedApplication.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email</span>
                  <p className="text-slate-700 text-sm">{selectedApplication.email}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Phone</span>
                  <p className="text-slate-700 text-sm">{selectedApplication.phone || 'N/A'}</p>
                </div>
              </div>

              {selectedApplication.notes && (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Applicant Notes</span>
                  <p className="text-slate-600 bg-slate-50 p-3 rounded-lg text-sm italic">{selectedApplication.notes}</p>
                </div>
              )}

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Uploaded Documents</span>
                {selectedApplication.documents && selectedApplication.documents.length > 0 ? (
                  <div className="mt-2 space-y-2">
                    {selectedApplication.documents.map((doc, idx) => (
                      <a 
                        key={idx}
                        href={doc}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sky-600 text-sm font-medium"
                      >
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span>Document #{idx + 1}</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm mt-1">No documents uploaded.</p>
                )}
              </div>

              {activeTab === 'pending' && (
                <div className="pt-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Review Decision Notes
                  </label>
                  <textarea 
                    rows="3"
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Enter approval details or reason for rejection..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all resize-none"
                  />
                </div>
              )}
            </div>

            {activeTab === 'pending' ? (
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
                <button
                  disabled={isSubmitting}
                  onClick={() => handleReview('rejected')}
                  className="px-4 py-2 border border-rose-200 hover:bg-rose-50 text-rose-700 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
                >
                  Reject Application
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={() => handleReview('approved')}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50 shadow-sm"
                >
                  Approve & Admit
                </button>
              </div>
            ) : (
              <div className="p-6 bg-slate-50 border-t border-slate-100 text-right">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                  activeTab === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                }`}>
                  {activeTab === 'approved' ? 'Approved & Enrolled' : 'Rejected'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
