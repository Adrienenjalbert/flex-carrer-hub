import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image src={logo} alt="Indeed Flex" className="h-8 w-auto mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Find flexible work that fits your life. Hospitality, warehouse, retail, and more.
            </p>
          </div>

          {/* Explore Jobs */}
          <div>
            <h4 className="font-semibold mb-5">Explore Jobs</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link href="/career-hub/roles" className="hover:text-accent transition-colors">Browse All Roles</Link></li>
              <li><Link href="/career-hub/locations" className="hover:text-accent transition-colors">Jobs by Location</Link></li>
              <li><Link href="/career-hub/cities" className="hover:text-accent transition-colors">Jobs by City</Link></li>
              <li><Link href="/career-hub/seasonal-hiring" className="hover:text-accent transition-colors">Seasonal Jobs</Link></li>
              <li><Link href="/career-hub/roles" className="hover:text-accent transition-colors font-medium text-accent">View All →</Link></li>
            </ul>
          </div>

          {/* Application Toolkit */}
          <div>
            <h4 className="font-semibold mb-5">Application Toolkit</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link href="/career-hub/job-application-toolkit" className="hover:text-accent transition-colors">Full Toolkit</Link></li>
              <li><Link href="/career-hub/templates" className="hover:text-accent transition-colors">Resume Templates</Link></li>
              <li><Link href="/career-hub/cover-letters" className="hover:text-accent transition-colors">Cover Letters</Link></li>
              <li><Link href="/career-hub/resume-examples" className="hover:text-accent transition-colors">Resume Examples</Link></li>
              <li><Link href="/career-hub/job-application-toolkit" className="hover:text-accent transition-colors font-medium text-accent">Explore Toolkit →</Link></li>
            </ul>
          </div>

          {/* Career Tools */}
          <div>
            <h4 className="font-semibold mb-5">Career Tools</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link href="/career-hub/tools/paycheck-calculator" className="hover:text-accent transition-colors">Paycheck Calculator</Link></li>
              <li><Link href="/career-hub/tools/tax-calculator" className="hover:text-accent transition-colors">Tax Calculator</Link></li>
              <li><Link href="/career-hub/tools/shift-planner" className="hover:text-accent transition-colors">Shift Planner</Link></li>
              <li><Link href="/career-hub/tools/career-path" className="hover:text-accent transition-colors">Career Path Explorer</Link></li>
              <li><Link href="/career-hub/tools/cost-of-living" className="hover:text-accent transition-colors">Cost of Living</Link></li>
              <li><Link href="/career-hub/tools" className="hover:text-accent transition-colors font-medium text-accent">All 19 Tools →</Link></li>
            </ul>
          </div>

          {/* Guides & Resources */}
          <div>
            <h4 className="font-semibold mb-5">Guides & Resources</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link href="/career-hub/guides" className="hover:text-accent transition-colors">Career Guides</Link></li>
              <li><Link href="/career-hub/financial-tips" className="hover:text-accent transition-colors">Financial Tips</Link></li>
              <li><Link href="/career-hub/wage-report" className="hover:text-accent transition-colors">Wage Report</Link></li>
              <li><Link href="/career-hub/for" className="hover:text-accent transition-colors">Resources for You</Link></li>
              <li><a href="https://indeedflex.onelink.me/4jvh/x7l4jms3" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors font-medium text-accent">Download the App →</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Indeed Flex. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
            <a href="https://indeedflex.com/privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="https://indeedflex.com/terms" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="https://indeedflex.com/cookies" className="hover:text-accent transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Schema.org WebSite structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Indeed Flex Career Hub",
          "url": "https://indeedflex.com/career-hub",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://indeedflex.com/career-hub/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })
      }} />
    </footer>
  );
};

export default Footer;
