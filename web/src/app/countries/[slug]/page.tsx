import { Suspense } from "react";
import { countries } from "@/lib/countries";
import CountryDetailClient from "./CountryDetailClient";

export function generateStaticParams() {
  return countries.map((country) => ({
    slug: country.slug,
  }));
}

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
          <p className="text-slate-400">Loading...</p>
        </main>
      }
    >
      <CountryDetailClient slug={slug} />
    </Suspense>
  );
}