import { Navbar } from "@/components/layout/Navbar";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <MobileNavigation />
      <Navbar />
      <main className="flex-1 md:pt-0 md:pb-0 pb-20">{children}</main>
      <Footer />
    </div>
  );
}
