import React from "react";

export default function BlogCardSkeleton() {
  return (
    <div className="max-w-[384px] overflow-hidden animate-pulse border  rounded-lg bg-neutral-900">
      <div className="flex flex-col gap-3">
        <div className="h-[240px] w-full bg-neutral-800 rounded-t" />

        <div className="px-4 pb-4 flex flex-col gap-3">
          <div className="h-4 w-1/3 bg-neutral-800 rounded" />

          <div className="flex items-center justify-between">
            <div className="h-5 w-2/3 bg-neutral-800 rounded" />
            <div className="h-5 w-5 bg-neutral-800 rounded-full" />
          </div>

          <div className="h-4 w-full bg-neutral-800 rounded" />
          <div className="h-4 w-5/6 bg-neutral-800 rounded" />

          <div className="flex flex-wrap gap-2 mt-2">
            <div className="h-6 w-16 bg-neutral-800 rounded-full" />
            <div className="h-6 w-14 bg-neutral-800 rounded-full" />
            <div className="h-6 w-20 bg-neutral-800 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
