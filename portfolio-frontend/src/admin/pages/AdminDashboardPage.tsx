import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_24%),linear-gradient(to_bottom_right,#09090b,#111827,#000000)] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
            Admin
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">
            Dashboard
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Panel administrativo con resumen general, auditoría y métricas del portfolio.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <p className="text-sm text-zinc-400">Visitas totales</p>
            <h2 className="mt-3 text-4xl font-bold">--</h2>
            <p className="mt-2 text-sm text-zinc-500">Próximamente conectado al backend</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <p className="text-sm text-zinc-400">Últimas modificaciones</p>
            <h2 className="mt-3 text-4xl font-bold">--</h2>
            <p className="mt-2 text-sm text-zinc-500">Auditoría administrativa</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <p className="text-sm text-zinc-400">Accesos admin</p>
            <h2 className="mt-3 text-4xl font-bold">--</h2>
            <p className="mt-2 text-sm text-zinc-500">Actividad reciente</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Accesos rápidos</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin/projects"
                className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-medium text-white shadow-lg transition hover:scale-[1.02]"
              >
                Gestionar proyectos
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <h3 className="text-xl font-semibold">Auditoría</h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li>• Último login admin: --</li>
              <li>• Último proyecto editado: --</li>
              <li>• Última publicación: --</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboardPage;