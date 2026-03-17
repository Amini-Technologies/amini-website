"use client";

import { useState, useCallback } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Wallet,
  Eye,
  Ban,
  RefreshCw,
  Download,
  TrendingUp,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useWallets, useWalletStats, useAdminMutation } from "@/hooks/useAdminApi";
import { adminApi } from "@/lib/api/admin";
import { TableSkeleton } from "@/components/admin/ui/LoadingState";
import { ErrorState } from "@/components/admin/ui/ErrorState";

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  active: "bg-green-100 text-green-700",
  SUSPENDED: "bg-red-100 text-red-700",
  suspended: "bg-red-100 text-red-700",
  CLOSED: "bg-gray-100 text-gray-700",
  closed: "bg-gray-100 text-gray-700",
};

interface WalletItem {
  id: string;
  userId?: string;
  userName?: string;
  user?: { name?: string; firstName?: string; lastName?: string; email?: string };
  balance: number | string;
  currency?: string;
  status: string;
  virtualAccountNumber?: string;
  accountNumber?: string;
  virtualAccountBank?: string;
  bankName?: string;
  createdAt: string;
}

interface WalletsResponse {
  wallets?: WalletItem[];
  data?: WalletItem[];
  pagination?: { total: number; page: number; limit: number; totalPages: number };
  meta?: { total: number; page: number; limit: number; totalPages: number };
  total?: number;
}

interface WalletStats {
  total?: number;
  active?: number;
  suspended?: number;
  totalBalance?: number | string;
}

export default function WalletsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [suspendModal, setSuspendModal] = useState<string | null>(null);
  const [suspendReason, setSuspendReason] = useState("");
  const [actionFeedback, setActionFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const limit = 20;

  const params = {
    search: searchQuery || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    page,
    limit,
  };

  const { data, isLoading, error, refetch } = useWallets(params);
  const { data: statsData } = useWalletStats();

  const suspendMutation = useAdminMutation(
    ({ walletId, reason }: { walletId: string; reason: string }) =>
      adminApi.suspendWallet(walletId, reason)
  );
  const activateMutation = useAdminMutation(({ walletId }: { walletId: string }) =>
    adminApi.activateWallet(walletId)
  );

  const walletsResponse = data as WalletsResponse | null;
  const wallets: WalletItem[] = walletsResponse?.wallets || walletsResponse?.data || [];
  const pagination = walletsResponse?.pagination || walletsResponse?.meta;
  const total = pagination?.total || walletsResponse?.total || wallets.length;
  const totalPages = pagination?.totalPages || Math.ceil(total / limit);
  const stats = statsData as WalletStats | null;

  const getWalletOwner = (w: WalletItem) =>
    w.userName ||
    w.user?.name ||
    (w.user ? `${w.user.firstName || ""} ${w.user.lastName || ""}`.trim() : "") ||
    w.user?.email ||
    "Unknown";

  const getAccountNumber = (w: WalletItem) => w.virtualAccountNumber || w.accountNumber || "—";
  const getBankName = (w: WalletItem) => w.virtualAccountBank || w.bankName || "";

  const showFeedback = (message: string, type: "success" | "error") => {
    setActionFeedback({ message, type });
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleSuspend = useCallback(async () => {
    if (!suspendModal) return;
    const result = await suspendMutation.mutate({ walletId: suspendModal, reason: suspendReason || "Suspended by admin" });
    setSuspendModal(null);
    setSuspendReason("");
    if (result.success) {
      showFeedback("Wallet suspended", "success");
      refetch();
    } else {
      showFeedback(result.error || "Failed to suspend", "error");
    }
  }, [suspendModal, suspendReason, suspendMutation, refetch]);

  const handleActivate = useCallback(async (walletId: string) => {
    setShowActionMenu(null);
    const result = await activateMutation.mutate({ walletId });
    if (result.success) {
      showFeedback("Wallet activated", "success");
      refetch();
    } else {
      showFeedback(result.error || "Failed to activate", "error");
    }
  }, [activateMutation, refetch]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wallets</h1>
          <p className="mt-1 text-sm text-gray-600">Manage all user wallets and virtual accounts</p>
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

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <Wallet className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Wallets</p>
              <p className="text-lg font-bold text-gray-900">{stats?.total || total}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Balance</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(Number(stats?.totalBalance || 0))}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2">
              <Wallet className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-lg font-bold text-gray-900">{stats?.active || "—"}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-100 p-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Suspended</p>
              <p className="text-lg font-bold text-gray-900">{stats?.suspended || "—"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by user name or account number..."
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
                <option value="CLOSED">Closed</option>
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
      {suspendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Suspend Wallet</h3>
            <p className="text-sm text-gray-600 mb-4">Provide a reason for suspending this wallet (optional).</p>
            <textarea
              className="input w-full h-24 resize-none"
              placeholder="Reason for suspension..."
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
            />
            <div className="flex gap-3 mt-4 justify-end">
              <button
                onClick={() => { setSuspendModal(null); setSuspendReason(""); }}
                className="btn-secondary text-sm py-2 px-4"
              >
                Cancel
              </button>
              <button
                onClick={handleSuspend}
                disabled={suspendMutation.isLoading}
                className="btn-primary text-sm py-2 px-4 bg-red-600 hover:bg-red-700"
              >
                {suspendMutation.isLoading ? "Suspending..." : "Suspend Wallet"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wallets table */}
      <div className="card overflow-hidden p-0">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={8} cols={6} />
          </div>
        ) : error ? (
          <div className="p-6">
            <ErrorState message={error} onRetry={refetch} />
          </div>
        ) : wallets.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <Wallet className="h-10 w-10 mx-auto mb-3 text-gray-300" />
            <p>No wallets found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Virtual Account</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {wallets.map((wallet) => {
                  const ownerName = getWalletOwner(wallet);
                  const isActive = wallet.status?.toUpperCase() === "ACTIVE";
                  return (
                    <tr key={wallet.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center shrink-0">
                            <span className="text-sm font-medium text-white">{ownerName.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{ownerName}</p>
                            <p className="text-xs text-gray-500">ID: {wallet.id.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-mono text-sm text-gray-900">{getAccountNumber(wallet)}</p>
                          {getBankName(wallet) && <p className="text-xs text-gray-500">{getBankName(wallet)}</p>}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-semibold text-gray-900">{formatCurrency(Number(wallet.balance))}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">{wallet.currency || "NGN"}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[wallet.status] || "bg-gray-100 text-gray-700"}`}>
                          {wallet.status?.toLowerCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-500">{formatDate(wallet.createdAt)}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="relative">
                          <button
                            onClick={() => setShowActionMenu(showActionMenu === wallet.id ? null : wallet.id)}
                            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {showActionMenu === wallet.id && (
                            <div className="absolute right-0 z-10 mt-1 w-48 rounded-xl bg-white border border-gray-200">
                              <div className="py-1">
                                <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                  <Eye className="h-4 w-4" />
                                  View Transactions
                                </button>
                                {isActive ? (
                                  <button
                                    onClick={() => { setShowActionMenu(null); setSuspendModal(wallet.id); }}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-amber-600 hover:bg-amber-50"
                                  >
                                    <Ban className="h-4 w-4" />
                                    Suspend Wallet
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleActivate(wallet.id)}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                    Activate Wallet
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
              Showing <span className="font-medium">{wallets.length}</span>{" "}
              of <span className="font-medium">{total}</span> wallets
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
