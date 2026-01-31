"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { adminApi, ApiResponse } from "@/lib/api/admin";

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Dashboard data types
interface DashboardStats {
  users: {
    total: number;
    active: number;
    growth: number;
  };
  wallets: {
    total: number;
    active: number;
    suspended: number;
    totalBalance?: number;
  };
  transactions: {
    total: number;
    pending: number;
    todayVolume: number;
    growth: number;
  };
  security?: {
    securityScore: number;
    highPriorityAlerts: number;
    unresolvedAlerts?: number;
  };
  recentTransactions: Array<{
    id: string;
    reference: string;
    type: string;
    amount: number;
    currency: string;
    status: string;
    sender?: string;
    receiver?: string;
    senderName?: string;
    receiverName?: string;
    createdAt: string;
  }>;
}

interface ChartData {
  transactionVolume: Array<{
    date: string;
    volume: number;
  }>;
  userGrowth: Array<{
    date: string;
    users: number;
  }>;
}

/**
 * Generic hook for fetching data from the admin API
 */
export function useAdminApi<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  deps: readonly unknown[] = []
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Store fetcher in a ref to avoid dependency issues
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcherRef.current();
      if (result.error) {
        setError(result.error);
        setData(null);
      } else {
        setData(result.data as T | null);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setData(null);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

/**
 * Hook for dashboard stats
 */
export function useDashboardStats() {
  return useAdminApi<DashboardStats>(() => adminApi.getDashboardStats() as Promise<ApiResponse<DashboardStats>>);
}

/**
 * Hook for chart data
 */
export function useChartData(days: number = 7) {
  return useAdminApi<ChartData>(
    () => adminApi.getChartData(days) as Promise<ApiResponse<ChartData>>,
    [days]
  );
}

/**
 * Hook for users list
 */
export function useUsers(params?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  return useAdminApi(
    () => adminApi.getUsers(params),
    [JSON.stringify(params)]
  );
}

/**
 * Hook for user stats
 */
export function useUserStats() {
  return useAdminApi(() => adminApi.getUserStats());
}

/**
 * Hook for wallets list
 */
export function useWallets(params?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  return useAdminApi(
    () => adminApi.getWallets(params),
    [JSON.stringify(params)]
  );
}

/**
 * Hook for wallet stats
 */
export function useWalletStats() {
  return useAdminApi(() => adminApi.getWalletStats());
}

/**
 * Hook for transactions list
 */
export function useTransactions(params?: {
  search?: string;
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  return useAdminApi(
    () => adminApi.getTransactions(params),
    [JSON.stringify(params)]
  );
}

/**
 * Hook for transaction stats
 */
export function useTransactionStats() {
  return useAdminApi(() => adminApi.getTransactionStats());
}

/**
 * Hook for security alerts
 */
export function useSecurityAlerts(params?: {
  severity?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  return useAdminApi(
    () => adminApi.getSecurityAlerts(params),
    [JSON.stringify(params)]
  );
}

/**
 * Hook for security stats
 */
export function useSecurityStats() {
  return useAdminApi(() => adminApi.getSecurityStats());
}

/**
 * Hook for blocked IPs
 */
export function useBlockedIPs(params?: { page?: number; limit?: number }) {
  return useAdminApi(
    () => adminApi.getBlockedIPs(params),
    [JSON.stringify(params)]
  );
}

/**
 * Hook for audit logs
 */
export function useAuditLogs(params?: {
  adminId?: string;
  action?: string;
  page?: number;
  limit?: number;
}) {
  return useAdminApi(
    () => adminApi.getAuditLogs(params),
    [JSON.stringify(params)]
  );
}

/**
 * Hook for notifications
 */
export function useNotifications(params?: {
  unreadOnly?: boolean;
  page?: number;
  limit?: number;
}) {
  return useAdminApi(
    () => adminApi.getNotifications(params),
    [JSON.stringify(params)]
  );
}

/**
 * Hook for mutation operations (POST, PATCH, DELETE)
 */
export function useAdminMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>
) {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (variables: TVariables): Promise<{ success: boolean; data?: TData; error?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await mutationFn(variables);
        if (result.error) {
          setError(result.error);
          return { success: false, error: result.error };
        }
        setData(result.data || null);
        return { success: true, data: result.data };
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { mutate, data, isLoading, error, reset };
}
