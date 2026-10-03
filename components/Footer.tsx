import { PERSONAL_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-hair bg-void">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {PERSONAL_INFO.name}
        </p>
        <div className="flex gap-6">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-ice">
            GitHub
          </a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ice">
            LinkedIn
          </a>
          <a href={PERSONAL_INFO.resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ice">
            Resume
          </a>
          <a href="#home" className="hover:text-ice">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
