export default function ToolsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page title skeleton */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 mb-8">
        <div className="h-10 w-64 bg-primary/10 rounded-lg mb-4 animate-pulse" />
        <div className="h-5 w-full max-w-xl bg-primary/10 rounded-lg mb-2 animate-pulse" />
        <div className="h-5 w-96 bg-primary/10 rounded-lg animate-pulse" />
      </div>

      {/* Category tabs skeleton */}
      <div className="flex gap-2 mb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 w-28 rounded-full bg-secondary animate-pulse" />
        ))}
      </div>

      {/* Tools grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bg-card rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 animate-pulse" />
              <div className="flex-1">
                <div className="h-5 w-3/4 bg-muted rounded mb-2 animate-pulse" />
                <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="h-4 w-full bg-muted rounded mb-2 animate-pulse" />
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
