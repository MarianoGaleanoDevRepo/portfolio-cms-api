import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ProjectCard from "../../components/ProjectCard";
import EmptyState from "../../components/EmptyState";
import NewProjectModal from "../../components/NewProjectModal";
import {
  deleteProject,
  getProjects,
  type Project,
} from "../../api/projectApi";

function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error cargando proyectos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("¿Seguro que quieres eliminar este proyecto?");
    if (!confirmed) return;

    try {
      await deleteProject(id);
      fetchProjects();
    } catch (error) {
      console.error("Error eliminando proyecto:", error);
      alert("No se pudo eliminar el proyecto");
    }
  };

  const handleEdit = (id: number) => {
    const selectedProject = projects.find((project) => project.id === id) || null;
    setProjectToEdit(selectedProject);
    setOpenModal(true);
  };

  const handleOpenCreate = () => {
    setProjectToEdit(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setProjectToEdit(null);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_24%),linear-gradient(to_bottom_right,#09090b,#111827,#000000)] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
              Admin
            </p>
            <h2 className="mt-3 text-5xl font-bold tracking-tight text-white md:text-6xl">
              Proyectos
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-400">
              Gestiona visualmente los proyectos de tu portafolio desde el panel administrativo.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-violet-500/25"
          >
            + Nuevo proyecto
          </button>
        </div>

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-3xl border border-zinc-800 bg-zinc-900"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                shortDescription={project.shortDescription}
                imageUrl={project.imageUrl}
                githubUrl={project.githubUrl}
                demoUrl={project.demoUrl}
                featured={project.featured}
                onDelete={handleDelete}
                onEdit={handleEdit}
                adminMode
              />
            ))}
          </div>
        )}
      </main>

      <NewProjectModal
        open={openModal}
        onClose={handleCloseModal}
        onCreated={fetchProjects}
        projectToEdit={projectToEdit}
      />
    </div>
  );
}

export default AdminProjectsPage;