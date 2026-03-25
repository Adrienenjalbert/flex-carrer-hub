import type { ResumeTemplate } from "@/lib/data/resume-templates";

interface ResumePreviewProps {
  template: ResumeTemplate;
  size?: "thumbnail" | "full";
  className?: string;
}

function PlaceholderLines({ count, widths }: { count: number; widths?: string[] }) {
  const defaultWidths = ["100%", "90%", "95%", "80%", "85%", "75%"];
  return (
    <div className="space-y-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 bg-gray-200 rounded-full"
          style={{ width: widths?.[i] || defaultWidths[i % defaultWidths.length] }}
        />
      ))}
    </div>
  );
}

function SkillPills({ color, count }: { color: string; count: number }) {
  const widths = [32, 40, 28, 36, 44, 30];
  return (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-2 rounded-full opacity-20"
          style={{ width: widths[i % widths.length], backgroundColor: color }}
        />
      ))}
    </div>
  );
}

export default function ResumePreview({ template, size = "thumbnail", className = "" }: ResumePreviewProps) {
  const { colorScheme, sections, layout } = template;
  const isTwoColumn = layout === "two-column" || layout === "hybrid";
  const scale = size === "thumbnail" ? "scale-[0.55]" : "scale-[0.75]";
  const wrapperHeight = size === "thumbnail" ? "h-[220px]" : "h-[420px]";

  const requiredSections = sections.filter((s) => s.required).sort((a, b) => a.order - b.order);
  const optionalSections = sections.filter((s) => !s.required).sort((a, b) => a.order - b.order);

  return (
    <div className={`${wrapperHeight} overflow-hidden rounded-lg ${className}`}>
      <div
        className={`origin-top-left ${scale} w-[400px] bg-white shadow-md border border-gray-200 rounded`}
        style={{ transformOrigin: "top left" }}
      >
        {/* Header */}
        <div
          className="px-5 py-4"
          style={{ backgroundColor: colorScheme.primary }}
        >
          <div className="h-3 w-28 bg-white/90 rounded mb-2" />
          <div className="h-1.5 w-36 bg-white/50 rounded" />
          <div className="flex gap-2 mt-2">
            <div className="h-1 w-14 bg-white/40 rounded-full" />
            <div className="h-1 w-16 bg-white/40 rounded-full" />
            <div className="h-1 w-12 bg-white/40 rounded-full" />
          </div>
        </div>

        {isTwoColumn ? (
          <div className="flex">
            {/* Left column - main content */}
            <div className="flex-1 p-4 space-y-4">
              {requiredSections.filter((s) => s.name !== "Skills" && s.name !== "Contact Information").map((section) => (
                <div key={section.name}>
                  <div
                    className="h-2 w-20 rounded mb-2"
                    style={{ backgroundColor: colorScheme.primary, opacity: 0.7 }}
                  />
                  {section.name.includes("Experience") ? (
                    <div className="space-y-3">
                      <div>
                        <div className="h-1.5 w-24 bg-gray-300 rounded mb-1" />
                        <div className="h-1 w-16 bg-gray-200 rounded mb-2" />
                        <PlaceholderLines count={3} widths={["95%", "85%", "70%"]} />
                      </div>
                      <div>
                        <div className="h-1.5 w-20 bg-gray-300 rounded mb-1" />
                        <div className="h-1 w-14 bg-gray-200 rounded mb-2" />
                        <PlaceholderLines count={2} widths={["90%", "75%"]} />
                      </div>
                    </div>
                  ) : (
                    <PlaceholderLines count={3} />
                  )}
                </div>
              ))}
            </div>

            {/* Right column - sidebar */}
            <div
              className="w-[130px] p-3 space-y-4"
              style={{ backgroundColor: `${colorScheme.secondary}08` }}
            >
              {sections.filter((s) => s.name === "Skills" || s.name === "Certifications" || s.name === "Education").map((section) => (
                <div key={section.name}>
                  <div
                    className="h-1.5 w-14 rounded mb-2"
                    style={{ backgroundColor: colorScheme.accent, opacity: 0.6 }}
                  />
                  {section.name === "Skills" ? (
                    <SkillPills color={colorScheme.primary} count={5} />
                  ) : (
                    <PlaceholderLines count={2} widths={["80%", "60%"]} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {requiredSections.filter((s) => s.name !== "Contact Information").map((section) => (
              <div key={section.name}>
                <div
                  className="h-2 w-20 rounded mb-2"
                  style={{ backgroundColor: colorScheme.primary, opacity: 0.7 }}
                />
                {section.name === "Skills" ? (
                  <SkillPills color={colorScheme.primary} count={6} />
                ) : section.name.includes("Experience") ? (
                  <div className="space-y-3">
                    <div>
                      <div className="h-1.5 w-24 bg-gray-300 rounded mb-1" />
                      <div className="h-1 w-16 bg-gray-200 rounded mb-2" />
                      <PlaceholderLines count={3} widths={["95%", "85%", "70%"]} />
                    </div>
                  </div>
                ) : (
                  <PlaceholderLines count={2} />
                )}
              </div>
            ))}
            {optionalSections.slice(0, 2).map((section) => (
              <div key={section.name}>
                <div
                  className="h-2 w-16 rounded mb-2"
                  style={{ backgroundColor: colorScheme.accent, opacity: 0.5 }}
                />
                <PlaceholderLines count={2} widths={["70%", "55%"]} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
