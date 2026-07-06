import { useState } from 'react';
import { useApi } from '@shared/hooks/useApi';
import api from '@shared/api/axios';
import { Calendar as CalendarIcon, Clock, MapPin, User, Plus, Trash2, AlertCircle } from 'lucide-react';

export default function SchedulePage() {
  const { data: scheduleData, loading, error, refetch } = useApi('/admin/schedule');
  const { data: coursesData } = useApi('/admin/courses');
  const { data: usersData } = useApi('/admin/users', { params: { role: 'instructor' } });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [classroom, setClassroom] = useState('');
  const [recurrence, setRecurrence] = useState('none');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const events = scheduleData?.results || [];
  const courses = coursesData?.results || [];
  const instructors = usersData?.results || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !courseId || !instructorId || !startTime || !endTime) {
      alert('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post('/admin/schedule', {
        title,
        courseId,
        instructorId,
        startTime,
        endTime,
        classroom,
        recurrence
      });
      setIsModalOpen(false);
      setTitle('');
      setCourseId('');
      setInstructorId('');
      setStartTime('');
      setEndTime('');
      setClassroom('');
      setRecurrence('none');
      refetch();
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to create schedule event.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this schedule event?')) return;
    try {
      await api.delete(`/admin/schedule/${id}`);
      refetch();
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to delete event.');
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Master Timetable</h1>
          <p className="text-sm text-slate-500 mt-1">Configure and schedule classes, allocate instructors, and assign classrooms.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm shadow-sky-600/20"
        >
          <Plus className="w-4 h-4" />
          Schedule Class
        </button>
      </div>

      {/* Grid List of Scheduled Events */}
      <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Scheduled Classes</h2>
        
        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading schedule...</div>
        ) : error ? (
          <div className="text-center py-12 text-rose-500 flex flex-col items-center justify-center gap-2">
            <AlertCircle className="w-8 h-8" />
            <span>{error}</span>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            No classes scheduled yet. Click the button above to schedule your first class.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="border border-slate-150 rounded-2xl p-5 hover:shadow-md transition-shadow relative group">
                <button
                  onClick={() => handleDelete(event._id)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                  title="Delete event"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-sky-50 text-sky-700 mb-3">
                  {event.courseId?.title || 'General'}
                </span>
                <h3 className="font-bold text-slate-800 text-base mb-3 pr-6">{event.title}</h3>
                
                <div className="space-y-2 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>
                      {new Date(event.startTime).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })} - {new Date(event.endTime).toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{event.instructorId?.name || 'Assigned Instructor'}</span>
                  </div>
                  {event.classroom && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Room {event.classroom}</span>
                    </div>
                  )}
                  {event.recurrence && event.recurrence !== 'none' && (
                    <span className="inline-block mt-2 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full capitalize">
                      🔁 {event.recurrence}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Schedule Class Session</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-medium"
              >
                Close
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Session Title *</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Lecture 1: Intro to Physics"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Select Course *</label>
                <select 
                  required
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                >
                  <option value="">-- Choose Course --</option>
                  {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Select Instructor *</label>
                <select 
                  required
                  value={instructorId}
                  onChange={(e) => setInstructorId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                >
                  <option value="">-- Choose Instructor --</option>
                  {instructors.map(ins => <option key={ins._id} value={ins._id}>{ins.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Start Time *</label>
                  <input 
                    type="datetime-local" 
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">End Time *</label>
                  <input 
                    type="datetime-local" 
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Classroom / Location</label>
                  <input 
                    type="text" 
                    value={classroom}
                    onChange={(e) => setClassroom(e.target.value)}
                    placeholder="e.g. Lab 3B, Online"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Recurrence</label>
                  <select 
                    value={recurrence}
                    onChange={(e) => setRecurrence(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  >
                    <option value="none">One Time</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
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
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm disabled:opacity-50"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
