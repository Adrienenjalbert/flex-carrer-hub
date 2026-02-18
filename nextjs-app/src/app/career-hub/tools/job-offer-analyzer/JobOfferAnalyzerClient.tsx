"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  DollarSign,
  Star,
  TrendingUp,
  Clock,
  Car,
  Heart,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";

const faqs = [
  {
    question: "What should I consider besides pay?",
    answer:
      "Consider commute time and costs, schedule flexibility, growth opportunities, work environment, benefits (even for part-time), and the skills you'll develop.",
  },
  {
    question: "How do I compare flexible vs traditional jobs?",
    answer:
      "Flexible jobs offer schedule control but may have variable hours. Traditional jobs offer stability but less flexibility. Consider your lifestyle needs and financial goals.",
  },
  {
    question: "Should I take a lower-paying job for experience?",
    answer:
      "Sometimes yes - if the job provides valuable skills, certifications, or connections that will lead to higher pay later. Consider the long-term career trajectory.",
  },
];

interface JobOffer {
  name: string;
  hourlyRate: string;
  hoursPerWeek: string;
  commuteDistance: string;
  hasTips: boolean;
  hasFlexibility: boolean;
  hasGrowthPath: boolean;
}

const defaultOffer: JobOffer = {
  name: "",
  hourlyRate: "",
  hoursPerWeek: "30",
  commuteDistance: "10",
  hasTips: false,
  hasFlexibility: false,
  hasGrowthPath: false,
};

export default function JobOfferAnalyzerClient() {
  const [offer1, setOffer1] = useState<JobOffer>({
    ...defaultOffer,
    name: "Job A",
    hourlyRate: "15",
  });
  const [offer2, setOffer2] = useState<JobOffer>({
    ...defaultOffer,
    name: "Job B",
    hourlyRate: "17",
  });

  const calculateScore = (offer: JobOffer) => {
    const rate = parseFloat(offer.hourlyRate) || 0;
    const hours = parseFloat(offer.hoursPerWeek) || 0;
    const commute = parseFloat(offer.commuteDistance) || 0;

    const weeklyPay = rate * hours;
    const commuteCost = commute * 2 * 5 * 0.70; // Round trip, 5 days, IRS rate
    const netWeeklyPay = weeklyPay - commuteCost;

    let score = 0;
    score += netWeeklyPay * 0.5; // Weight pay heavily
    if (offer.hasTips) score += 50;
    if (offer.hasFlexibility) score += 30;
    if (offer.hasGrowthPath) score += 40;

    return {
      weeklyPay,
      commuteCost,
      netWeeklyPay,
      score,
    };
  };

  const scores = useMemo(() => {
    return {
      offer1: calculateScore(offer1),
      offer2: calculateScore(offer2),
    };
  }, [offer1, offer2]);

  const winner = scores.offer1.score > scores.offer2.score ? "offer1" : "offer2";

  const OfferInput = ({
    offer,
    setOffer,
    label,
  }: {
    offer: JobOffer;
    setOffer: (offer: JobOffer) => void;
    label: string;
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Job Name</Label>
          <Input
            value={offer.name}
            onChange={(e) => setOffer({ ...offer, name: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label>Hourly Rate ($)</Label>
          <Input
            type="number"
            value={offer.hourlyRate}
            onChange={(e) => setOffer({ ...offer, hourlyRate: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label>Hours Per Week</Label>
          <Input
            type="number"
            value={offer.hoursPerWeek}
            onChange={(e) => setOffer({ ...offer, hoursPerWeek: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label>Commute (miles one-way)</Label>
          <Input
            type="number"
            value={offer.commuteDistance}
            onChange={(e) =>
              setOffer({ ...offer, commuteDistance: e.target.value })
            }
            className="mt-1"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`tips-${label}`}
              checked={offer.hasTips}
              onCheckedChange={(checked) =>
                setOffer({ ...offer, hasTips: checked === true })
              }
            />
            <Label htmlFor={`tips-${label}`}>Tips available</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`flex-${label}`}
              checked={offer.hasFlexibility}
              onCheckedChange={(checked) =>
                setOffer({ ...offer, hasFlexibility: checked === true })
              }
            />
            <Label htmlFor={`flex-${label}`}>Flexible schedule</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`growth-${label}`}
              checked={offer.hasGrowthPath}
              onCheckedChange={(checked) =>
                setOffer({ ...offer, hasGrowthPath: checked === true })
              }
            />
            <Label htmlFor={`growth-${label}`}>Clear growth path</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Job Offer Analyzer" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Job Offer Analyzer
              </h1>
              <p className="text-lg text-muted-foreground">
                Compare job offers side by side. See which one is truly better
                after factoring in all costs and benefits.
              </p>
            </div>

            {/* Offer Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <OfferInput offer={offer1} setOffer={setOffer1} label="Offer 1" />
              <OfferInput offer={offer2} setOffer={setOffer2} label="Offer 2" />
            </div>

            {/* Comparison Results */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  Comparison Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  {/* Offer 1 Results */}
                  <div
                    className={`p-4 rounded-lg ${
                      winner === "offer1"
                        ? "bg-green-100 dark:bg-green-950 border-2 border-green-500"
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="font-semibold">{offer1.name || "Offer 1"}</h3>
                      {winner === "offer1" && (
                        <Badge className="bg-green-600">
                          <Star className="h-3 w-3 mr-1" />
                          Best Choice
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Weekly Gross</span>
                        <span>${scores.offer1.weeklyPay.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Commute Cost</span>
                        <span>-${scores.offer1.commuteCost.toFixed(0)}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-semibold">
                        <span>Net Weekly</span>
                        <span>${scores.offer1.netWeeklyPay.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Offer 2 Results */}
                  <div
                    className={`p-4 rounded-lg ${
                      winner === "offer2"
                        ? "bg-green-100 dark:bg-green-950 border-2 border-green-500"
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="font-semibold">{offer2.name || "Offer 2"}</h3>
                      {winner === "offer2" && (
                        <Badge className="bg-green-600">
                          <Star className="h-3 w-3 mr-1" />
                          Best Choice
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Weekly Gross</span>
                        <span>${scores.offer2.weeklyPay.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Commute Cost</span>
                        <span>-${scores.offer2.commuteCost.toFixed(0)}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-semibold">
                        <span>Net Weekly</span>
                        <span>${scores.offer2.netWeeklyPay.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <FAQSection faqs={faqs} />

            <ToolDisclaimer
              type="comparison"
              lastUpdated="2024-12-17"
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/job-offer-analyzer" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

