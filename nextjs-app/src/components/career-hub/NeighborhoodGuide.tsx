/**
 * NeighborhoodGuide Component
 * 
 * Displays hyperlocal neighborhood information for a city.
 * Helps workers understand which areas have the best opportunities.
 */
import { MapPin, Bus, Clock, Lightbulb, Star, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getCityNeighborhoods,
  getNeighborhoodsForRole,
  getBestNeighborhoodsForRole,
  getCommuteTips,
  NeighborhoodArea,
} from "@/lib/data/city-neighborhoods";

interface NeighborhoodGuideProps {
  citySlug: string;
  cityName: string;
  roleSlug?: string;
  roleTitle?: string;
}

function getTransitBadgeColor(score: NeighborhoodArea["transitScore"]): string {
  switch (score) {
    case "excellent":
      return "bg-green-100 text-green-800";
    case "good":
      return "bg-blue-100 text-blue-800";
    case "fair":
      return "bg-yellow-100 text-yellow-800";
    case "limited":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function formatPayMultiplier(multiplier: number): string {
  if (multiplier >= 1.1) return `${Math.round((multiplier - 1) * 100)}% above avg`;
  if (multiplier >= 1.05) return `${Math.round((multiplier - 1) * 100)}% above avg`;
  if (multiplier >= 0.95) return "Average pay";
  return `${Math.round((1 - multiplier) * 100)}% below avg`;
}

export default function NeighborhoodGuide({
  citySlug,
  cityName,
  roleSlug,
  roleTitle,
}: NeighborhoodGuideProps) {
  const cityData = getCityNeighborhoods(citySlug);
  const commuteTips = getCommuteTips(citySlug);

  // If no neighborhood data for this city, return null
  if (!cityData) {
    return null;
  }

  // Filter neighborhoods if role is specified
  const neighborhoods = roleSlug
    ? getNeighborhoodsForRole(citySlug, roleSlug)
    : cityData.neighborhoods;

  const bestForRole = roleSlug ? getBestNeighborhoodsForRole(citySlug, roleSlug) : null;

  if (neighborhoods.length === 0) {
    return null;
  }

  return (
    <section className="py-8" id="neighborhood-guide">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <MapPin className="w-6 h-6" />
        {roleTitle
          ? `Best Areas for ${roleTitle}s in ${cityName}`
          : `${cityName} Neighborhood Guide`}
      </h2>

      {/* Best For Role (if specified) */}
      {bestForRole && (
        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">
                Top neighborhoods for {roleTitle}s: {bestForRole.neighborhoods.join(", ")}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{bestForRole.whyBest}</p>
            </div>
          </div>
        </div>
      )}

      <p className="text-muted-foreground mb-6">
        Understanding {cityName}&apos;s job landscape can help you find the best opportunities
        and plan your commute. Here&apos;s what you need to know about the major employment areas.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {neighborhoods.map((neighborhood, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{neighborhood.name}</CardTitle>
                <Badge className={getTransitBadgeColor(neighborhood.transitScore)}>
                  Transit: {neighborhood.transitScore}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground capitalize">
                {neighborhood.type.replace("-", " ")} area
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Pay Comparison */}
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span>{formatPayMultiplier(neighborhood.avgPayMultiplier)}</span>
              </div>

              {/* Transit Details */}
              <div className="flex items-start gap-2 text-sm">
                <Bus className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>{neighborhood.transitDetails}</span>
              </div>

              {/* Peak Hours */}
              <div className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <span>{neighborhood.peakHours}</span>
              </div>

              {/* Popular Roles */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {neighborhood.popularRoles.slice(0, 4).map((role) => (
                  <Badge key={role} variant="outline" className="text-xs">
                    {role.replace(/-/g, " ")}
                  </Badge>
                ))}
              </div>

              {/* Tips */}
              {neighborhood.tipsForWorkers.length > 0 && (
                <div className="pt-3 border-t">
                  <p className="text-xs font-medium mb-2 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" />
                    Tips for this area
                  </p>
                  <ul className="space-y-1">
                    {neighborhood.tipsForWorkers.slice(0, 2).map((tip, tipIdx) => (
                      <li key={tipIdx} className="text-xs text-muted-foreground">
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Parking notes if relevant */}
              {neighborhood.parkingNotes && (
                <p className="text-xs text-muted-foreground">
                  🚗 {neighborhood.parkingNotes}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Commute Tips */}
      {commuteTips.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Bus className="w-5 h-5" />
            Commute Tips for {cityName}
          </h3>
          <ul className="grid md:grid-cols-2 gap-3">
            {commuteTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-4">
        Last updated: {cityData.lastUpdated}
      </p>
    </section>
  );
}

