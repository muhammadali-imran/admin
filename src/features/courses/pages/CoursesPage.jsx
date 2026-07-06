import { useState } from 'react';
import { Search, Plus, MoreHorizontal, BookOpen, Users, Clock } from 'lucide-react';

const mockCourses = [
  { id: 1, title: 'Introduction to Computer Science', level: 'Grade 10', teacher: 'Evan Wright', students: 45, status: 'Active', image: 'bg-indigo-500' },
  { id: 2, title: 'Advanced Calculus', level: 'Grade 12', teacher: 'Bob Smith', students: 32, status: 'Active', image: 'bg-emerald-500' },
  { id: 3, title: 'World History', level: 'Grade 9', teacher: 'Not Assigned', students: 0, status: 'Draft', image: 'bg-amber-500' },
  { id: 4, title: 'Physics Fundamentals', level: 'Grade 11', teacher: 'Bob Smith', students: 28, status: 'Active', image: 'bg-sky-500' },
  { id: 5, title: 'Creative Writing', level: 'Grade 10', teacher: 'Evan Wright', students: 22, status: 'Active', image: 'bg-rose-500' },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = mockCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Course Catalog</h1>
          <p className="text-sm text-slate-500 mt-1">Manage courses, assign teachers, and monitor enrollments.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm shadow-sky-600/20">
          <Plus className="w-4 h-4" />
          Create Course
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex bg-slate-100/50 p-1 rounded-lg">
          {['All Courses', 'Active', 'Drafts'].map(tab => (
            <button
              key={tab}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                tab === 'All Courses' 
                  ? 'bg-white text-sky-700 shadow-sm ring-1 ring-slate-900/5' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search courses..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            <div className={`h-32 w-full ${course.image} relative p-4 flex flex-col justify-between`}>
              <div className="flex justify-between items-start">
                <span className={`px-2 py-1 rounded-md text-xs font-semibold backdrop-blur-sm ${
                  course.status === 'Active' ? 'bg-white/20 text-white' : 'bg-black/20 text-white'
                }`}>
                  {course.status}
                </span>
                <button className="text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1 rounded-md backdrop-blur-sm transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-xs font-medium text-sky-600 mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{course.level}</span>
              </div>
              
              <h3 className="font-bold text-lg text-slate-800 leading-tight mb-4 group-hover:text-sky-600 transition-colors">
                {course.title}
              </h3>
              
              <div className="mt-auto space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Instructor</span>
                  <span className={`font-medium ${course.teacher === 'Not Assigned' ? 'text-amber-500' : 'text-slate-700'}`}>
                    {course.teacher}
                  </span>
                </div>
                
                <div className="w-full h-px bg-slate-100" />
                
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>{course.students} Enrolled</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>12 Weeks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200/60 border-dashed">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-slate-900">No courses found</h3>
          <p className="text-sm text-slate-500 mt-1">Try adjusting your search query.</p>
        </div>
      )}
    </div>
  );
}
