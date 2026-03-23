import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

type Project = {
  id: number;
  title: string;
  shortDescription: string;
  description?: string;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  published?: boolean;
};

function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error cargando proyecto:", error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 p-10 text-white">
        Cargando proyecto...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_24%),linear-gradient(to_bottom_right,#09090b,#111827,#000000)] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => navigate("/projects")}
          className="mb-8 rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-violet-500 hover:text-white"
        >
          ← Volver
        </button>

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
          <div className="h-[360px] w-full bg-zinc-900">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-zinc-500">
                Sin imagen
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="mb-4 flex flex-wrap gap-3">
              {project.featured && (
                <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                  ★ Destacado
                </span>
              )}

              {project.published ? (
                <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Publicado
                </span>
              ) : (
                <span className="rounded-full border border-zinc-600/30 bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300">
                  Borrador
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>

            <p className="mt-4 text-lg text-zinc-400">
              {project.shortDescription}
            </p>

            <div className="mt-8">
              <h2 className="mb-3 text-xl font-semibold">Descripción</h2>
              <p className="leading-8 text-zinc-300">
                {project.description || "Sin descripción adicional."}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-violet-500 hover:text-white"
                >
                  GitHub
                </a>
              )}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg"
                >
                  Ver demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;