import { Link } from "react-router-dom";

function PublicNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-violet-400">
            Portfolio
          </p>
          <h1 className="text-lg font-semibold text-white">
            Mariano Galeano
          </h1>
        </div>

        <nav className="flex items-center gap-3">
          <Link
            to="/"
            className="rounded-xl px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            Inicio
          </Link>
          <Link
            to="/admin"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-violet-500 hover:text-white"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default PublicNavbar;