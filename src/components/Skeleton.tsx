import React from 'react';

export function Skeleton({ className, key }: { className?: string; key?: React.Key }) {
  return (
    <div key={key} className={`animate-pulse rounded-md bg-white/5 ${className}`} />
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[85vh] w-full px-4 md:px-12 flex flex-col justify-center">
      <Skeleton className="h-4 w-32 mb-4" />
      <Skeleton className="h-16 w-3/4 mb-6 md:h-24" />
      <Skeleton className="h-6 w-1/2 mb-8" />
      <div className="flex gap-4">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  );
}

export function GenreRowSkeleton() {
  return (
    <div className="mt-8 px-4 md:px-12">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="flex gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-[270px] w-[180px] md:h-[360px] md:w-[240px] rounded-md" />
        ))}
      </div>
    </div>
  );
}
