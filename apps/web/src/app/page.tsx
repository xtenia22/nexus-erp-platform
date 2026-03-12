import { AboutSection } from "@/components/home/about-section";
import { CatalogSection } from "@/components/home/catalog-section";
import { CtaSection } from "@/components/home/cta-section";
import { HeroSection } from "@/components/home/hero-section";
import { SiteHeader } from "@/components/layout/site-header";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <CatalogSection />
      <CtaSection />
    </main>
  );
}