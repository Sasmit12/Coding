import React from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Calendar,
  Users,
  CreditCard,
  Receipt,
  MessageSquare,
  History,
  Wallet,
  MoreVertical,
  User,
} from "lucide-react";

const navigationItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/sessions", label: "Sessions", icon: Calendar },
  { href: "/mentors", label: "Mentors", icon: Users },
  { href: "/payouts", label: "Payouts", icon: CreditCard },
  { href: "/receipts", label: "Receipts", icon: Receipt },
  { href: "/chat", label: "Messages", icon: MessageSquare },
  { href: "/audit-logs", label: "Audit Logs", icon: History },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-card shadow-material flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Wallet className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-medium text-foreground">PayoutHub</h1>
            <p className="text-sm text-muted-foreground">Mentor Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location === item.href ||
              (item.href !== "/" && location.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <a
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3 p-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Admin User</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </aside>
  );
}