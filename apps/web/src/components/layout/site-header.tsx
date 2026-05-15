import Link from "next/link";
import { company } from "@/companyLayer/company.config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-100">
          {company.branding.logoText}
        </Link>

        <nav className="hidden gap-6 md:flex">
          <Link href="/" className="text-sm text-slate-300 transition hover:text-white">
            {company.content.navigation.home}
          </Link>
          <Link href="/products" className="text-sm text-slate-300 transition hover:text-white">
            {company.content.navigation.catalog}
          </Link>
          <Link href="#" className="text-sm text-slate-300 transition hover:text-white">
            {company.content.navigation.company} 
          </Link>
          <Link href="#" className="text-sm text-slate-300 transition hover:text-white">
            {company.content.navigation.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="#"
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
          >
            {company.content.navigation.login}
          </Link>
        </div>
      </div>
    </header>
  );
}