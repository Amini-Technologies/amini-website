"use client";

import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  RefreshCw,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

const securityAlerts = [
  {
    id: 1,
    type: "high",
    title: "Multiple failed login attempts",
    description: "User emeka@example.com had 5 failed login attempts",
    timestamp: "2024-11-29T10:30:00Z",
    status: "unresolved",
  },
  {
    id: 2,
    type: "medium",
    title: "Large transaction flagged",
    description: "Transaction of NGN 500,000 requires manual review",
    timestamp: "2024-11-29T09:15:00Z",
    status: "pending",
  },
  {
    id: 3,
    type: "low",
    title: "New device login",
    description: "User seun@example.com logged in from a new device",
    timestamp: "2024-11-28T16:20:00Z",
    status: "resolved",
  },
  {
    id: 4,
    type: "high",
    title: "Suspicious activity detected",
    description: "Multiple rapid transfers from wallet w3",
    timestamp: "2024-11-28T14:00:00Z",
    status: "investigating",
  },
];

const alertTypeColors = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-blue-100 text-blue-700 border-blue-200",
};

const statusColors = {
  unresolved: "bg-red-100 text-red-700",
  pending: "bg-amber-100 text-amber-700",
  investigating: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
};

export default function SecurityPage() {
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
        <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
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
              <p className="text-2xl font-bold text-gray-900">2</p>
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
              <p className="text-2xl font-bold text-gray-900">1</p>
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
              <p className="text-2xl font-bold text-gray-900">5</p>
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
              <p className="text-2xl font-bold text-green-600">94%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Security Alerts
        </h3>
        <div className="space-y-4">
          {securityAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border ${alertTypeColors[alert.type as keyof typeof alertTypeColors]}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{alert.title}</h4>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                          statusColors[alert.status as keyof typeof statusColors]
                        }`}
                      >
                        {alert.status}
                      </span>
                    </div>
                    <p className="text-sm mt-1 opacity-80">{alert.description}</p>
                    <p className="text-xs mt-2 opacity-60">
                      {formatDate(alert.timestamp)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg p-1.5 hover:bg-white/50 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  {alert.status !== "resolved" && (
                    <button className="rounded-lg p-1.5 hover:bg-white/50 transition-colors">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blocked IPs */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Blocked IP Addresses
        </h3>
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
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-mono text-sm">192.168.1.100</td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  Multiple failed login attempts
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  Nov 28, 2024
                </td>
                <td className="py-3 px-4">
                  <button className="text-sm font-medium text-red-600 hover:text-red-700">
                    Unblock
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-mono text-sm">10.0.0.55</td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  Suspicious activity
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  Nov 25, 2024
                </td>
                <td className="py-3 px-4">
                  <button className="text-sm font-medium text-red-600 hover:text-red-700">
                    Unblock
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
