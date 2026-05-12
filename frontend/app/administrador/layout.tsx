import { Sidebar } from "@/components/public/sidebar"
import { Navbar } from "@/components/public/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-64">
        <Navbar />
        
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}