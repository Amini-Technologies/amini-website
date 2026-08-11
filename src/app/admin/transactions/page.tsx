"use client";

import type React from "react";
import { useState, useCallback } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  RefreshCw,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Receipt,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useTransactions, useAdminMutation } from "@/hooks/useAdminApi";
import { adminApi } from "@/lib/api/admin";
import { TableSkeleton } from "@/components/admin/ui/LoadingState";
import { ErrorState } from "@/components/admin/ui/ErrorState";

const statusColors: Record<string, string> = {
  completed: "bg-green-100 text-green-700",
  COMPLETED: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  PENDING: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
  FAILED: "bg-red-100 text-red-700",
  reversed: "bg-gray-100 text-gray-700",
  REVERSED: "bg-gray-100 text-gray-700",
};

const statusIcons: Record<string, React.JSX.Element> = {
  completed: <CheckCircle className="h-4 w-4" />,
  COMPLETED: <CheckCircle className="h-4 w-4" />,
  pending: <Clock className="h-4 w-4" />,
  PENDING: <Clock className="h-4 w-4" />,
  failed: <XCircle className="h-4 w-4" />,
  FAILED: <XCircle className="h-4 w-4" />,
  reversed: <AlertTriangle className="h-4 w-4" />,
  REVERSED: <AlertTriangle className="h-4 w-4" />,
};

const typeIcons: Record<string, React.JSX.Element> = {
  transfer: <ArrowUpRight className="h-4 w-4" />,
  TRANSFER: <ArrowUpRight className="h-4 w-4" />,
  deposit: <ArrowDownLeft className="h-4 w-4" />,
  DEPOSIT: <ArrowDownLeft className="h-4 w-4" />,
  withdrawal: <ArrowUpRight className="h-4 w-4" />,
  WITHDRAWAL: <ArrowUpRight className="h-4 w-4" />,
  bill_payment: <Receipt className="h-4 w-4" />,
  BILL_PAYMENT: <Receipt className="h-4 w-4" />,
};

const typeColors: Record<string, string> = {
  transfer: "bg-blue-100 text-blue-700",
  TRANSFER: "bg-blue-100 text-blue-700",
  deposit: "bg-green-100 text-green-700",
  DEPOSIT: "bg-green-100 text-green-700",
  withdrawal: "bg-accent-surface text-accent-1",
  WITHDRAWAL: "bg-accent-surface text-accent-1",
  bill_payment: "bg-amber-100 text-amber-700",
  BILL_PAYMENT: "bg-amber-100 text-amber-700",
};

interface UserRef {
  id?: string;
  name?: string;
  email?: string;
  aminiTag?: string;
}

interface Transaction {
  id: string;
  reference: string;
  type: string;
  amount: number | string;
  currency?: string;
  status: string;
  senderName?: string;
  receiverName?: string;
  sender?: string | UserRef | null;
  receiver?: string | UserRef | null;
  description?: string;
  createdAt: string;
}

function resolveParty(party: string | UserRef | null | undefined, fallback: string): string {
  if (!party) return fallback;
  if (typeof party === "string") return party || fallback;
  return party.name || party.email || party.aminiTag || fallback;
}

interface TransactionsResponse {
  transactions?: Transaction[];
  data?: Transaction[];
  pagination?: { total: number; page: number; limit: number; totalPages: number };
  meta?: { total: number; page: number; limit: number; totalPages: number };
  total?: number;
}

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [rejectModal, setRejectModal] = useState<string | null>(null);
  const [reverseModal, setReverseModal] = useState<string | null>(null);
  const [modalReason, setModalReason] = useState("");
  const [actionFeedback, setActionFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const limit = 20;

  const params = {
    search: searchQuery || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    type: typeFilter !== "all" ? typeFilter : undefined,
    page,
    limit,
  };

  const { data, isLoading, error, refetch } = useTransactions(params);

  const approveMutation = useAdminMutation((id: string) => adminApi.approveTransaction(id));
  const rejectMutation = useAdminMutation(({ id, reason }: { id: string; reason: string }) =>
    adminApi.rejectTransaction(id, reason)
  );
  const reverseMutation = useAdminMutation(({ id, reason }: { id: string; reason: string }) =>
    adminApi.reverseTransaction(id, reason)
  );

  const txResponse = data as TransactionsResponse | null;
  const transactions: Transaction[] = txResponse?.transactions || txResponse?.data || [];
  const pagination = txResponse?.pagination || txResponse?.meta;
  const total = pagination?.total || txResponse?.total || transactions.length;
  const totalPages = pagination?.totalPages || Math.ceil(total / limit);

  const showFeedback = (message: string, type: "success" | "error") => {
    setActionFeedback({ message, type });
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleApprove = useCallback(async (id: string) => {
    setShowActionMenu(null);
    const result = await approveMutation.mutate(id);
    if (result.success) {
      showFeedback("Transaction approved", "success");
      refetch();
    } else {
      showFeedback(result.error || "Failed to approve", "error");
    }
  }, [approveMutation, refetch]);

  const handleReject = useCallback(async () => {
    if (!rejectModal) return;
    const result = await rejectMutation.mutate({ id: rejectModal, reason: modalReason || "Rejected by admin" });
    setRejectModal(null);
    setModalReason("");
    if (result.success) {
      showFeedback("Transaction rejected", "success");
      refetch();
    } else {
      showFeedback(result.error || "Failed to reject", "error");
    }
  }, [rejectModal, modalReason, rejectMutation, refetch]);

  const handleReverse = useCallback(async () => {
    if (!reverseModal) return;
    const result = await reverseMutation.mutate({ id: reverseModal, reason: modalReason || "Reversed by admin" });
    setReverseModal(null);
    setModalReason("");
    if (result.success) {
      showFeedback("Transaction reversed", "success");
      refetch();
    } else {
      showFeedback(result.error || "Failed to reverse", "error");
    }
  }, [reverseModal, modalReason, reverseMutation, refetch]);

  const isPending = (tx: Transaction) => tx.status?.toUpperCase() === "PENDING";
  const isCompleted = (tx: Transaction) => tx.status?.toUpperCase() === "COMPLETED";

  const stats = {
    total: total,
    completed: transactions.filter((t) => t.status?.toUpperCase() === "COMPLETED").length,
    pending: transactions.filter((t) => t.status?.toUpperCase() === "PENDING").length,
    failed: transactions.filter((t) => t.status?.toUpperCase() === "FAILED").length,
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="mt-1 text-sm text-gray-600">Monitor and manage all platform transactions</p>
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold text-gray-900">{total}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-100 p-2">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-100 p-2">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-xl font-bold text-gray-900">{stats.failed}</p>
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
              placeholder="Search by reference, sender, or receiver..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="input pl-10"
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
                className="input pl-10 pr-8 appearance-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="TRANSFER">Transfer</option>
                <option value="DEPOSIT">Deposit</option>
                <option value="WITHDRAWAL">Withdrawal</option>
                <option value="BILL_PAYMENT">Bill Payment</option>
              </select>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="input pr-8 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
              <option value="REVERSED">Reversed</option>
            </select>
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

      {/* Reject modal */}
      {(rejectModal || reverseModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {rejectModal ? "Reject Transaction" : "Reverse Transaction"}
            </h3>
            <p className="text-sm text-gray-600 mb-4">Provide a reason (optional).</p>
            <textarea
              className="input w-full h-24 resize-none"
              placeholder="Reason..."
              value={modalReason}
              onChange={(e) => setModalReason(e.target.value)}
            />
            <div className="flex gap-3 mt-4 justify-end">
              <button
                onClick={() => { setRejectModal(null); setReverseModal(null); setModalReason(""); }}
                className="btn-secondary text-sm py-2 px-4"
              >
                Cancel
              </button>
              <button
                onClick={rejectModal ? handleReject : handleReverse}
                disabled={rejectMutation.isLoading || reverseMutation.isLoading}
                className="btn-primary text-sm py-2 px-4 bg-red-600 hover:bg-red-700"
              >
                {rejectModal ? "Reject" : "Reverse"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transactions table */}
      <div className="card overflow-hidden p-0">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={8} cols={6} />
          </div>
        ) : error ? (
          <div className="p-6">
            <ErrorState message={error} onRetry={refetch} />
          </div>
        ) : transactions.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <CreditCard className="h-10 w-10 mx-auto mb-3 text-gray-300" />
            <p>No transactions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From / To</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-gray-900">{tx.reference}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${typeColors[tx.type] || "bg-gray-100 text-gray-700"}`}>
                        {typeIcons[tx.type]}
                        {String(tx.type).toLowerCase().replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm text-gray-900">{tx.senderName || resolveParty(tx.sender, "System")}</p>
                        <p className="text-xs text-gray-500">→ {tx.receiverName || resolveParty(tx.receiver, "External")}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-semibold text-gray-900">{formatCurrency(Number(tx.amount))}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[tx.status] || "bg-gray-100 text-gray-700"}`}>
                        {statusIcons[tx.status]}
                        {String(tx.status).toLowerCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-500">{formatDate(tx.createdAt)}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="relative">
                        <button
                          onClick={() => setShowActionMenu(showActionMenu === tx.id ? null : tx.id)}
                          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {showActionMenu === tx.id && (
                          <div className="absolute right-0 z-10 mt-1 w-48 rounded-xl bg-white border border-gray-200">
                            <div className="py-1">
                              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                <Eye className="h-4 w-4" />
                                View Details
                              </button>
                              {isPending(tx) && (
                                <>
                                  <button
                                    onClick={() => handleApprove(tx.id)}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => { setShowActionMenu(null); setRejectModal(tx.id); }}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                  >
                                    <XCircle className="h-4 w-4" />
                                    Reject
                                  </button>
                                </>
                              )}
                              {isCompleted(tx) && (
                                <button
                                  onClick={() => { setShowActionMenu(null); setReverseModal(tx.id); }}
                                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-amber-600 hover:bg-amber-50"
                                >
                                  <RefreshCw className="h-4 w-4" />
                                  Reverse
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !error && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{transactions.length}</span>{" "}
              of <span className="font-medium">{total}</span> transactions
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
