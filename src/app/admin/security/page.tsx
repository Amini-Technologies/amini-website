"use client";

import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  RefreshCw,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
  useSecurityAlerts,
  useSecurityStats,
  useBlockedIPs,
  useAdminMutation,
} from "@/hooks/useAdminApi";
import { LoadingState } from "@/components/admin/ui/LoadingState";
import { adminApi } from "@/lib/api/admin";

const alertTypeColors: Record<string, string> = {
  high: "bg-red-100 text-red-700 border-red-200",
  HIGH: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-blue-100 text-blue-700 border-blue-200",
  LOW: "bg-blue-100 text-blue-700 border-blue-200",
};

const statusColors: Record<string, string> = {
  unresolved: "bg-red-100 text-red-700",
  UNRESOLVED: "bg-red-100 text-red-700",
  pending: "bg-amber-100 text-amber-700",
  PENDING: "bg-amber-100 text-amber-700",
  investigating: "bg-blue-100 text-blue-700",
  INVESTIGATING: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  RESOLVED: "bg-green-100 text-green-700",
};

interface SecurityStatsData {
  highPriority?: number;
  mediumPriority?: number;
  resolvedToday?: number;
  securityScore?: number;
  highPriorityAlerts?: number;
}

interface SecurityAlert {
  id: string;
  type?: string;
  severity?: string;
  title?: string;
  alertType?: string;
  description?: string;
  message?: string;
  timestamp?: string;
  createdAt?: string;
  status?: string;
}

interface BlockedIP {
  id: string;
  ipAddress: string;
  reason?: string;
  blockedAt?: string;
  createdAt?: string;
}

export default function SecurityPage() {
  const { data: statsData, isLoading: statsLoading, refetch: refetchStats } =
    useSecurityStats();
  const { data: alertsData, isLoading: alertsLoading, refetch: refetchAlerts } =
    useSecurityAlerts();
  const { data: blockedIPsData, isLoading: ipsLoading, refetch: refetchIPs } =
    useBlockedIPs();

  const { mutate: unblockIP, isLoading: unblocking } = useAdminMutation(
    ({ id }: { id: string }) => adminApi.unblockIP(id)
  );

  const { mutate: resolveAlert, isLoading: resolving } = useAdminMutation(
    ({ id, note }: { id: string; note: string }) =>
      adminApi.resolveAlert(id, note)
  );

  const handleRefresh = () => {
    refetchStats();
    refetchAlerts();
    refetchIPs();
  };

  const handleUnblock = async (id: string) => {
    await unblockIP({ id });
    refetchIPs();
  };

  const handleResolve = async (id: string) => {
    await resolveAlert({ id, note: "Resolved by admin" });
    refetchAlerts();
    refetchStats();
  };

  const stats = statsData as SecurityStatsData | null;
  const alerts: SecurityAlert[] = Array.isArray(alertsData)
    ? alertsData
    : (alertsData as { data?: SecurityAlert[] })?.data ?? [];
  const blockedIPs: BlockedIP[] = Array.isArray(blockedIPsData)
    ? blockedIPsData
    : (blockedIPsData as { data?: BlockedIP[] })?.data ?? [];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security</h1>
          <p className="mt-1 text-sm text-gray-600">
            Monitor security alerts and manage platform security
          </p>
        </div>
        <button
          className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4" />
          Run Security Scan
        </button>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-100 p-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              {statsLoading ? (
                <div className="h-8 w-8 animate-pulse bg-gray-200 rounded" />
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.highPriority ?? stats?.highPriorityAlerts ?? 0}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-100 p-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Medium Priority</p>
              {statsLoading ? (
                <div className="h-8 w-8 animate-pulse bg-gray-200 rounded" />
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.mediumPriority ?? 0}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Resolved Today</p>
              {statsLoading ? (
                <div className="h-8 w-8 animate-pulse bg-gray-200 rounded" />
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.resolvedToday ?? 0}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Security Score</p>
              {statsLoading ? (
                <div className="h-8 w-12 animate-pulse bg-gray-200 rounded" />
              ) : (
                <p className="text-2xl font-bold text-green-600">
                  {stats?.securityScore ?? 0}%
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Security Alerts
        </h3>
        {alertsLoading ? (
          <LoadingState message="Loading alerts..." />
        ) : alerts.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">
            No security alerts
          </p>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => {
              const severity = alert.type ?? alert.severity ?? "low";
              const status = alert.status ?? "unresolved";
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border ${
                    alertTypeColors[severity] ?? alertTypeColors.low
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">
                            {alert.title ?? alert.alertType ?? "Alert"}
                          </h4>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                              statusColors[status] ?? statusColors.unresolved
                            }`}
                          >
                            {String(status).toLowerCase()}
                          </span>
                        </div>
                        <p className="text-sm mt-1 opacity-80">
                          {alert.description ?? alert.message}
                        </p>
                        <p className="text-xs mt-2 opacity-60">
                          {formatDate(alert.timestamp ?? alert.createdAt ?? "")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg p-1.5 hover:bg-white/50 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      {String(status).toLowerCase() !== "resolved" && (
                        <button
                          className="rounded-lg p-1.5 hover:bg-white/50 transition-colors disabled:opacity-50"
                          onClick={() => handleResolve(alert.id)}
                          disabled={resolving}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Blocked IPs */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Blocked IP Addresses
        </h3>
        {ipsLoading ? (
          <LoadingState message="Loading blocked IPs..." />
        ) : blockedIPs.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">
            No blocked IP addresses
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blocked At
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {blockedIPs.map((ip) => (
                  <tr key={ip.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">
                      {ip.ipAddress}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {ip.reason ?? "—"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {formatDate(ip.blockedAt ?? ip.createdAt ?? "")}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                        onClick={() => handleUnblock(ip.id)}
                        disabled={unblocking}
                      >
                        Unblock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
