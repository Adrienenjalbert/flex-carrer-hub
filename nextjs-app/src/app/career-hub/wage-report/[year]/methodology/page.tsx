import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { wageReportMethodology } from "@/lib/data/wage-report/methodology";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/career-hub/seo";

interface MethodologyPageProps {
  params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: MethodologyPageProps): Promise<Metadata> {
  const { year } = await params;
  if (year !== "2026") {
    return {};
  }

  return {
    title: "Wage Report Methodology | Data Sources & Research Methods",
    description: "Comprehensive methodology for the 2026 Flex Work Wage Report. Data sources, research methods, limitations, and update schedule.",
    keywords: ["wage report methodology", "BLS data", "research methods", "data sources"],
    alternates: {
      canonical: `https://indeedflex.com/career-hub/wage-report/${year}/methodology`,
    },
  };
}

export default async function MethodologyPage({ params }: MethodologyPageProps) {
  const { year } = await params;
  if (year !== "2026") {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Wage Report", href: "/career-hub/wage-report" },
    { label: year, href: `/career-hub/wage-report/${year}` },
    { label: "Methodology", href: `/career-hub/wage-report/${year}/methodology` },
  ];
  
  const breadcrumbSchemaItems = [
    { name: "Home", url: "/" },
    { name: "Career Hub", url: "/career-hub" },
    { name: "Wage Report", url: "/career-hub/wage-report" },
    { name: year, url: `/career-hub/wage-report/${year}` },
    { name: "Methodology", url: `/career-hub/wage-report/${year}/methodology` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-6">
        <Link href={`/career-hub/wage-report/${year}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Report
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Report Methodology
        </h1>
        <p className="text-lg text-gray-700">
          Transparent documentation of data sources, research methods, and limitations for the 2026 Flex Work Wage Report.
        </p>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* Data Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Data Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wageReportMethodology.dataSources.map((source, index) => (
                <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                  <h3 className="font-semibold mb-1">{source.name}</h3>
                  {source.url && (
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                      {source.url}
                    </a>
                  )}
                  {source.notes && (
                    <p className="text-sm text-muted-foreground mt-1">{source.notes}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Reliability: {source.reliability}</span>
                    <span>Last Accessed: {source.lastAccessed}</span>
                  </div>
                  {source.notes && (
                    <p className="text-xs text-muted-foreground mt-2 italic">{source.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Methodology */}
        <Card>
          <CardHeader>
            <CardTitle>Research Methodology</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Wage Data Collection</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {wageReportMethodology.methodology.wageDataCollection.primarySource}
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>{wageReportMethodology.methodology.wageDataCollection.percentileCalculation}</li>
                <li>{wageReportMethodology.methodology.wageDataCollection.employmentData}</li>
                <li>{wageReportMethodology.methodology.wageDataCollection.geographicData}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Year-over-Year Comparison</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>{wageReportMethodology.methodology.yearOverYearComparison.priorYearData}</li>
                <li>{wageReportMethodology.methodology.yearOverYearComparison.growthCalculation}</li>
                <li>{wageReportMethodology.methodology.yearOverYearComparison.inflationAdjustment}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Cost of Living Adjustments</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {wageReportMethodology.methodology.costOfLivingAdjustments.source}
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Index Base: {wageReportMethodology.methodology.costOfLivingAdjustments.indexBase}</li>
                <li>Calculation: {wageReportMethodology.methodology.costOfLivingAdjustments.calculation}</li>
                <li>Components: {wageReportMethodology.methodology.costOfLivingAdjustments.components.join(", ")}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Limitations */}
        <Card>
          <CardHeader>
            <CardTitle>Limitations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {wageReportMethodology.limitations.map((limitation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-muted-foreground mt-1">•</span>
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Update Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Data Update Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Frequency:</span> {wageReportMethodology.updateSchedule.frequency}</p>
              <p><span className="font-semibold">Next Update:</span> {wageReportMethodology.updateSchedule.nextUpdate}</p>
              <p><span className="font-semibold">Data Refresh:</span> {wageReportMethodology.updateSchedule.dataRefresh}</p>
              {wageReportMethodology.updateSchedule.notes && (
                <p className="text-muted-foreground italic">{wageReportMethodology.updateSchedule.notes}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Data Quality */}
        <Card>
          <CardHeader>
            <CardTitle>Data Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold">Coverage</p>
                <p className="text-muted-foreground">{wageReportMethodology.dataQuality.coverage}</p>
              </div>
              <div>
                <p className="font-semibold">Geographic Coverage</p>
                <p className="text-muted-foreground">{wageReportMethodology.dataQuality.geographicCoverage}</p>
              </div>
              <div>
                <p className="font-semibold">Employment Coverage</p>
                <p className="text-muted-foreground">{wageReportMethodology.dataQuality.employmentCoverage}</p>
              </div>
              <div>
                <p className="font-semibold">Data Completeness</p>
                <p className="text-muted-foreground">{wageReportMethodology.dataQuality.dataCompleteness}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <span className="font-semibold">Confidence Level:</span> {wageReportMethodology.confidenceLevel}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

