import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import PublicNavbar from "../components/PublicNavbar";

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
  views?: number;
  videoUrl?: string;
  gallery?: string;
  categoryName?: string | null;
};

function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        await api.post(`/projects/${id}/view`);
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error cargando proyecto:", error);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_24%),linear-gradient(to_bottom_right,#09090b,#111827,#000000)] text-white">
        <PublicNavbar />
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
            Cargando proyecto...
          </div>
        </div>
      </div>
    );
  }

  const galleryImages = project.gallery
    ? project.gallery
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean)
    : [];

  const embedVideoUrl = project.videoUrl
    ? project.videoUrl.includes("watch?v=")
      ? project.videoUrl.replace("watch?v=", "embed/")
      : project.videoUrl
    : "";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_24%),linear-gradient(to_bottom_right,#09090b,#111827,#000000)] text-white">
      <PublicNavbar />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <button
          onClick={() => navigate("/")}
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

              {project.categoryName && (
                <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-300">
                  {project.categoryName}
                </span>
              )}

              <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                👁 {project.views ?? 0} visitas
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight">
              {project.title}
            </h1>

            <p className="mt-4 text-lg text-zinc-400">
              {project.shortDescription}
            </p>

            <div className="mt-8">
              <h2 className="mb-3 text-xl font-semibold">Descripción</h2>
              <p className="leading-8 text-zinc-300">
                {project.description || "Sin descripción adicional."}
              </p>
            </div>

            {embedVideoUrl && (
              <div className="mt-10">
                <h2 className="mb-4 text-xl font-semibold">Video</h2>
                <iframe
                  className="h-[400px] w-full rounded-2xl border border-white/10"
                  src={embedVideoUrl}
                  title="Video del proyecto"
                  allowFullScreen
                />
              </div>
            )}

            {galleryImages.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-4 text-xl font-semibold">Galería</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {galleryImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Galería ${i + 1}`}
                      className="rounded-2xl border border-white/10 object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

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
      </main>
    </div>
  );
}

export default ProjectDetailPage;