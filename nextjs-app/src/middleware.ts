import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js Middleware for:
 * 1. URL normalization (trailing slashes)
 * 2. Redirect handling for legacy URLs and tool synonyms
 * 3. Security headers (CSP, HSTS)
 *
 * Note: www → non-www redirect should be handled at DNS/CDN level
 * (e.g., Vercel, Cloudflare) to avoid issues in development.
 */

// =====================================================
// TOOL SYNONYM & TYPO REDIRECTS (module-level for performance)
// Captures high-volume keyword variants and typos
// =====================================================
const TOOL_REDIRECTS: Record<string, string> = {
  // Paycheck Calculator synonyms (primary tool)
  "/paycalculator": "/career-hub/tools/paycheck-calculator",
  "/pay-calculator": "/career-hub/tools/paycheck-calculator",
  "/pay-check-calc": "/career-hub/tools/paycheck-calculator",
  "/pay-check-calculator": "/career-hub/tools/paycheck-calculator",
  "/calculate-my-paycheck": "/career-hub/tools/paycheck-calculator",
  "/payroll-calculator": "/career-hub/tools/paycheck-calculator",
  "/pay-stub-calculator": "/career-hub/tools/paycheck-calculator",
  "/paystub-calculator": "/career-hub/tools/paycheck-calculator",
  "/paycheck-calc": "/career-hub/tools/paycheck-calculator",
  "/paycheck": "/career-hub/tools/paycheck-calculator",
  "/calculator": "/career-hub/tools/paycheck-calculator",
  "/check-calculator": "/career-hub/tools/paycheck-calculator",
  "/wage-calculator": "/career-hub/tools/paycheck-calculator",
  "/hourly-pay-calculator": "/career-hub/tools/paycheck-calculator",
  "/gross-to-net": "/career-hub/tools/paycheck-calculator",
  "/gross-to-net-calculator": "/career-hub/tools/paycheck-calculator",

  // Take-Home Pay synonyms
  "/net-pay-calculator": "/career-hub/tools/take-home-pay",
  "/net-pay": "/career-hub/tools/take-home-pay",
  "/bring-home-pay": "/career-hub/tools/take-home-pay",
  "/bring-home-pay-calculator": "/career-hub/tools/take-home-pay",
  "/after-tax-pay": "/career-hub/tools/take-home-pay",
  "/after-tax-calculator": "/career-hub/tools/take-home-pay",
  "/net-check-calculator": "/career-hub/tools/take-home-pay",
  "/take-home": "/career-hub/tools/take-home-pay",
  "/takehome-calculator": "/career-hub/tools/take-home-pay",
  "/net-income-calculator": "/career-hub/tools/take-home-pay",

  // Tax Calculator synonyms
  "/income-tax-calculator": "/career-hub/tools/tax-calculator",
  "/tax-estimator": "/career-hub/tools/tax-calculator",
  "/federal-tax-calculator": "/career-hub/tools/tax-calculator",
  "/estimated-taxes": "/career-hub/tools/tax-calculator",
  "/estimated-tax-calculator": "/career-hub/tools/tax-calculator",
  "/1099-tax-calculator": "/career-hub/tools/tax-calculator",
  "/self-employment-tax": "/career-hub/tools/tax-calculator",
  "/taxes": "/career-hub/tools/tax-calculator",
  "/taxcalculator": "/career-hub/tools/tax-calculator",
  "/quarterly-tax-calculator": "/career-hub/tools/tax-calculator",
  "/gig-tax-calculator": "/career-hub/tools/tax-calculator",
  "/tax-refund-estimator": "/career-hub/tools/tax-calculator",
  "/refund-calculator": "/career-hub/tools/tax-calculator",

  // Salary Converter synonyms
  "/hourly-to-salary": "/career-hub/tools/salary-converter",
  "/salary-to-hourly": "/career-hub/tools/salary-converter",
  "/annual-to-hourly": "/career-hub/tools/salary-converter",
  "/hourly-to-annual": "/career-hub/tools/salary-converter",
  "/wage-converter": "/career-hub/tools/salary-converter",
  "/salary-calc": "/career-hub/tools/salary-converter",
  "/salarycalculator": "/career-hub/tools/salary-converter",
  "/salary-calculator": "/career-hub/tools/salary-converter",
  "/convert-salary": "/career-hub/tools/salary-converter",
  "/weekly-to-annual": "/career-hub/tools/salary-converter",
  "/annual-salary-calculator": "/career-hub/tools/salary-converter",

  // Shift Planner synonyms
  "/earnings-calculator": "/career-hub/tools/shift-planner",
  "/weekly-earnings": "/career-hub/tools/shift-planner",
  "/overtime-calculator": "/career-hub/tools/shift-planner",
  "/shift-calculator": "/career-hub/tools/shift-planner",
  "/work-schedule-calculator": "/career-hub/tools/shift-planner",
  "/shift-pay-calculator": "/career-hub/tools/shift-planner",
  "/overtime-pay-calculator": "/career-hub/tools/shift-planner",

  // Legacy internal URL redirects
  "/career-hub/tools/pay-calculator": "/career-hub/tools/paycheck-calculator",
  "/tools/pay": "/career-hub/tools/paycheck-calculator",
  "/tools/tax": "/career-hub/tools/tax-calculator",
  "/tools/salary": "/career-hub/tools/salary-converter",
  "/tools/shift": "/career-hub/tools/shift-planner",
};

// =====================================================
// LEGACY URL REDIRECTS (module-level for performance)
// Maintain link equity from old URL structure
// =====================================================
const LEGACY_REDIRECTS: Record<string, string> = {
  "/jobs": "/career-hub/roles",
  "/find-work": "/career-hub",
  "/careers": "/career-hub/roles",
  "/locations": "/career-hub/cities",
  "/resources/guides": "/career-hub/guides",
  "/blog": "/career-hub/guides",
  "/articles": "/career-hub/guides",
  "/help": "/career-hub/guides",
  "/resources": "/career-hub",
  "/about": "/career-hub/about",
  "/contact": "/career-hub/about",
};

// CSP header value (module-level constant)
const CSP_HEADER = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://vitals.vercel-analytics.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Skip static files and API routes (fast path)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Normalize URL - remove trailing slashes (except root)
  if (pathname !== "/" && pathname.endsWith("/")) {
    const normalizedUrl = new URL(
      pathname.slice(0, -1) + search,
      request.url
    );
    return NextResponse.redirect(normalizedUrl, 301);
  }

  // Check for tool redirects
  const toolRedirectTo = TOOL_REDIRECTS[pathname.toLowerCase()];
  if (toolRedirectTo) {
    return NextResponse.redirect(
      new URL(toolRedirectTo + search, request.url),
      301
    );
  }

  // Check for legacy redirects
  const legacyRedirectTo = LEGACY_REDIRECTS[pathname];
  if (legacyRedirectTo) {
    return NextResponse.redirect(
      new URL(legacyRedirectTo + search, request.url),
      301
    );
  }

  // Add security headers to response
  const response = NextResponse.next();

  // Content Security Policy
  response.headers.set("Content-Security-Policy", CSP_HEADER);

  // Strict Transport Security (HSTS) - 1 year with preload
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files with extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)",
  ],
};
