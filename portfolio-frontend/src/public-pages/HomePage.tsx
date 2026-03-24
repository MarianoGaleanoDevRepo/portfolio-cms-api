import { useEffect, useState } from "react";
import PublicNavbar from "../components/PublicNavbar";
import ProjectCard from "../components/ProjectCard";
import { getProjects, type Project } from "../api/projectApi";
import { getProfile, type Profile } from "../api/profileApi";

function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, profileData] = await Promise.all([
          getProjects(),
          getProfile(),
        ]);

        setProjects(
          projectsData.filter((project: Project) => project.published)
        );
        setProfile(profileData);
      } catch (error) {
        console.error("Error cargando home pública:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_24%),linear-gradient(to_bottom_right,#09090b,#111827,#000000)] text-white">
      <PublicNavbar />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <section className="mb-20 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet-400">
              {profile?.professionalTitle || "Software Engineer"}
            </p>

            <h1 className="mt-6 max-w-4xl text-6xl font-bold leading-tight tracking-tight md:text-7xl">
              {profile?.fullName || "Mariano Galeano"}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              {profile?.bio || "Portfolio profesional en construcción."}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 font-semibold text-white shadow-xl transition hover:scale-[1.03]"
              >
                Ver proyectos
              </a>

              {profile?.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/10 px-7 py-3.5 text-zinc-300 transition hover:border-violet-500 hover:text-white"
                >
                  LinkedIn
                </a>
              )}

              {profile?.cvUrl && (
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/10 px-7 py-3.5 text-zinc-300 transition hover:border-violet-500 hover:text-white"
                >
                  Ver CV
                </a>
              )}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-violet-600 to-indigo-600 opacity-30 blur-2xl" />

              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] p-3 backdrop-blur-xl">
                {profile?.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="h-[400px] w-[320px] rounded-[24px] object-cover"
                  />
                ) : (
                  <div className="flex h-[400px] w-[320px] items-center justify-center rounded-[24px] bg-zinc-900 text-zinc-500">
                    Sin foto
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
              Proyectos
            </p>
            <h2 className="mt-3 text-5xl font-bold tracking-tight">
              Proyectos destacados
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
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
        </section>

        {profile?.contactEmail && (
          <section className="mt-24 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-violet-400">
              Contacto
            </p>

            <h3 className="mt-4 text-4xl font-bold">
              ¿Trabajamos juntos?
            </h3>

            <p className="mt-4 text-zinc-400">
              Estoy disponible para proyectos freelance o posiciones remotas.
            </p>

            <a
              href={`mailto:${profile.contactEmail}`}
              className="mt-8 inline-block rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-xl transition hover:scale-[1.03]"
            >
              {profile.contactEmail}
            </a>
          </section>
        )}
      </main>
    </div>
  );
}

export default HomePage;