// ────────────────────────────────────────────────────────────
// File: src/components/landing/Logo.jsx
// ────────────────────────────────────────────────────────────

export default function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #4F92FF 0%, #5CB8B2 50%, #F3B000 100%)',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10.5V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h8" />
          <path d="M22 14l-4 4-2-2" />
          <path d="M2 6l10 6 4-2.5" />
        </svg>
      </div>
      <span className="text-xl font-extrabold text-navy tracking-tight font-raleway">
        EduFlow
      </span>
    </div>
  );
}