# Content Asset Backlog — Non-Article Assets

> Scope: all major content assets outside the 55 article objects already scored in [nextjs-app/docs/CONTENT_SCORE_AUDIT.md](nextjs-app/docs/CONTENT_SCORE_AUDIT.md).
>
> Method: live template review plus source-data inventory review.

## Action Legend

- `Keep`: strong enough to retain as-is at the data level.
- `Template refresh`: keep the asset, but fix the shared page template, schema, trust, or CTA patterns.
- `Expand`: keep the family and increase coverage after the shared template is strengthened.
- `Source review`: keep the family, but verify claims, ratings, dates, or provider data before heavier promotion.

## Resume Examples

Shared finding: the resume-example family is better than earlier audits claimed. The main weakness is the shared template in [nextjs-app/src/app/career-hub/resume-examples/[roleSlug]/page.tsx](nextjs-app/src/app/career-hub/resume-examples/[roleSlug]/page.tsx), which still relies on inline JSON-LD and fixed dates rather than stronger shared-schema governance.

- `bartender`: `Keep`, `Template refresh`
- `server`: `Keep`, `Template refresh`
- `line-cook`: `Keep`, `Template refresh`
- `warehouse-operative`: `Keep`, `Template refresh`
- `forklift-driver`: `Keep`, `Template refresh`
- `retail-assistant`: `Keep`, `Template refresh`
- `cashier`: `Keep`, `Template refresh`
- `housekeeper`: `Keep`, `Template refresh`
- `janitor`: `Keep`, `Template refresh`
- `host`: `Keep`, `Template refresh`
- `barback`: `Keep`, `Template refresh`
- `dishwasher`: `Keep`, `Template refresh`
- `picker-packer`: `Keep`, `Template refresh`
- `shipping-receiving`: `Keep`, `Template refresh`
- `event-staff`: `Keep`, `Template refresh`
- `banquet-server`: `Keep`, `Template refresh`
- `delivery-driver`: `Keep`, `Template refresh`
- `food-runner`: `Keep`, `Template refresh`
- `general-labor`: `Keep`, `Template refresh`
- `brand-ambassador`: `Keep`, `Template refresh`

## Resume Templates

Shared finding: the template pages are useful and more substantial than a thin-download pattern, but they still need stronger structured-data governance, explicit FAQ support, and clearer ATS/use-case framing.

- `modern`: `Keep`, `Template refresh`
- `professional`: `Keep`, `Template refresh`
- `simple`: `Keep`, `Template refresh`
- `ats-friendly`: `Keep`, `Template refresh`
- `creative`: `Keep`, `Template refresh`
- `entry-level`: `Keep`, `Template refresh`

## Cover Letter Templates

Shared finding: the cover-letter pages are useful and well-structured, but like the resume-template pages they rely on inline JSON-LD and need stronger metadata, FAQ, and trust consistency.

- `hospitality`: `Keep`, `Template refresh`
- `warehouse`: `Keep`, `Template refresh`
- `retail`: `Keep`, `Template refresh`
- `facilities`: `Keep`, `Template refresh`
- `events`: `Keep`, `Template refresh`
- `general`: `Keep`, `Template refresh`

## Job Application Hub Pages

Shared finding: the application-support cluster is a meaningful content hub, not a filler section. The main work is to strengthen hub-to-spoke routing and trust signals.

- `job-application-toolkit`: `Keep`, `Template refresh`
- `templates` index: `Keep`, `Template refresh`
- `cover-letters` index: `Keep`, `Template refresh`
- `resume-examples` index: `Keep`, `Template refresh`

## How-To-Become Guides

Shared finding: this family is strategically strong and should stay. The work is to improve answer-first framing, make guide-specific FAQ value more obvious, and expand the family only after the shared template is tighter.

- `bartender`: `Keep`, `Template refresh`
- `server`: `Keep`, `Template refresh`
- `dishwasher`: `Keep`, `Template refresh`
- `warehouse-operative`: `Keep`, `Template refresh`
- `forklift-driver`: `Keep`, `Template refresh`
- `cashier`: `Keep`, `Template refresh`
- `security-guard`: `Keep`, `Template refresh`
- `barista`: `Keep`, `Template refresh`
- `line-cook`: `Keep`, `Template refresh`
- `prep-cook`: `Keep`, `Template refresh`
- `host`: `Keep`, `Template refresh`
- `food-runner`: `Keep`, `Template refresh`
- `busser`: `Keep`, `Template refresh`
- `barback`: `Keep`, `Template refresh`
- `banquet-server`: `Keep`, `Template refresh`
- `picker-packer`: `Keep`, `Template refresh`
- `machine-operator`: `Keep`, `Template refresh`
- `shipping-receiving`: `Keep`, `Template refresh`
- `retail-assistant`: `Keep`, `Template refresh`
- `stock-clerk`: `Keep`, `Template refresh`
- `janitor`: `Keep`, `Template refresh`
- `housekeeper`: `Keep`, `Template refresh`
- `event-staff`: `Keep`, `Template refresh`

**Expansion note:** after template cleanup, expand this family to the missing high-value roles before building adjacent low-intent guides.

## Interview Guides

Shared finding: these pages are useful and commercially relevant, but they still rely on fixed schema dates and a lighter trust layer than the site’s strongest guide families.

- `bartender`: `Keep`, `Template refresh`
- `server`: `Keep`, `Template refresh`
- `dishwasher`: `Keep`, `Template refresh`
- `host-hostess`: `Keep`, `Template refresh`
- `warehouse-operative`: `Keep`, `Template refresh`
- `forklift-driver`: `Keep`, `Template refresh`
- `cashier`: `Keep`, `Template refresh`
- `sales-associate`: `Keep`, `Template refresh`
- `security-guard`: `Keep`, `Template refresh`
- `janitor`: `Keep`, `Template refresh`

**Expansion note:** this family is one of the clearest “expand after template cleanup” opportunities on the site.

## Certifications

Shared finding: the certification family is valuable and structurally rich. The main work is source review and freshness control, especially around provider pricing, “worth it” claims, and the fixed schema dates in the shared page template.

- `food-handler`: `Keep`, `Source review`
- `tips-alcohol`: `Keep`, `Source review`
- `food-manager`: `Keep`, `Source review`
- `forklift`: `Keep`, `Source review`
- `osha-10`: `Keep`, `Source review`
- `reach-truck`: `Keep`, `Source review`
- `cpr-first-aid`: `Keep`, `Source review`
- `customer-service`: `Keep`, `Source review`

## Career Evaluations

Shared finding: this is one of the site’s strongest differentiated families. The biggest risk is not thin content, it is unsupported certainty in verdicts, score values, and “real talk” framing if those claims are not transparently grounded.

- `bartender`: `Keep`, `Source review`
- `server`: `Keep`, `Source review`
- `dishwasher`: `Keep`, `Source review`
- `barista`: `Keep`, `Source review`
- `warehouse-operative`: `Keep`, `Source review`
- `forklift-driver`: `Keep`, `Source review`
- `delivery-driver`: `Keep`, `Source review`
- `cashier`: `Keep`, `Source review`
- `sales-associate`: `Keep`, `Source review`
- `security-guard`: `Keep`, `Source review`
- `janitor`: `Keep`, `Source review`

**Expansion note:** expand only after the scoring/verdict framework is tied more explicitly to transparent evidence.

## Salary By Location

Shared finding: the salary-by-location family is stronger than earlier docs suggested because it already includes FAQs, author information, and data citations. The main work is to enrich supporting context and keep data provenance explicit.

- `bartender`: `Keep`, `Template refresh`
- `warehouse-operative`: `Keep`, `Template refresh`
- `server`: `Keep`, `Template refresh`
- `cashier`: `Keep`, `Template refresh`
- `security-guard`: `Keep`, `Template refresh`
- `forklift-driver`: `Keep`, `Template refresh`

## Persona Hubs

Shared finding: the persona hubs are useful and strategically important, but they should behave more like first-class SEO and conversion hubs, with stronger schema and stage-based routing.

- `students`: `Keep`, `Template refresh`
- `career-changers`: `Keep`, `Template refresh`
- `gig-workers`: `Keep`, `Template refresh`
- `parents`: `Keep`, `Template refresh`
- `retirees`: `Keep`, `Template refresh`

## Seasonal Hub Pages

Shared finding: the seasonal content system is a real growth lever, but it needs a more disciplined year-based lifecycle and better canonical handling for the evergreen-vs-yearly split.

- `holiday-2026`: `Keep`, `Template refresh`
- `summer-2026`: `Keep`, `Template refresh`
- `back-to-school-2026`: `Keep`, `Template refresh`
- `tax-season-2026`: `Keep`, `Template refresh`
- `spring-2026`: `Keep`, `Template refresh`

## Seasonal Event Pages

Shared finding: event pages are useful demand-capture assets, but should stay tightly tied to real event cycles and verified market relevance.

- `black-friday-2026`: `Keep`, `Template refresh`
- `prime-day-2026`: `Keep`, `Template refresh`
- `super-bowl-2026`: `Keep`, `Template refresh`
- `concert-season-2026`: `Keep`, `Template refresh`
- `new-years-2026`: `Keep`, `Template refresh`

## High-Intent Seasonal Landing Pages

Shared finding: these are some of the best conversion-facing seasonal pages on the site, but they currently miss canonical discipline and need yearly refresh governance.

- `summer-jobs-2026`: `Keep`, `Template refresh`
- `holiday-jobs-2026`: `Keep`, `Template refresh`

## Wage Report Narrative Pages

Shared finding: the wage-report cluster is one of the site’s strongest authority builders. The narrative pages should stay, but they need copy/data reconciliation and ongoing methodology transparency.

- `wage-report` hub: `Keep`, `Template refresh`
- `wage-report/2026`: `Keep`, `Template refresh`
- `wage-report/2026/methodology`: `Keep`, `Template refresh`
- `wage-report/2026/trends`: `Keep`, `Source review`

## Supporting Hubs With Secondary Priority

These pages matter, but they are not the first place to spend effort after the article corpus and the biggest pSEO templates.

- `resources`: `Keep`, `Template refresh`
- `for` index: `Keep`, `Template refresh`
- `experience/entry-level`: `Keep`, `Template refresh`

## Recommended Execution Order

1. Shared template cleanup for resume examples, templates, cover letters, personas, and seasonal landers.
2. Shared freshness and schema cleanup for how-to, interview, certification, and wage-report narrative families.
3. Evidence review for career-evaluation and certification claims.
4. Expansion only after the existing family templates are cleaner and the live audit docs are accepted as the new baseline.
