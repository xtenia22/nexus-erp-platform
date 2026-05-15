import Link from "next/link";
import { company } from "@/companyLayer/company.config";


export function HeroSection() {
  return (
    <section className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-300">
            {company.content.home.heroBadge}
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-50 md:text-6xl">
            {company.content.home.heroTitle}
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-8 text-slate-300">
           {company.content.home.heroSubtitle} 
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-xl bg-white px-5 py-3 font-medium text-slate-900 transition hover:opacity-90"
            >
              {company.content.home.primaryCta}
            </Link>

            <Link
              href="#about"
              className="rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-100 transition hover:bg-slate-800"
            >
              {company.content.home.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="mb-4 text-sm text-slate-400">
              {company.content.home.heroPreviewTitle}
            </p>

            <div className="space-y-3">
              {company.content.home.heroPreviewItems.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}