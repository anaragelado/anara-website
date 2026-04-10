export default function RootNotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <div className="text-center">
        <p className="font-accent text-7xl text-brand-yellow md:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight md:text-4xl">
          This scoop hit the floor!
        </h1>
        <p className="mx-auto mt-3 max-w-md text-text-secondary">
          We searched the entire farm, but this page was nowhere to be found.
        </p>
        <a
          href="/"
          className="mt-8 inline-block rounded-full bg-brand-yellow px-8 py-3 text-sm font-semibold text-text-primary transition-all duration-300 ease-in-out hover:scale-105 hover:bg-brand-green hover:text-white"
        >
          Back to the cone
        </a>
      </div>
    </main>
  );
}
