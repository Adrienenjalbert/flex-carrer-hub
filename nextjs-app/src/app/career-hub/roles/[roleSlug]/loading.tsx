import { Skeleton } from "@/components/ui/skeleton";

export default function RolePageLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Title and meta */}
          <Skeleton className="h-12 w-96 mb-4" />
          <Skeleton className="h-5 w-full max-w-2xl mb-2" />
          <Skeleton className="h-5 w-2/3 max-w-xl mb-6" />

          {/* Key stats */}
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-36" />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Section 1 */}
            <div className="bg-card rounded-xl border p-6">
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Calculator */}
            <div className="bg-card rounded-xl border p-6">
              <Skeleton className="h-8 w-56 mb-4" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </div>

            {/* FAQ */}
            <div className="bg-card rounded-xl border p-6">
              <Skeleton className="h-8 w-64 mb-4" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="py-4 border-b last:border-0">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full mb-3" />
              ))}
            </div>

            <div className="bg-card rounded-xl border p-6">
              <Skeleton className="h-6 w-40 mb-4" />
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full mb-2" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

