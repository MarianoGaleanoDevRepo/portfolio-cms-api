import { useNavigate } from "react-router-dom";

type ProjectCardProps = {
  id: number;
  title: string;
  shortDescription: string;
  imageUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  adminMode?: boolean;
};

function ProjectCard({
  id,
  title,
  shortDescription,
  imageUrl,
  githubUrl,
  demoUrl,
  featured,
  onDelete,
  onEdit,
  adminMode = false,
}: ProjectCardProps) {
  const navigate = useNavigate();

  return (
    <div className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-[0_20px_80px_-20px_rgba(124,58,237,0.35)]">
      <div
        onClick={() => navigate(`/projects/${id}`)}
        className="cursor-pointer"
      >
        <div className="relative h-52 w-full overflow-hidden bg-zinc-900">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-900 to-black text-zinc-500">
              Sin imagen
            </div>
          )}

          {featured && (
            <div className="absolute left-4 top-4">
              <span className="rounded-full border border-violet-400/20 bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-300 backdrop-blur">
                ★ Destacado
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            {title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">
            {shortDescription}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-white/10 px-6 pb-6 pt-2">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-violet-500 hover:text-white"
          >
            GitHub
          </a>
        )}

        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-[1.02]"
          >
            Demo
          </a>
        )}

        {adminMode && (
          <>
            <button
              onClick={() => onEdit?.(id)}
              className="rounded-xl border border-amber-400/20 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300 transition hover:bg-amber-500/20"
            >
              Editar
            </button>

            <button
              onClick={() => onDelete?.(id)}
              className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;