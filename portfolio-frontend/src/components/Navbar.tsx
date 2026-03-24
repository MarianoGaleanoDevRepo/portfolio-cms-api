import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-violet-400">
            Portfolio CMS
          </p>
          <h1 className="text-lg font-semibold text-white">
            Admin Panel
          </h1>
        </div>

        <nav className="hidden items-center gap-3 md:flex">
          <Link
            to="/admin"
            className="rounded-xl px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/projects"
            className="rounded-xl px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            Proyectos
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2 sm:block">
            <p className="text-sm text-zinc-300">{email}</p>
            <p className="text-xs text-zinc-500">{role}</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:border-violet-500 hover:bg-zinc-800"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;