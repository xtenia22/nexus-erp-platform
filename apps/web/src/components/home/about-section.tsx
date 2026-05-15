import { company } from "@/companyLayer/company.config";
export function AboutSection() {
  return (
    <section id="about" className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-400">
            {company.content.home.aboutEyebrow}
          </p>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">
           {company.content.home.aboutTitle}
          </h2>

          <p className="leading-8 text-slate-300">
            {company.content.home.aboutDescription}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {company.content.home.aboutCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h3 className="mb-3 text-xl font-semibold text-slate-100">
                {card.title}
              </h3>
              <p className="text-slate-300">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}