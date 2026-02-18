/**
 * LocalEmployerSection Component
 * 
 * Displays verified local employer data for city+role pages.
 * Provides unique, research-backed content for SEO differentiation.
 */
import { Building2, Calendar, DollarSign, Clock, Users, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LocalEmployer, getEmployersByCityAndRole, getCityStats } from "@/lib/data/local-employers";

interface LocalEmployerSectionProps {
  citySlug: string;
  cityName: string;
  roleSlug: string;
  roleTitle: string;
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getHiringSeasonLabel(hiringPeriods: LocalEmployer["hiringPeriods"]): string {
  const highDemandMonths = hiringPeriods
    .filter((p) => p.demand === "high")
    .map((p) => monthNames[p.month - 1]);
  
  if (highDemandMonths.length === 0) return "Year-round hiring";
  if (highDemandMonths.length === 1) return `Peak hiring: ${highDemandMonths[0]}`;
  if (highDemandMonths.length === 2) return `Peak hiring: ${highDemandMonths.join(" & ")}`;
  return `Peak hiring: ${highDemandMonths.slice(0, -1).join(", ")} & ${highDemandMonths[highDemandMonths.length - 1]}`;
}

function getShiftLabel(shiftTypes: LocalEmployer["shiftTypes"]): string {
  if (shiftTypes.includes("flexible")) return "Flexible scheduling";
  const labels = {
    day: "Day",
    evening: "Evening", 
    night: "Night",
    weekend: "Weekend",
  };
  return shiftTypes
    .filter((s): s is keyof typeof labels => s in labels)
    .map((s) => labels[s])
    .join(", ") + " shifts";
}

export default function LocalEmployerSection({
  citySlug,
  cityName,
  roleSlug,
  roleTitle,
}: LocalEmployerSectionProps) {
  const employers = getEmployersByCityAndRole(citySlug, roleSlug);
  const cityStats = getCityStats(citySlug);

  // If no local data, return null (will fall back to generic content)
  if (employers.length === 0) {
    return null;
  }

  return (
    <section className="py-8" id="local-employers">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Building2 className="w-6 h-6" />
        Where {roleTitle}s Work in {cityName}
      </h2>
      
      <p className="text-muted-foreground mb-6">
        {cityName} has active hiring opportunities for {roleTitle.toLowerCase()}s at these
        major employers. Data verified from Bureau of Labor Statistics, company reports, 
        and Indeed Flex hiring trends.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {employers.slice(0, 6).map((employer) => (
          <Card key={employer.id} className="hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{employer.employerName}</CardTitle>
                  <p className="text-sm text-muted-foreground">{employer.facilityType}</p>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {employer.industryId}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Pay Range */}
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="font-medium">
                  ${employer.payRange.min}-${employer.payRange.max}/hr
                </span>
                <span className="text-muted-foreground text-xs">
                  ({employer.payRange.source})
                </span>
              </div>

              {/* Hiring Volume */}
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-blue-600" />
                <span>
                  ~{employer.typicalHires.seasonal.toLocaleString()} seasonal hires
                  {employer.typicalHires.ongoing > 0 && (
                    <>, {employer.typicalHires.ongoing}+ ongoing</>
                  )}
                </span>
              </div>

              {/* Shifts */}
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-orange-600" />
                <span>{getShiftLabel(employer.shiftTypes)}</span>
              </div>

              {/* Peak Hiring */}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span>{getHiringSeasonLabel(employer.hiringPeriods)}</span>
              </div>

              {/* Notes if any */}
              {employer.notes && (
                <p className="text-xs text-muted-foreground pt-2 border-t">
                  {employer.notes}
                </p>
              )}

              {/* Source */}
              <p className="text-xs text-muted-foreground">
                Source: {employer.source} | Verified: {employer.verifiedDate}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* City Stats Summary */}
      {cityStats && (
        <div className="mt-8 p-6 bg-secondary/50 rounded-lg">
          <h3 className="font-semibold mb-4">
            {cityName} Job Market Snapshot
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Top Industries */}
            <div>
              <p className="text-sm font-medium mb-2">Top Industries for {roleTitle}s</p>
              <div className="space-y-1">
                {cityStats.topIndustries.slice(0, 3).map((ind) => (
                  <div key={ind.industryId} className="flex justify-between text-sm">
                    <span className="capitalize">{ind.industryId}</span>
                    <span className="text-muted-foreground">
                      ${ind.avgPayMin}-${ind.avgPayMax}/hr
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seasonal Peaks */}
            <div>
              <p className="text-sm font-medium mb-2">Best Times to Apply</p>
              <div className="space-y-1">
                {cityStats.seasonalPeaks.slice(0, 3).map((peak, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="font-medium">{monthNames[peak.month - 1]}</span>
                    <span className="text-muted-foreground"> - {peak.reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Employment Centers */}
            <div>
              <p className="text-sm font-medium mb-2">Major Employment Areas</p>
              <div className="space-y-1">
                {cityStats.majorEmploymentCenters.slice(0, 3).map((center, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="font-medium">{center.name}</span>
                    <span className="text-muted-foreground block text-xs">
                      {center.transitAccess || center.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Last updated: {cityStats.lastUpdated}
          </p>
        </div>
      )}
    </section>
  );
}

