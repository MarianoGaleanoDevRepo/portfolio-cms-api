import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import ProjectCard from "../components/ProjectCard";
import { getProjects, type Project } from "../api/projectApi";

function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data.filter((project: Project) => project.published));
      } catch (error) {
        console.error("Error cargando proyectos públicos:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_24%),linear-gradient(to_bottom_right,#09090b,#111827,#000000)] text-white">
      <PublicNavbar />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <section className="mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
            Software Engineer
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
            Portafolio profesional con proyectos reales, backend, frontend y arquitectura fullstack.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Aquí encontrarás una selección de proyectos desarrollados con enfoque práctico,
            arquitectura limpia y experiencia visual moderna.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg"
            >
              Ver proyectos
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 px-6 py-3 font-medium text-zinc-300 transition hover:border-violet-500 hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </section>

        <section id="projects">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
              Proyectos
            </p>
            <h2 className="mt-3 text-4xl font-bold">Trabajo destacado</h2>
          </div>

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
              />
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/admin"
              className="text-sm text-zinc-500 transition hover:text-violet-400"
            >
              Acceso admin →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;