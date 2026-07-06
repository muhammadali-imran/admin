// src/components/PageHeader.jsx
export default function PageHeader({ icon, title, description, children, className = '' }) {
  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}>
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h2>
        {description && <p className="text-slate-500 text-sm mt-1">{description}</p>}
      </div>
      {children}
    </div>
  )
}