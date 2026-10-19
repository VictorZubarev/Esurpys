import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="text-sm text-cyan-400 transition hover:text-cyan-300"
        >
          ← Back to Esurpys
        </Link>

        <p className="mt-16 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          About the project
        </p>

        <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl">
          Esurpys
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
          Esurpys is an emerging technology project focused on building
          practical digital tools and exploring better ways to work online.
        </p>

        <section className="mt-16 border-t border-slate-800 pt-8">
          <h2 className="text-2xl font-bold">Our approach</h2>
          <p className="mt-4 leading-7 text-slate-300">
            We develop the project step by step, prioritizing a reliable
            technical foundation, clear documentation, and continuous
            improvement.
          </p>
        </section>

        <section className="mt-12 border-t border-slate-800 pt-8">
          <h2 className="text-2xl font-bold">Current stage</h2>
          <p className="mt-4 leading-7 text-slate-300">
            Esurpys is in its early development stage. Features will be
            introduced as they are implemented and tested.
          </p>
        </section>

        <footer className="mt-16 border-t border-slate-800 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Esurpys. Built step by step.
        </footer>
      </div>
    </main>
  );
}

