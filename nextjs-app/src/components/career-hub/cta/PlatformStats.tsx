import { platformStats } from "@/lib/data/testimonials";

const PlatformStats = () => {
  return (
    <section className="my-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {platformStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-4">
        Data from{" "}
        <a
          href="https://indeedflex.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          indeedflex.com
        </a>
      </p>
    </section>
  );
};

export default PlatformStats;
