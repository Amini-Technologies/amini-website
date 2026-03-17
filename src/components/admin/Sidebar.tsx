"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Wallet,
  LayoutDashboard,
  Users,
  CreditCard,
  ArrowLeftRight,
  Settings,
  FileText,
  Shield,
  HelpCircle,
  X,
  TrendingUp,
  HandHeart,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Wallets", href: "/admin/wallets", icon: CreditCard },
  { name: "Transactions", href: "/admin/transactions", icon: ArrowLeftRight },
  { name: "Adashi & Savings", href: "/admin/savings", icon: TrendingUp },
  { name: "Gudunmawa", href: "/admin/gudunmawa", icon: HandHeart },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Security", href: "/admin/security", icon: Shield },
];

const secondaryNavigation = [
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Help & Support", href: "/admin/help", icon: HelpCircle },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 rounded-lg bg-white p-2 border border-gray-200"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6 text-gray-600" />
        ) : (
          <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-gray-900/50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-6">
            <div className="h-9 w-9 rounded-xl gradient-bg flex items-center justify-center">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Amini</span>
            <span className="ml-1 rounded-md bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
              Admin
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive(item.href)
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      isActive(item.href)
                        ? "text-primary-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    )}
                  />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Secondary navigation */}
            <div className="mt-8">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Settings
              </p>
              <div className="mt-2 space-y-1">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                      isActive(item.href)
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 shrink-0",
                        isActive(item.href)
                          ? "text-primary-600"
                          : "text-gray-400 group-hover:text-gray-600"
                      )}
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="rounded-lg bg-gradient-to-br from-primary-50 to-accent-50 p-4">
              <p className="text-sm font-medium text-gray-900">Need help?</p>
              <p className="mt-1 text-xs text-gray-600">
                Check our documentation or contact support.
              </p>
              <a
                href="#"
                className="mt-3 inline-flex items-center text-xs font-medium text-primary-600 hover:text-primary-700"
              >
                View Documentation &rarr;
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
