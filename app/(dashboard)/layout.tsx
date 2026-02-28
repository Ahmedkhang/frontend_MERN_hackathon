import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dashboard | Shopies",
  description: "Dashboard for Shopies",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="md:ml-64">
        <Navbar />
        <main className="p-6 min-h-[calc(100vh-80px-200px)]">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
