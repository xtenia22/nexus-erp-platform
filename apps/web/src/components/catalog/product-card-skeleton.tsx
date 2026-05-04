export function ProductCardSkeleton() {
  return (
    <article className="h-full animate-pulse overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="h-44 border-b border-slate-800 bg-slate-800" />

      <div className="space-y-4 p-5">
        <div className="flex gap-2">
          <div className="h-6 w-24 rounded-full bg-slate-800" />
          <div className="h-6 w-16 rounded-full bg-slate-800" />
        </div>

        <div className="h-5 w-full rounded bg-slate-800" />
        <div className="h-5 w-3/4 rounded bg-slate-800" />

        <div className="h-4 w-1/2 rounded bg-slate-800" />
        <div className="h-4 w-1/3 rounded bg-slate-800" />

        <div className="h-6 w-24 rounded bg-slate-800" />
      </div>
    </article>
  );
}