import { Navbar } from "@/components/layout/Navbar";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/shared/CartDrawer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#FCFAF6]">
      <MobileNavigation />
      <Navbar />
      <CartDrawer />
      <main className="flex-1 md:pt-0 md:pb-0 pb-20 bg-[#FCFAF6]">{children}</main>
      <Footer />
    </div>
  );
}
