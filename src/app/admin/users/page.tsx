"use client";

import type React from "react";
import { useState, useCallback } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Eye,
  Ban,
  Shield,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useUsers, useAdminMutation } from "@/hooks/useAdminApi";
import { adminApi } from "@/lib/api/admin";
import { TableSkeleton } from "@/components/admin/ui/LoadingState";
import { ErrorState } from "@/components/admin/ui/ErrorState";

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  active: "bg-green-100 text-green-700",
  SUSPENDED: "bg-red-100 text-red-700",
  suspended: "bg-red-100 text-red-700",
  PENDING: "bg-amber-100 text-amber-700",
  pending: "bg-amber-100 text-amber-700",
};

const statusIcons: Record<string, React.JSX.Element> = {
  ACTIVE: <CheckCircle className="h-4 w-4" />,
  active: <CheckCircle className="h-4 w-4" />,
  SUSPENDED: <XCircle className="h-4 w-4" />,
  suspended: <XCircle className="h-4 w-4" />,
  PENDING: <Clock className="h-4 w-4" />,
  pending: <Clock className="h-4 w-4" />,
};

const kycColors: Record<string, string> = {
  VERIFIED: "bg-green-100 text-green-700",
  verified: "bg-green-100 text-green-700",
  PENDING: "bg-amber-100 text-amber-700",
  pending: "bg-amber-100 text-amber-700",
  REJECTED: "bg-red-100 text-red-700",
  rejected: "bg-red-100 text-red-700",
};

interface User {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  phoneNumber?: string;
  username?: string;
  aminiTag?: string;
  status: string;
  kycStatus?: string;
  kycVerified?: boolean;
  createdAt: string;
}

interface UsersResponse {
  users?: User[];
  data?: User[];
  pagination?: { total: number; page: number; limit: number; totalPages: number };
  meta?: { total: number; page: number; limit: number; totalPages: number };
  total?: number;
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [suspendReason, setSuspendReason] = useState("");
  const [showSuspendModal, setShowSuspendModal] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<{ id: string; message: string; type: "success" | "error" } | null>(null);

  const limit = 20;

  const params = {
    search: searchQuery || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    page,
    limit,
  };

  const { data, isLoading, error, refetch } = useUsers(params);

  const suspendMutation = useAdminMutation(
    ({ userId, reason }: { userId: string; reason: string }) =>
      adminApi.suspendUser(userId, reason)
  );

  const activateMutation = useAdminMutation(({ userId }: { userId: string }) =>
    adminApi.activateUser(userId)
  );

  const usersResponse = data as UsersResponse | null;
  const users: User[] = usersResponse?.users || usersResponse?.data || [];
  const pagination = usersResponse?.pagination || usersResponse?.meta;
  const total = pagination?.total || usersResponse?.total || users.length;
  const totalPages = pagination?.totalPages || Math.ceil(total / limit);

  const getUserName = (user: User) =>
    user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email;

  const getKycStatus = (user: User) => {
    if (user.kycStatus) return user.kycStatus;
    return user.kycVerified ? "VERIFIED" : "PENDING";
  };

  const handleSuspend = useCallback(async () => {
    if (!showSuspendModal) return;
    const result = await suspendMutation.mutate({ userId: showSuspendModal, reason: suspendReason || "Suspended by admin" });
    setShowSuspendModal(null);
    setSuspendReason("");
    if (result.success) {
      setActionFeedback({ id: showSuspendModal, message: "User suspended", type: "success" });
      refetch();
    } else {
      setActionFeedback({ id: showSuspendModal, message: result.error || "Failed", type: "error" });
    }
    setTimeout(() => setActionFeedback(null), 3000);
  }, [showSuspendModal, suspendReason, suspendMutation, refetch]);

  const handleActivate = useCallback(async (userId: string) => {
    setShowActionMenu(null);
    const result = await activateMutation.mutate({ userId });
    if (result.success) {
      setActionFeedback({ id: userId, message: "User activated", type: "success" });
      refetch();
    } else {
      setActionFeedback({ id: userId, message: result.error || "Failed", type: "error" });
    }
    setTimeout(() => setActionFeedback(null), 3000);
  }, [activateMutation, refetch]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage all registered users on the platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => refetch()} className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="input pl-10"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="input pl-10 pr-8 appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="SUSPENDED">Suspended</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Action feedback toast */}
      {actionFeedback && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg border border-gray-200 text-sm font-medium ${
          actionFeedback.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          {actionFeedback.message}
        </div>
      )}

      {/* Suspend modal */}
      {showSuspendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Suspend User</h3>
            <p className="text-sm text-gray-600 mb-4">Provide a reason for suspending this user (optional).</p>
            <textarea
              className="input w-full h-24 resize-none"
              placeholder="Reason for suspension..."
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
            />
            <div className="flex gap-3 mt-4 justify-end">
              <button
                onClick={() => { setShowSuspendModal(null); setSuspendReason(""); }}
                className="btn-secondary text-sm py-2 px-4"
              >
                Cancel
              </button>
              <button
                onClick={handleSuspend}
                disabled={suspendMutation.isLoading}
                className="btn-primary text-sm py-2 px-4 bg-red-600 hover:bg-red-700"
              >
                {suspendMutation.isLoading ? "Suspending..." : "Suspend User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users table */}
      <div className="card overflow-hidden p-0">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={8} cols={6} />
          </div>
        ) : error ? (
          <div className="p-6">
            <ErrorState message={error} onRetry={refetch} />
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <Shield className="h-10 w-10 mx-auto mb-3 text-gray-300" />
            <p>No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KYC</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => {
                  const name = getUserName(user);
                  const kycStatus = getKycStatus(user);
                  const isActive = user.status?.toUpperCase() === "ACTIVE";
                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center shrink-0">
                            <span className="text-sm font-medium text-white">{name.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{name}</p>
                            {user.username && <p className="text-sm text-gray-500">@{user.username}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-4 w-4 text-gray-400" />
                            {user.email}
                          </div>
                          {(user.phone || user.phoneNumber) && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="h-4 w-4 text-gray-400" />
                              {user.phone || user.phoneNumber}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm text-gray-900">{user.aminiTag || "—"}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[user.status] || "bg-gray-100 text-gray-700"}`}>
                          {statusIcons[user.status]}
                          {user.status?.toLowerCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${kycColors[kycStatus] || "bg-gray-100 text-gray-700"}`}>
                          {kycStatus?.toLowerCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-500">{formatDate(user.createdAt)}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="relative">
                          <button
                            onClick={() => setShowActionMenu(showActionMenu === user.id ? null : user.id)}
                            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {showActionMenu === user.id && (
                            <div className="absolute right-0 z-10 mt-1 w-48 rounded-xl bg-white border border-gray-200">
                              <div className="py-1">
                                <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </button>
                                <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                  <Shield className="h-4 w-4" />
                                  Verify KYC
                                </button>
                                {isActive ? (
                                  <button
                                    onClick={() => { setShowActionMenu(null); setShowSuspendModal(user.id); }}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-amber-600 hover:bg-amber-50"
                                  >
                                    <Ban className="h-4 w-4" />
                                    Suspend User
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleActivate(user.id)}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                    Activate User
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !error && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{users.length}</span>{" "}
              of <span className="font-medium">{total}</span> users
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-lg border border-gray-200 p-1.5 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-600">Page {page} of {totalPages || 1}</span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= (totalPages || 1)}
                className="rounded-lg border border-gray-200 p-1.5 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
