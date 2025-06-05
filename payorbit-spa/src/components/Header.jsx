import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { TestTube } from "lucide-react"

const viewTitles = {
  admin: "Admin Dashboard",
  calculator: "Payout Calculator",
  receipts: "Receipt Generator",
  mentor: "Mentor Dashboard",
  chat: "Chat Module",
  audit: "Audit Log",
}

export function Header({ activeView, simulationMode }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">{viewTitles[activeView]}</h1>
        {simulationMode && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <TestTube className="h-3 w-3" />
            Simulation Mode
          </Badge>
        )}
      </div>
    </header>
  )
}