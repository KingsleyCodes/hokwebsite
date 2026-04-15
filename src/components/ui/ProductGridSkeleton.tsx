export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
      <div className="md:col-span-1">
        {/* Filter skeleton */}
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-3/4 rounded bg-gray-200"></div>
          <div className="h-32 rounded bg-gray-200"></div>
          <div className="h-40 rounded bg-gray-200"></div>
        </div>
      </div>
      <div className="md:col-span-3">
        <div className="mb-5 flex items-center justify-end">
          <div className="h-9 w-[180px] animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="mb-2 aspect-square rounded-md bg-gray-200"></div>
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
