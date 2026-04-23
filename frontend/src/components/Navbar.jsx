import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkClasses = (path) =>
    `px-4 py-2 rounded-xl text-sm font-medium ${
      location.pathname === path
        ? "bg-indigo-100 text-indigo-600"
        : "text-slate-500 hover:text-slate-700"
    }`;

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          ABGS
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/" className={linkClasses("/")}>
            Dashboard
          </Link>
          <Link to="/checkin" className={linkClasses("/checkin")}>
            Check-In
          </Link>
          <Link to="/summary" className={linkClasses("/summary")}>
            Summary
          </Link>
        </div>
      </div>
    </nav>
  );
}