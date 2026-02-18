"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  X,
  ChevronDown,
  // Explore Jobs
  Briefcase,
  MapPin,
  Building2,
  Calendar,
  Sun,
  Snowflake,
  Star,
  // Application Toolkit
  FileText,
  Mail,
  UserCheck,
  ClipboardList,
  // Career Guides
  BookOpen,
  Compass,
  TrendingUp,
  Heart,
  Users,
  GraduationCap,
  MessageSquare,
  HelpCircle,
  // Financial Resources
  Lightbulb,
  BarChart3,
  DollarSign,
  // Career Tools – Pay & Salary
  Calculator,
  Repeat,
  Wallet,
  Receipt,
  // Career Tools – Planning
  Target,
  Scale,
  Clock,
  Wrench,
  // Career Tools – Life & Benefits
  Globe,
  Car,
  Baby,
  Shield,
  Award,
  AlertCircle,
  // Career Tools – Fun
  Coffee,
  UtensilsCrossed,
  MessageCircle,
  HardHat,
  // General
  ArrowRight,
} from "lucide-react";
import logo from "@/assets/logo.svg";

// ═══════════════════════════════════════════════════════════════════════
// DATA: 5 Content Pillars — each becomes a secondary nav tab with dropdown
// ═══════════════════════════════════════════════════════════════════════

const contentPillars = [
  // ── 1. Explore Jobs ──────────────────────────────────────────────
  {
    id: "explore-jobs",
    label: "Explore Jobs",
    href: "/career-hub/roles",
    dropdown: {
      type: "multi" as const,
      columns: [
        {
          label: "Browse by Type",
          items: [
            { title: "All Roles", href: "/career-hub/roles", icon: Briefcase },
            { title: "Jobs by Location", href: "/career-hub/locations", icon: MapPin },
            { title: "Jobs by City", href: "/career-hub/cities", icon: Building2 },
            { title: "Jobs by Industry", href: "/career-hub/industries", icon: Building2 },
            { title: "Entry-Level Jobs", href: "/career-hub/experience/entry-level", icon: Star },
          ],
        },
        {
          label: "Seasonal & Trending",
          items: [
            { title: "Seasonal Hiring Guide", href: "/career-hub/seasonal-hiring", icon: Calendar },
            { title: "Summer Jobs 2026", href: "/career-hub/summer-jobs-2026", icon: Sun },
            { title: "Holiday Jobs 2026", href: "/career-hub/holiday-jobs-2026", icon: Snowflake },
            { title: "Active Markets", href: "/career-hub/locations", icon: MapPin },
          ],
        },
      ],
      viewAll: { text: "View all job categories", href: "/career-hub/roles" },
    },
  },

  // ── 2. Application Toolkit ───────────────────────────────────────
  {
    id: "application-toolkit",
    label: "Application Toolkit",
    href: "/career-hub/job-application-toolkit",
    dropdown: {
      type: "multi" as const,
      columns: [
        {
          label: "Templates & Examples",
          items: [
            { title: "Full Toolkit Overview", href: "/career-hub/job-application-toolkit", icon: ClipboardList },
            { title: "Resume Templates", href: "/career-hub/templates", icon: FileText },
            { title: "Cover Letter Templates", href: "/career-hub/cover-letters", icon: Mail },
            { title: "Resume Examples by Role", href: "/career-hub/resume-examples", icon: UserCheck },
          ],
        },
        {
          label: "Interview Prep",
          items: [
            { title: "Interview Questions", href: "/interview-questions", icon: MessageSquare },
            { title: "How to Become Guides", href: "/how-to-become", icon: HelpCircle },
            { title: "Skills Analyzer Tool", href: "/career-hub/tools/skills-analyzer", icon: Wrench },
          ],
        },
      ],
      viewAll: { text: "Explore the full toolkit", href: "/career-hub/job-application-toolkit" },
    },
  },

  // ── 3. Career Guides ─────────────────────────────────────────────
  {
    id: "career-guides",
    label: "Career Guides",
    href: "/career-hub/guides",
    dropdown: {
      type: "multi" as const,
      columns: [
        {
          label: "Learning Resources",
          items: [
            { title: "All Career Guides", href: "/career-hub/guides", icon: BookOpen },
            { title: "How to Become Guides", href: "/how-to-become", icon: HelpCircle },
            { title: "Interview Questions", href: "/interview-questions", icon: MessageSquare },
            { title: "Certifications", href: "/certifications", icon: Award },
          ],
        },
        {
          label: "Personalized Help",
          items: [
            { title: "Resources for You", href: "/career-hub/for", icon: Users },
            { title: "All Resources", href: "/career-hub/resources", icon: GraduationCap },
            { title: "About Career Hub", href: "/career-hub/about", icon: Compass },
          ],
        },
      ],
      viewAll: { text: "Browse all guides", href: "/career-hub/guides" },
    },
  },

  // ── 4. Financial Resources ───────────────────────────────────────
  {
    id: "financial-resources",
    label: "Financial Resources",
    href: "/career-hub/financial-tips",
    dropdown: {
      type: "multi" as const,
      columns: [
        {
          label: "Financial Guidance",
          items: [
            { title: "Financial Tips & Advice", href: "/career-hub/financial-tips", icon: Lightbulb },
            { title: "Wage Report 2026", href: "/career-hub/wage-report", icon: BarChart3 },
            { title: "Unemployment Benefits", href: "/unemployment-benefits", icon: AlertCircle },
          ],
        },
        {
          label: "Financial Calculators",
          items: [
            { title: "Paycheck Calculator", href: "/career-hub/tools/paycheck-calculator", icon: Calculator },
            { title: "Tax Calculator", href: "/career-hub/tools/tax-calculator", icon: Receipt },
            { title: "Cost of Living", href: "/career-hub/tools/cost-of-living", icon: Globe },
            { title: "Unemployment Calculator", href: "/career-hub/tools/unemployment-calculator", icon: AlertCircle },
          ],
        },
      ],
      viewAll: { text: "View all financial resources", href: "/career-hub/financial-tips" },
    },
  },

  // ── 5. Career Tools ──────────────────────────────────────────────
  {
    id: "career-tools",
    label: "Career Tools",
    href: "/career-hub/tools",
    dropdown: {
      type: "multi" as const,
      columns: [
        {
          label: "Pay & Salary",
          items: [
            { title: "Paycheck Calculator", href: "/career-hub/tools/paycheck-calculator", icon: Calculator },
            { title: "Salary Converter", href: "/career-hub/tools/salary-converter", icon: Repeat },
            { title: "Take-Home Pay", href: "/career-hub/tools/take-home-pay", icon: Wallet },
            { title: "Tax Calculator", href: "/career-hub/tools/tax-calculator", icon: Receipt },
          ],
        },
        {
          label: "Planning & Career",
          items: [
            { title: "Career Path Explorer", href: "/career-hub/tools/career-path", icon: Target },
            { title: "Job Offer Analyzer", href: "/career-hub/tools/job-offer-analyzer", icon: Scale },
            { title: "Shift Planner", href: "/career-hub/tools/shift-planner", icon: Clock },
            { title: "Skills Analyzer", href: "/career-hub/tools/skills-analyzer", icon: Wrench },
          ],
        },
        {
          label: "Life & Benefits",
          items: [
            { title: "Cost of Living", href: "/career-hub/tools/cost-of-living", icon: Globe },
            { title: "Commute Calculator", href: "/career-hub/tools/commute-calculator", icon: Car },
            { title: "Childcare Calculator", href: "/career-hub/tools/childcare-calculator", icon: Baby },
            { title: "Benefits Checker", href: "/career-hub/tools/benefits-checker", icon: Shield },
            { title: "Unemployment Calculator", href: "/career-hub/tools/unemployment-calculator", icon: AlertCircle },
            { title: "Certification ROI", href: "/career-hub/tools/certification-roi", icon: Award },
          ],
        },
        {
          label: "Fun & Interactive",
          items: [
            { title: "Cocktail Quiz", href: "/career-hub/tools/cocktail-quiz", icon: Coffee },
            { title: "Menu Master", href: "/career-hub/tools/menu-master", icon: UtensilsCrossed },
            { title: "WorkTalk", href: "/career-hub/tools/worktalk", icon: MessageCircle },
            { title: "Safety First", href: "/career-hub/tools/safety-first", icon: HardHat },
          ],
        },
      ],
      viewAll: { text: "View all 17+ tools", href: "/career-hub/tools" },
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════
// HEADER COMPONENT
// ═══════════════════════════════════════════════════════════════════════

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  const toggleMobileSection = (title: string) => {
    setMobileExpandedSection((prev) => (prev === title ? null : title));
  };

  return (
    <header className="bg-white sticky top-0 z-50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ═══════ TOP NAVIGATION BAR ═══════ */}
      <div className="bg-white" style={{ paddingTop: 16, paddingBottom: 16, borderBottom: '1px solid rgb(236, 236, 236)' }}>
        <div style={{ paddingLeft: 16, paddingRight: 16 }} className="md:!px-[60px]">
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center relative">

            {/* Left: Top-level links */}
            <nav className="hidden lg:flex items-center" style={{ gap: 40 }}>
              <a
                href="https://indeedflex.com"
                className="relative inline-block nav-link-hover"
                style={{ fontSize: 16, fontWeight: 700, lineHeight: '27px', letterSpacing: '0.25px', color: 'rgba(60,60,60,0.8)', transitionDuration: '300ms', textDecoration: 'none' }}
              >
                Jobseekers
              </a>
              <a
                href="https://indeedflex.com/employers/"
                className="relative inline-block nav-link-hover"
                style={{ fontSize: 16, fontWeight: 700, lineHeight: '27px', letterSpacing: '0.25px', color: 'rgba(60,60,60,0.8)', transitionDuration: '300ms', textDecoration: 'none' }}
              >
                Employers
              </a>
              <Link
                href="/career-hub"
                className="relative inline-block"
                style={{ fontSize: 16, fontWeight: 700, lineHeight: '27px', letterSpacing: '0.25px', color: 'rgb(221,0,169)', textDecoration: 'none' }}
              >
                Career Hub
                <span style={{ position: 'absolute', left: 0, bottom: -5, height: 1, width: '100%', backgroundColor: 'rgb(221,0,169)' }} />
              </Link>
            </nav>

            {/* Center: Logo */}
            <div className="hidden lg:block absolute left-1/2 top-1/2" style={{ width: 213, transform: 'translate(-50%,-50%)' }}>
              <Link href="/career-hub">
                <Image src={logo} alt="Indeed Flex" width={192} height={35} priority style={{ width: 192, height: 'auto' }} />
              </Link>
            </div>

            {/* Mobile logo */}
            <div className="lg:hidden" style={{ width: 109, height: 24, position: 'relative' }}>
              <Link href="/career-hub">
                <Image src={logo} alt="Indeed Flex" fill style={{ objectFit: 'contain' }} priority />
              </Link>
            </div>

            {/* Right: CTA + Mobile hamburger */}
            <div className="flex items-center" style={{ gap: 30 }}>
              <a
                href="https://indeedflex.onelink.me/4jvh/x7l4jms3"
                target="_blank"
                rel="noopener noreferrer"
                className="download-btn-hover hidden lg:inline-block"
                style={{
                  borderRadius: 100, paddingTop: 11, paddingBottom: 11, paddingLeft: 16, paddingRight: 16,
                  textAlign: 'center', fontSize: 14, fontWeight: 700, lineHeight: '14px',
                  color: '#fff', backgroundColor: 'rgb(221,0,169)', textDecoration: 'none',
                  transitionDuration: '300ms', whiteSpace: 'nowrap',
                }}
              >
                Download app
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center flex-col justify-center cursor-pointer"
                style={{ height: 24, width: 24 }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-[17px] h-[17px] text-black" />
                ) : (
                  <>
                    <span style={{ width: 17, height: 2, backgroundColor: 'black', marginTop: 2, marginBottom: 2 }} />
                    <span style={{ width: 17, height: 2, backgroundColor: 'black', marginTop: 2, marginBottom: 2 }} />
                    <span style={{ width: 17, height: 2, backgroundColor: 'black', marginTop: 2, marginBottom: 2 }} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ SECONDARY NAVIGATION BAR (Desktop) ═══════ */}
      <div className="hidden lg:block bg-white relative" style={{ borderBottom: '1px solid rgb(236,236,236)' }} ref={dropdownRef}>
        <div style={{ paddingLeft: 60, paddingRight: 60 }}>
          <nav className="flex items-center" style={{ gap: 0 }}>
            {contentPillars.map((pillar) => {
              const isOpen = openDropdown === pillar.id;
              return (
                <div
                  key={pillar.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(pillar.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : pillar.id)}
                    className={`relative inline-flex items-center gap-1 cursor-pointer bg-transparent border-none sub-nav-link-hover`}
                    style={{
                      fontSize: 14, fontWeight: 700, lineHeight: '27px', letterSpacing: '0.25px',
                      color: isOpen ? 'rgb(221,0,169)' : 'rgba(60,60,60,0.8)',
                      transitionDuration: '200ms', textDecoration: 'none',
                      padding: '14px 16px', whiteSpace: 'nowrap',
                    }}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    {pillar.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    {/* Active indicator bar */}
                    {isOpen && (
                      <span style={{
                        position: 'absolute', left: 16, right: 16, bottom: 0, height: 2,
                        backgroundColor: 'rgb(221,0,169)', borderRadius: 1,
                      }} />
                    )}
                  </button>

                  {/* ── Dropdown Panel ── */}
                  {isOpen && (
                    <div
                      className="absolute top-full left-0 bg-white rounded-b-xl shadow-xl z-50"
                      style={{
                        border: '1px solid rgb(236,236,236)', borderTop: 'none',
                        minWidth: pillar.dropdown.type === 'multi' 
                          ? (pillar.dropdown.columns?.length === 2 ? 500 : pillar.dropdown.columns?.length === 3 ? 750 : 800)
                          : 320,
                        maxWidth: pillar.dropdown.type === 'multi' ? 900 : 400,
                        animation: 'fadeSlideDown 150ms ease-out',
                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)',
                      }}
                    >
                      {/* Multi-column dropdown (Mega Menu) */}
                      {pillar.dropdown.type === 'multi' && (
                        <div style={{ padding: '20px 0 16px' }}>
                          <div className={`grid ${pillar.dropdown.columns?.length === 2 ? 'grid-cols-2' : pillar.dropdown.columns?.length === 3 ? 'grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'}`} style={{ gap: 0 }}>
                            {pillar.dropdown.columns?.map((column, cIdx) => (
                              <div 
                                key={cIdx} 
                                style={{ 
                                  padding: '0 12px', 
                                  borderRight: cIdx < (pillar.dropdown.columns?.length ?? 0) - 1 ? '1px solid rgb(236,236,236)' : 'none',
                                  minWidth: pillar.id === 'career-tools' ? 180 : 200,
                                }}
                              >
                                <p style={{ 
                                  fontSize: 11, 
                                  fontWeight: 700, 
                                  textTransform: 'uppercase', 
                                  letterSpacing: 1, 
                                  color: 'rgba(60,60,60,0.6)', 
                                  padding: '0 8px 12px',
                                  marginBottom: 4,
                                }}>
                                  {column.label}
                                </p>
                                {column.items.map((item) => {
                                  const Icon = item.icon;
                                  return (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={() => setOpenDropdown(null)}
                                      className="flex items-center gap-2.5 hover:bg-gray-50 transition-colors rounded group"
                                      style={{ padding: '10px 8px', textDecoration: 'none', marginBottom: 2 }}
                                    >
                                      <Icon className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: 'rgb(221,0,169)' }} strokeWidth={1.8} />
                                      <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(60,60,60,0.9)', lineHeight: '18px' }}>
                                        {item.title}
                                      </span>
                                    </Link>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                          {pillar.dropdown.viewAll && (
                            <>
                              <div style={{ height: 1, backgroundColor: 'rgb(236,236,236)', margin: '16px 20px 0' }} />
                              <Link
                                href={pillar.dropdown.viewAll.href}
                                onClick={() => setOpenDropdown(null)}
                                className="flex items-center gap-2 hover:bg-gray-50 transition-colors group"
                                style={{ padding: '14px 20px 10px', textDecoration: 'none' }}
                              >
                                <span style={{ fontSize: 14, fontWeight: 700, color: 'rgb(221,0,169)' }}>
                                  {pillar.dropdown.viewAll.text}
                                </span>
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" style={{ color: 'rgb(221,0,169)' }} />
                              </Link>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ═══════ MOBILE MENU ═══════ */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed left-0 w-full bg-white overflow-hidden z-30 flex flex-col"
          style={{ top: 57, height: 'calc(100vh - 57px)' }}
        >
          {/* Top links */}
          <div style={{ borderBottom: '1px solid rgb(236,236,236)', flexShrink: 0 }}>
            <a
              href="https://indeedflex.com"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
              style={{ fontSize: 14, fontWeight: 700, lineHeight: '27px', letterSpacing: '0.25px', color: 'rgba(60,60,60,0.8)', textDecoration: 'none', padding: '14px 16px', borderBottom: '1px solid rgb(236,236,236)' }}
            >
              Jobseekers
            </a>
            <a
              href="https://indeedflex.com/employers/"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
              style={{ fontSize: 14, fontWeight: 700, lineHeight: '27px', letterSpacing: '0.25px', color: 'rgba(60,60,60,0.8)', textDecoration: 'none', padding: '14px 16px', borderBottom: '1px solid rgb(236,236,236)' }}
            >
              Employers
            </a>
            <Link
              href="/career-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
              style={{ fontSize: 14, fontWeight: 700, lineHeight: '27px', letterSpacing: '0.25px', color: 'rgb(221,0,169)', textDecoration: 'none', padding: '14px 16px' }}
            >
              Career Hub Home
            </Link>
          </div>

          {/* Pillar accordion sections */}
          <div className="flex-1 overflow-auto">
            {contentPillars.map((pillar) => {
              const isExpanded = mobileExpandedSection === pillar.id;

              return (
                <div key={pillar.id} style={{ borderBottom: '1px solid rgb(236,236,236)' }}>
                  <button
                    onClick={() => toggleMobileSection(pillar.id)}
                    className="flex items-center justify-between w-full text-left cursor-pointer"
                    style={{
                      padding: 16, fontSize: 14, fontWeight: 700, lineHeight: '27px', letterSpacing: '0.25px',
                      color: isExpanded ? 'rgb(221,0,169)' : 'rgba(60,60,60,0.9)',
                      backgroundColor: isExpanded ? 'rgba(221,0,169,0.03)' : 'transparent',
                      transitionDuration: '200ms',
                    }}
                  >
                    <span>{pillar.label}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-accent' : 'text-gray-400'}`} />
                  </button>

                  {isExpanded && (
                    <div style={{ paddingBottom: 8, backgroundColor: 'rgba(249,249,249,0.6)' }}>
                      {/* Show column labels for multi-column (Career Tools) */}
                      {pillar.dropdown.type === 'multi' && pillar.dropdown.columns?.map((column, cIdx) => (
                        <div key={cIdx}>
                          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(60,60,60,0.45)', padding: '10px 16px 4px' }}>
                            {column.label}
                          </p>
                          {column.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-3 hover:bg-gray-100/60 transition-colors"
                                style={{ padding: '10px 16px 10px 28px', textDecoration: 'none' }}
                              >
                                <Icon className="h-4 w-4 flex-shrink-0" style={{ color: 'rgb(221,0,169)' }} strokeWidth={1.8} />
                                <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(60,60,60,0.9)' }}>{item.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      ))}

                      {/* View all link */}
                      {pillar.dropdown.viewAll && (
                        <Link
                          href={pillar.dropdown.viewAll.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2"
                          style={{ padding: '10px 16px 10px 28px', textDecoration: 'none' }}
                        >
                          <span style={{ fontSize: 13, fontWeight: 700, color: 'rgb(221,0,169)' }}>{pillar.dropdown.viewAll.text}</span>
                          <ArrowRight className="h-3.5 w-3.5" style={{ color: 'rgb(221,0,169)' }} />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile CTA pinned to bottom */}
          <div style={{ padding: 16, borderTop: '1px solid rgb(236,236,236)', backgroundColor: 'white', flexShrink: 0 }}>
            <a
              href="https://indeedflex.onelink.me/4jvh/x7l4jms3"
              target="_blank"
              rel="noopener noreferrer"
              className="download-btn-hover block w-full"
              style={{
                borderRadius: 100, paddingTop: 14, paddingBottom: 14,
                textAlign: 'center', fontSize: 14, fontWeight: 700, lineHeight: '14px',
                color: '#fff', backgroundColor: 'rgb(221,0,169)', textDecoration: 'none',
              }}
            >
              Download the app
            </a>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;
