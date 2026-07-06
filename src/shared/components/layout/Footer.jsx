import Logo from '@shared/components/ui/logo';

export default function Footer() {
  return (
    <footer className="py-8 px-5 sm:px-8 lg:px-16 border-t border-slate-200 bg-white font-mozilla">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-xs text-slate-400 ml-2">
            © {new Date().getFullYear()} EduFlow. All rights reserved.
          </span>
        </div>
        <nav className="flex gap-6 text-sm text-slate-500">
          <a href="#" className="hover:text-navy font-medium">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-navy font-medium">
            Terms of Service
          </a>
          <a href="#" className="hover:text-navy font-medium">
            Support
          </a>
          <a href="#" className="hover:text-navy font-medium flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
            Twitter
          </a>
        </nav>
      </div>
    </footer>
  );
}