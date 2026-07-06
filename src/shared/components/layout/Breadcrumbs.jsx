import { Link, useLocation } from 'react-router-dom'

/** Map raw path segments to human-readable labels */
const LABELS = {
  dashboard:     'Dashboard',
  courses:       'Courses',
  'my-courses':  'My Courses',
  classroom:     'Classroom',
  lectures:      'Lecture',
  'lecture-history': 'Lecture History',
  elearning:     'E-Learning',
  quizzes:       'Quizzes',
  assignments:   'Assignments',
  attendance:    'Attendance',
  grades:        'Grades',
  schedule:      'Schedule',
  library:       'Library',
  discussions:   'Discussions',
  fees:          'Fees',
  pay:           'Pay',
  history:       'History',
  profile:       'Profile',
  settings:      'Settings',
  feedback:      'Feedback',
  bookmarks:     'Bookmarks',
  about:         'About',
  privacy:       'Privacy',
  terms:         'Terms',
  support:       'Support',
  result:        'Result',
}

const isUUID = (s) => /^[0-9a-f-]{8,}$/i.test(s)
const isNumeric = (s) => /^\d+$/.test(s)

/**
 * Auto-generates breadcrumbs from the current URL path.
 * Place inside any layout to get contextual breadcrumbs.
 *
 * <Breadcrumbs />
 * <Breadcrumbs overrides={{ '/courses/42': 'Introduction to React' }} />
 */
export default function Breadcrumbs({ overrides = {}, className = '' }) {
  const { pathname } = useLocation()

  const segments = pathname.split('/').filter(Boolean)

  const crumbs = segments.reduce((acc, seg, idx) => {
    const path = '/' + segments.slice(0, idx + 1).join('/')
    const label =
      overrides[path] ||
      LABELS[seg] ||
      (isUUID(seg) || isNumeric(seg) ? '#' + seg : seg.replace(/-/g, ' '))

    acc.push({ path, label })
    return acc
  }, [])

  if (!crumbs.length) return null

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1.5 text-sm ${className}`}>
      <Link to="/dashboard" className="text-slate-400 hover:text-slate-600 transition-colors">
        🏠
      </Link>
      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1
        return (
          <span key={crumb.path} className="flex items-center gap-1.5">
            <span className="text-slate-300">/</span>
            {isLast ? (
              <span className="text-slate-700 font-medium capitalize">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path}
                className="text-slate-400 hover:text-slate-600 capitalize transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
