function EmptyState() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl">
        ✨
      </div>

      <h3 className="text-2xl font-semibold text-white">
        Aún no hay proyectos
      </h3>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-400">
        Esta sección mostrará tus proyectos del portafolio. Luego agregaremos un
        formulario para crear proyectos desde el panel admin.
      </p>
    </div>
  );
}

export default EmptyState;