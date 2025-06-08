import React from "react";
import { Sidebar, SidebarProvider } from "./Sidebar";

export function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}