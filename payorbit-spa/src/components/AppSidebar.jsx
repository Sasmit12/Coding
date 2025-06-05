"use client"

import { Calculator, Receipt, Users, MessageSquare, FileText, GraduationCap, TestTube } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const adminItems = [
  {
    title: "Admin Dashboard",
    url: "admin",
    icon: Users,
  },
  {
    title: "Payout Calculator",
    url: "calculator",
    icon: Calculator,
  },
  {
    title: "Receipt Generator",
    url: "receipts",
    icon: Receipt,
  },
]

const mentorItems = [
  {
    title: "Mentor Dashboard",
    url: "mentor",
    icon: GraduationCap,
  },
]

const systemItems = [
  {
    title: "Chat Module",
    url: "chat",
    icon: MessageSquare,
  },
  {
    title: "Audit Log",
    url: "audit",
    icon: FileText,
  },
]

export function AppSidebar({ activeView, setActiveView, simulationMode, setSimulationMode }) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">PayOrbit</span>
            <span className="text-xs text-muted-foreground">EdTech Payouts</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => setActiveView(item.url)} isActive={activeView === item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Mentor Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mentorItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => setActiveView(item.url)} isActive={activeView === item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => setActiveView(item.url)} isActive={activeView === item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="flex items-center space-x-2 p-2">
          <TestTube className="h-4 w-4" />
          <Label htmlFor="simulation-mode" className="text-sm">
            Simulation Mode
          </Label>
          <Switch id="simulation-mode" checked={simulationMode} onCheckedChange={setSimulationMode} />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}