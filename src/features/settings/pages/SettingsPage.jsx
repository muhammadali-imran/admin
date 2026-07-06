import { Save, Settings2, Bell, Shield, Calendar, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full space-y-6 max-w-5xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Configure academic structure, notifications, and platform access.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm shadow-sky-600/20">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            {[
              { label: 'General', icon: Settings2, active: true },
              { label: 'Academic Structure', icon: Calendar, active: false },
              { label: 'Roles & Permissions', icon: Shield, active: false },
              { label: 'Notifications', icon: Bell, active: false },
              { label: 'Payment Integrations', icon: CreditCard, active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  item.active 
                    ? 'bg-sky-50 text-sky-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${item.active ? 'text-sky-600' : 'text-slate-400'}`} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">General Configuration</h2>
              <p className="text-sm text-slate-500">Manage basic school information and branding.</p>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">School Name</label>
                  <input type="text" defaultValue="Digital School Institute" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Support Email</label>
                  <input type="email" defaultValue="support@digitalschool.edu" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Primary Domain</label>
                <input type="text" defaultValue="app.digitalschool.edu" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">Academic Features</h2>
              <p className="text-sm text-slate-500">Toggle platform modules for students and teachers.</p>
            </div>
            <div className="p-5 space-y-4">
              {[
                { title: 'Self-Enrollment', desc: 'Allow students to enroll in active courses without admin approval.' },
                { title: 'Public Course Catalog', desc: 'Make course list visible before user authentication.' },
                { title: 'Teacher Grading', desc: 'Enable grading features in the Studio app for assigned teachers.' }
              ].map((setting, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{setting.title}</p>
                    <p className="text-sm text-slate-500">{setting.desc}</p>
                  </div>
                  <button className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${idx === 1 ? 'bg-slate-200' : 'bg-sky-500'}`}>
                    <span className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform absolute ${idx === 1 ? 'left-1' : 'translate-x-6'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
