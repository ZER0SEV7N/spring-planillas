import { AppSidebar } from "@/components/public/sidebar"
import { Navbar } from "@/components/public/navbar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      
      <div className="flex-1 flex flex-col min-h-screen bg-[#F8F9FB] w-full">
        <Navbar />
        
        <main className="p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}