export default function CareerHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Header and Footer are now in root layout.tsx to ensure all pages have navigation
  return <>{children}</>;
}
