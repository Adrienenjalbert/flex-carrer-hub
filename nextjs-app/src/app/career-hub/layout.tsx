import Header from "@/components/career-hub/Header";
import Footer from "@/components/career-hub/Footer";

export default function CareerHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
