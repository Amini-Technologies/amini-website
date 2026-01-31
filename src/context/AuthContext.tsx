"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/api/admin";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "ADMIN" | "SUPPORT" | "ANALYST";
  twoFactorEnabled?: boolean;
}

interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Role-based permissions
const ROLE_PERMISSIONS: Record<string, string[]> = {
  SUPER_ADMIN: [
    "users.view", "users.edit", "users.delete", "users.suspend",
    "wallets.view", "wallets.sync", "wallets.suspend",
    "transactions.view", "transactions.approve", "transactions.reject", "transactions.reverse",
    "security.view", "security.resolve", "security.block_ip",
    "reports.view", "reports.export",
    "settings.view", "settings.edit",
    "admin.view", "admin.create", "admin.edit", "admin.delete",
    "audit.view",
  ],
  ADMIN: [
    "users.view", "users.edit", "users.suspend",
    "wallets.view", "wallets.sync", "wallets.suspend",
    "transactions.view", "transactions.approve", "transactions.reject",
    "security.view", "security.resolve", "security.block_ip",
    "reports.view", "reports.export",
    "settings.view",
    "audit.view",
  ],
  SUPPORT: [
    "users.view",
    "wallets.view",
    "transactions.view",
    "security.view",
    "reports.view",
  ],
  ANALYST: [
    "users.view",
    "wallets.view",
    "transactions.view",
    "reports.view", "reports.export",
  ],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await adminApi.logout();
    } catch {
      // Ignore errors during logout
    }
    setUser(null);
    adminApi.clearTokens();
    router.push("/admin/login");
  }, [router]);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("admin_user");
    const accessToken = localStorage.getItem("admin_access_token");

    if (storedUser && accessToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Optionally validate the session with the backend
        adminApi.getProfile().then((result) => {
          if (result.error) {
            // Session invalid, clear everything
            handleLogout();
          }
        });
      } catch {
        localStorage.removeItem("admin_user");
        localStorage.removeItem("admin_access_token");
        localStorage.removeItem("admin_refresh_token");
      }
    }
    setIsLoading(false);
  }, [handleLogout]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);

    try {
      const result = await adminApi.login(email, password);

      if (result.error) {
        setError(result.error);
        return false;
      }

      if (result.data?.user) {
        setUser(result.data.user as AdminUser);
        return true;
      }

      setError("Login failed. Please try again.");
      return false;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred during login");
      return false;
    }
  };

  const logout = async () => {
    await handleLogout();
  };

  const clearError = () => {
    setError(null);
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    const permissions = ROLE_PERMISSIONS[user.role] || [];
    return permissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        clearError,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
