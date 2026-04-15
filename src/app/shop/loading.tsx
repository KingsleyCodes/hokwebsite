import ProductGridSkeleton from "@/components/ui/ProductGridSkeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          {/* Filter skeleton */}
          <div className="hidden animate-pulse md:block">
            <div className="mb-6 h-8 w-32 rounded bg-gray-200"></div>
            <div className="space-y-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="rounded border border-gray-200 p-4">
                    <div className="mb-4 h-6 w-2/3 rounded bg-gray-200"></div>
                    <div className="space-y-2">
                      {Array(3)
                        .fill(0)
                        .map((_, j) => (
                          <div
                            key={j}
                            className="h-4 w-full rounded bg-gray-200"
                          ></div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          <ProductGridSkeleton />
        </div>
      </div>
    </div>
  );
}
