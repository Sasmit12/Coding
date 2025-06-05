import React, { useState } from "react";
// If you don't have SidebarProvider, remove or implement your own context/provider
// import { SidebarProvider } from "../components/ui/sidebar";
import AppSidebar from "../components/app-sidebar";
import AdminDashboard from "../components/admin-dashboard";
import PayoutCalculator from "../components/payout-calculator";
import ReceiptGenerator from "../components/receipt-generator";
import MentorDashboard from "../components/mentor-dashboard";
import ChatModule from "../components/chat-module";
import AuditLog from "../components/audit-log";
import SidebarInset from "../components/ui/Sidebar";
import Header from "../components/header";

export default function PayoutSystem() {
  const [activeView, setActiveView] = useState("admin");
  const [simulationMode, setSimulationMode] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case "admin":
        return <AdminDashboard simulationMode={simulationMode} />;
      case "calculator":
        return <PayoutCalculator simulationMode={simulationMode} />;
      case "receipts":
        return <ReceiptGenerator simulationMode={simulationMode} />;
      case "mentor":
        return <MentorDashboard />;
      case "chat":
        return <ChatModule />;
      case "audit":
        return <AuditLog />;
      default:
        return <AdminDashboard simulationMode={simulationMode} />;
    }
  };

  return (
    // If you do NOT have a SidebarProvider, remove the next line and the closing tag at the end
    // <SidebarProvider>
      <>
        <AppSidebar
          activeView={activeView}
          setActiveView={setActiveView}
          simulationMode={simulationMode}
          setSimulationMode={setSimulationMode}
        />
        <SidebarInset>
          <Header
            activeView={activeView}
            simulationMode={simulationMode}
            setSimulationMode={setSimulationMode}
          />
          <div className="p-4 md:p-6">{renderActiveView()}</div>
        </SidebarInset>
      </>
    // </SidebarProvider>
  );
}