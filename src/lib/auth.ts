// Admin authentication helpers
// Note: Actual authentication is handled by the backend API

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "ADMIN" | "SUPPORT" | "ANALYST";
  twoFactorEnabled?: boolean;
}

// Role display names
export const ROLE_DISPLAY_NAMES: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  SUPPORT: "Support",
  ANALYST: "Analyst",
};

// Role descriptions
export const ROLE_DESCRIPTIONS: Record<string, string> = {
  SUPER_ADMIN: "Full system access including admin management and settings",
  ADMIN: "Management access for users, wallets, and transactions",
  SUPPORT: "Read access with limited actions like KYC verification",
  ANALYST: "Read-only access with report generation capabilities",
};

// Check if user has a specific role
export function hasRole(user: AdminUser | null, role: string): boolean {
  if (!user) return false;
  return user.role === role;
}

// Check if user has any of the specified roles
export function hasAnyRole(user: AdminUser | null, roles: string[]): boolean {
  if (!user) return false;
  return roles.includes(user.role);
}

// Get role level for comparison (higher = more privileges)
export function getRoleLevel(role: string): number {
  const levels: Record<string, number> = {
    SUPER_ADMIN: 4,
    ADMIN: 3,
    SUPPORT: 2,
    ANALYST: 1,
  };
  return levels[role] || 0;
}

// Check if user role is at least the specified level
export function hasMinimumRole(user: AdminUser | null, minimumRole: string): boolean {
  if (!user) return false;
  return getRoleLevel(user.role) >= getRoleLevel(minimumRole);
}
