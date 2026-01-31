// Admin API Service
// Connects the admin dashboard to the backend API

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

class AdminApiService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    // Load tokens from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('admin_access_token');
      this.refreshToken = localStorage.getItem('admin_refresh_token');
    }
  }

  /**
   * Set authentication tokens
   */
  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_access_token', accessToken);
      localStorage.setItem('admin_refresh_token', refreshToken);
    }
  }

  /**
   * Clear authentication tokens
   */
  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_access_token');
      localStorage.removeItem('admin_refresh_token');
      localStorage.removeItem('admin_user');
    }
  }

  /**
   * Make authenticated API request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle token refresh on 401
      if (response.status === 401 && this.refreshToken) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          // Retry the request with new token
          headers['Authorization'] = `Bearer ${this.accessToken}`;
          const retryResponse = await fetch(url, { ...options, headers });
          return retryResponse.json();
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          error: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const data = await response.json();
      return { data };
    } catch (error: unknown) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  /**
   * Refresh access token
   */
  private async refreshAccessToken(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        this.setTokens(data.accessToken, data.refreshToken);
        return true;
      }
    } catch {
      // Refresh failed
    }

    this.clearTokens();
    return false;
  }

  // ============================================
  // Authentication
  // ============================================

  async login(email: string, password: string) {
    const result = await this.request<{
      accessToken: string;
      refreshToken: string;
      expiresIn: string;
      user: {
        id: string;
        email: string;
        name: string;
        role: string;
        twoFactorEnabled: boolean;
      };
    }>('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (result.data) {
      this.setTokens(result.data.accessToken, result.data.refreshToken);
      localStorage.setItem('admin_user', JSON.stringify(result.data.user));
    }

    return result;
  }

  async logout() {
    const result = await this.request('/admin/auth/logout', {
      method: 'POST',
    });
    this.clearTokens();
    return result;
  }

  async getProfile() {
    return this.request('/admin/auth/profile');
  }

  async getSessions() {
    return this.request('/admin/auth/sessions');
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/admin/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async createAdmin(data: { email: string; password: string; name: string; role: string }) {
    return this.request('/admin/auth/create-admin', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ============================================
  // Dashboard
  // ============================================

  async getDashboardStats() {
    return this.request('/admin/dashboard');
  }

  async getChartData(days: number = 7) {
    return this.request(`/admin/dashboard/charts?days=${days}`);
  }

  async getQuickActions() {
    return this.request('/admin/dashboard/quick-actions');
  }

  async getSystemHealth() {
    return this.request('/admin/dashboard/health');
  }

  async generateReport(startDate?: string, endDate?: string, type?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (type) params.append('type', type);
    return this.request(`/admin/dashboard/report?${params.toString()}`);
  }

  // ============================================
  // Users
  // ============================================

  async getUsers(params?: {
    search?: string;
    status?: string;
    kycStatus?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    return this.request(`/admin/users?${searchParams.toString()}`);
  }

  async getUserById(userId: string) {
    return this.request(`/admin/users/${userId}`);
  }

  async getUserStats() {
    return this.request('/admin/users/stats');
  }

  async getUserGrowth(days: number = 30) {
    return this.request(`/admin/users/growth?days=${days}`);
  }

  async updateUser(userId: string, data: { name?: string; email?: string }) {
    return this.request(`/admin/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async suspendUser(userId: string, reason: string) {
    return this.request(`/admin/users/${userId}/suspend`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async activateUser(userId: string) {
    return this.request(`/admin/users/${userId}/activate`, {
      method: 'POST',
    });
  }

  // ============================================
  // Wallets
  // ============================================

  async getWallets(params?: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    return this.request(`/admin/wallets?${searchParams.toString()}`);
  }

  async getWalletById(walletId: string) {
    return this.request(`/admin/wallets/${walletId}`);
  }

  async getWalletStats() {
    return this.request('/admin/wallets/stats');
  }

  async getTopWallets(limit: number = 10) {
    return this.request(`/admin/wallets/top?limit=${limit}`);
  }

  async getWalletTransactions(walletId: string, params?: { page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    return this.request(`/admin/wallets/${walletId}/transactions?${searchParams.toString()}`);
  }

  async suspendWallet(walletId: string, reason: string) {
    return this.request(`/admin/wallets/${walletId}/suspend`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async activateWallet(walletId: string) {
    return this.request(`/admin/wallets/${walletId}/activate`, {
      method: 'POST',
    });
  }

  // ============================================
  // Transactions
  // ============================================

  async getTransactions(params?: {
    search?: string;
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    return this.request(`/admin/transactions?${searchParams.toString()}`);
  }

  async getTransactionById(transactionId: string) {
    return this.request(`/admin/transactions/${transactionId}`);
  }

  async getTransactionStats() {
    return this.request('/admin/transactions/stats');
  }

  async getTransactionVolume(days: number = 7) {
    return this.request(`/admin/transactions/volume?days=${days}`);
  }

  async getFlaggedTransactions(params?: { page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    return this.request(`/admin/transactions/flagged?${searchParams.toString()}`);
  }

  async approveTransaction(transactionId: string) {
    return this.request(`/admin/transactions/${transactionId}/approve`, {
      method: 'POST',
    });
  }

  async rejectTransaction(transactionId: string, reason: string) {
    return this.request(`/admin/transactions/${transactionId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async reverseTransaction(transactionId: string, reason: string) {
    return this.request(`/admin/transactions/${transactionId}/reverse`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // ============================================
  // Security
  // ============================================

  async getSecurityStats() {
    return this.request('/admin/security/stats');
  }

  async getSecurityAlerts(params?: {
    severity?: string;
    status?: string;
    alertType?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    return this.request(`/admin/security/alerts?${searchParams.toString()}`);
  }

  async getAlertById(alertId: string) {
    return this.request(`/admin/security/alerts/${alertId}`);
  }

  async resolveAlert(alertId: string, resolutionNote: string) {
    return this.request(`/admin/security/alerts/${alertId}/resolve`, {
      method: 'POST',
      body: JSON.stringify({ resolutionNote }),
    });
  }

  async updateAlertStatus(alertId: string, status: string) {
    return this.request(`/admin/security/alerts/${alertId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async getBlockedIPs(params?: { page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    return this.request(`/admin/security/blocked-ips?${searchParams.toString()}`);
  }

  async blockIP(ipAddress: string, reason: string, expiresAt?: string) {
    return this.request('/admin/security/blocked-ips', {
      method: 'POST',
      body: JSON.stringify({ ipAddress, reason, expiresAt }),
    });
  }

  async unblockIP(blockedIPId: string) {
    return this.request(`/admin/security/blocked-ips/${blockedIPId}`, {
      method: 'DELETE',
    });
  }

  async getFraudRules() {
    return this.request('/admin/security/fraud-rules');
  }

  async createFraudRule(data: Record<string, unknown>) {
    return this.request('/admin/security/fraud-rules', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateFraudRule(ruleId: string, data: Record<string, unknown>) {
    return this.request(`/admin/security/fraud-rules/${ruleId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getFraudFlags(params?: { riskLevel?: string; reviewed?: boolean; page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    return this.request(`/admin/security/fraud-flags?${searchParams.toString()}`);
  }

  async reviewFraudFlag(flagId: string, actionTaken: string, reviewNote: string) {
    return this.request(`/admin/security/fraud-flags/${flagId}/review`, {
      method: 'POST',
      body: JSON.stringify({ actionTaken, reviewNote }),
    });
  }

  async getAuditLogs(params?: {
    adminId?: string;
    action?: string;
    resourceType?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    return this.request(`/admin/security/audit-logs?${searchParams.toString()}`);
  }

  async getLoginAttempts(hours: number = 24) {
    return this.request(`/admin/security/login-attempts?hours=${hours}`);
  }

  // ============================================
  // Notifications
  // ============================================

  async getNotifications(params?: { unreadOnly?: boolean; page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    return this.request(`/admin/dashboard/notifications?${searchParams.toString()}`);
  }

  async markNotificationRead(notificationId: string) {
    return this.request(`/admin/dashboard/notifications/${notificationId}/read`);
  }

  async markAllNotificationsRead() {
    return this.request('/admin/dashboard/notifications/read-all');
  }
}

// Export singleton instance
export const adminApi = new AdminApiService();

// Export types
export type { ApiResponse };
