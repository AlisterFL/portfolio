"use client";

export default function MenuSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
        <div className="h-9 w-24 rounded bg-[var(--surface-hover)]" />
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded-full bg-[var(--surface-hover)]" />
          <div className="h-8 w-16 rounded bg-[var(--surface-hover)]" />
        </div>
      </div>

      {/* Search skeleton */}
      <div className="mx-4 mt-3">
        <div className="h-9 rounded-xl bg-[var(--surface-hover)]" />
      </div>

      {/* Filter skeleton */}
      <div className="flex gap-2 px-4 py-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-7 w-20 shrink-0 rounded-full bg-[var(--surface-hover)]" />
        ))}
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-1 border-b border-[var(--border)] px-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-10 w-16 rounded bg-[var(--surface-hover)]" />
        ))}
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
            <div className="h-20 w-20 shrink-0 rounded-[10px] bg-[var(--surface-hover)]" />
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <div className="h-4 w-32 rounded bg-[var(--surface-hover)]" />
                <div className="h-4 w-12 rounded bg-[var(--surface-hover)]" />
              </div>
              <div className="h-3 w-full rounded bg-[var(--surface-hover)]" />
              <div className="h-3 w-2/3 rounded bg-[var(--surface-hover)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
