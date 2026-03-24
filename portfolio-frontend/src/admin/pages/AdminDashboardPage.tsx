import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getDashboardStats, type DashboardStats } from "../../api/dashboardApi";
import { getRecentAuditLogs, type AuditLog } from "../../api/auditApi";

function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, logsData] = await Promise.all([
          getDashboardStats(),
          getRecentAuditLogs(),
        ]);

        setStats(statsData);
        setLogs(logsData);
      } catch (error) {
        console.error("Error cargando dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
            Resumen general del portfolio, visitas y actividad administrativa reciente.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <p className="text-sm text-zinc-400">Proyectos</p>
            <h2 className="mt-3 text-4xl font-bold">
              {loading ? "--" : stats?.totalProjects ?? 0}
            </h2>
            <p className="mt-2 text-sm text-zinc-500">Total de proyectos registrados</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <p className="text-sm text-zinc-400">Visitas totales</p>
            <h2 className="mt-3 text-4xl font-bold">
              {loading ? "--" : stats?.totalViews ?? 0}
            </h2>
            <p className="mt-2 text-sm text-zinc-500">Visualizaciones acumuladas</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <p className="text-sm text-zinc-400">Eventos recientes</p>
            <h2 className="mt-3 text-4xl font-bold">
              {loading ? "--" : logs.length}
            </h2>
            <p className="mt-2 text-sm text-zinc-500">Últimos cambios registrados</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
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
            <h3 className="text-xl font-semibold">Auditoría reciente</h3>

            <div className="mt-4 space-y-3">
              {loading ? (
                <p className="text-sm text-zinc-500">Cargando actividad...</p>
              ) : logs.length === 0 ? (
                <p className="text-sm text-zinc-500">No hay eventos registrados todavía.</p>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <p className="text-sm font-medium text-white">
                      {log.action} · {log.entityName} #{log.entityId}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">{log.userEmail}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboardPage;