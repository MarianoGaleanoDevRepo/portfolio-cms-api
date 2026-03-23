import { useEffect, useState } from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import {
  createProject,
  type Project,
  updateProject,
} from "../api/projectApi";

type NewProjectModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  projectToEdit?: Project | null;
};

function NewProjectModal({
  open,
  onClose,
  onCreated,
  projectToEdit,
}: NewProjectModalProps) {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isEditMode = !!projectToEdit;

  const resetForm = () => {
    setTitle("");
    setShortDescription("");
    setDescription("");
    setGithubUrl("");
    setDemoUrl("");
    setImageUrl("");
    setFeatured(false);
    setPublished(true);
    setImageError(false);
  };

  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title || "");
      setShortDescription(projectToEdit.shortDescription || "");
      setDescription(projectToEdit.description || "");
      setGithubUrl(projectToEdit.githubUrl || "");
      setDemoUrl(projectToEdit.demoUrl || "");
      setImageUrl(projectToEdit.imageUrl || "");
      setFeatured(!!projectToEdit.featured);
      setPublished(projectToEdit.published ?? true);
      setImageError(false);
    } else {
      resetForm();
    }
  }, [projectToEdit, open]);

  if (!open) return null;

  

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        title,
        shortDescription,
        description,
        githubUrl,
        demoUrl,
        imageUrl,
        featured,
        published,
      };

      if (isEditMode && projectToEdit) {
        await updateProject(projectToEdit.id, payload);
      } else {
        await createProject(payload);
      }

      resetForm();
      onCreated();
      onClose();
    } catch (error) {
      console.error("Error guardando proyecto:", error);
      alert(
        isEditMode
          ? "No se pudo actualizar el proyecto"
          : "No se pudo crear el proyecto"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-md">
      <div className="w-full max-w-4xl">
        <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
                {isEditMode ? "Editar proyecto" : "Nuevo proyecto"}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                {isEditMode ? "Modificar proyecto" : "Crear proyecto"}
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                {isEditMode
                  ? "Actualiza los datos del proyecto seleccionado."
                  : "Completa los datos para agregar un nuevo proyecto."}
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 px-3 py-2 text-sm text-zinc-300 transition hover:border-violet-500 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  placeholder="Título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                  placeholder="Imagen URL"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImageError(false);
                  }}
                />
              </div>

              <div className="mt-4">
                <Input
                  placeholder="Descripción corta"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <Textarea
                  placeholder="Descripción completa"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Input
                  placeholder="GitHub URL"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />

                <Input
                  placeholder="Demo URL"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                />
              </div>

              <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-sm text-zinc-300">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                    />
                    Destacado
                  </label>

                  <label className="flex items-center gap-2 text-sm text-zinc-300">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                    />
                    Publicado
                  </label>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full md:w-auto rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-violet-500/20 active:scale-95"
                >
                  {loading
                    ? isEditMode
                      ? "Actualizando..."
                      : "Guardando..."
                    : isEditMode
                    ? "Actualizar proyecto"
                    : "Guardar proyecto"}
                </Button>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
                Preview
              </p>

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70">
                <div className="aspect-[4/3] w-full">
                  {imageUrl && !imageError ? (
                    <img
                      src={imageUrl}
                      alt="Preview del proyecto"
                      className="h-full w-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-black text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl">
                        🖼️
                      </div>

                      <h3 className="text-lg font-semibold text-white">
                        Vista previa
                      </h3>

                      <p className="mt-2 max-w-xs text-sm text-zinc-400">
                        {imageUrl && imageError
                          ? "No se pudo cargar la imagen. Revisa la URL."
                          : "Agrega una URL de imagen para ver cómo se mostrará tu proyecto."}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 p-4">
                  <h4 className="truncate text-lg font-semibold text-white">
                    {title || "Título del proyecto"}
                  </h4>
                  <p className="mt-2 line-clamp-3 text-sm text-zinc-400">
                    {shortDescription || "La descripción corta aparecerá aquí."}
                  </p>

                  <div className="mt-4 flex gap-2">
                    {featured && (
                      <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                        ★ Destacado
                      </span>
                    )}

                    {published ? (
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                        Publicado
                      </span>
                    ) : (
                      <span className="rounded-full border border-zinc-600/30 bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300">
                        Borrador
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default NewProjectModal;