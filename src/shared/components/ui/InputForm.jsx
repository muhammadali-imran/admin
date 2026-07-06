/**
 * Reusable controlled form field with label, error, and optional hint.
 * Works with React Hook Form via the `registration` prop or as a standalone controlled input.
 *
 * <InputForm
 *   label="Email address"
 *   type="email"
 *   placeholder="you@school.edu"
 *   registration={register('email')}
 *   error={errors.email?.message}
 *   hint="We'll never share your email."
 *   required
 * />
 *
 * Or standalone:
 * <InputForm label="Search" value={q} onChange={(e) => setQ(e.target.value)} />
 */
export default function InputForm({
  label,
  type = 'text',
  placeholder,
  registration,   // from react-hook-form register()
  error,
  hint,
  required = false,
  disabled = false,
  value,
  onChange,
  rows,           // for textarea
  className = '',
  inputClassName = '',
  children,       // slot for custom input (select, etc.)
}) {
  const hasError = Boolean(error)

  const baseInput = `w-full px-4 py-3 rounded-xl border text-slate-800 text-sm placeholder-slate-400
    outline-none transition-shadow disabled:bg-slate-50 disabled:cursor-not-allowed
    ${hasError
      ? 'border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100'
    }`

  const id = label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {children ?? (
        type === 'textarea' ? (
          <textarea
            id={id}
            rows={rows || 4}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={onChange}
            className={`${baseInput} resize-y ${inputClassName}`}
            {...registration}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={onChange}
            className={`${baseInput} ${inputClassName}`}
            {...registration}
          />
        )
      )}

      {hint && !hasError && (
        <p className="text-xs text-slate-400">{hint}</p>
      )}
      {hasError && (
        <p role="alert" className="text-xs text-red-600">{error}</p>
      )}
    </div>
  )
}
