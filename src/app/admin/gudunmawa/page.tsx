"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  HandHeart,
  X,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useGudunmawas, useSavingsStats, useAdminApi } from "@/hooks/useAdminApi";
import { adminApi } from "@/lib/api/admin";
import { TableSkeleton } from "@/components/admin/ui/LoadingState";
import { ErrorState } from "@/components/admin/ui/ErrorState";

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-700",
  WITHDRAWN: "bg-purple-100 text-purple-700",
};

function formatAmount(amount: number | string | null | undefined) {
  const num = Number(amount || 0);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(num);
}

interface GudunmawaUser {
  id: string;
  name?: string;
  email: string;
  aminiTag?: string;
}

interface GudunmawaContribution {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  contributor: GudunmawaUser;
}

interface GudunmawaItem {
  id: string;
  title: string;
  purpose: string;
  targetAmount: number;
  currentAmount: number;
  contributionStyle: string;
  status: string;
  createdAt: string;
  user: GudunmawaUser;
  _count?: { contributions: number };
  contributions?: GudunmawaContribution[];
}

interface PaginatedResponse {
  data: GudunmawaItem[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
}

interface StatsResponse {
  gudunmawa: { total: number; totalRaised: number };
}

export default function GudunmawaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const limit = 20;

  const params = {
    search: searchQuery || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    page,
    limit,
  };

  const { data: statsData } = useSavingsStats();
  const stats = statsData as StatsResponse | null;

  const { data, isLoading, error, refetch } = useGudunmawas(params);
  const response = data as PaginatedResponse | null;
  const items = response?.data || [];
  const pagination = response?.pagination;
  const totalPages = pagination?.totalPages || 1;

  const { data: detailData, isLoading: detailLoading } = useAdminApi(
    () => selectedId ? adminApi.getGudunmawaById(selectedId) : Promise.resolve({ data: null }),
    [selectedId]
  );
  const detail = detailData as GudunmawaItem | null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gudunmawa</h1>
          <p className="mt-1 text-sm text-gray-600">
            Community fundraisers created by users
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="btn-secondary text-sm py-2 px-4 flex items-center gap-2 self-start"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card">
          <p className="text-sm text-gray-500">Total Campaigns</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {stats?.gudunmawa?.total ?? "—"}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Total Raised</p>
          <p className="text-2xl font-bold text-green-700 mt-1">
            {stats ? formatAmount(stats.gudunmawa.totalRaised) : "—"}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Showing</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {pagination?.total ?? items.length}
          </p>
          <p className="text-xs text-gray-400">matching filters</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, purpose, or creator..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="input pl-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="input pl-10 pr-8 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="WITHDRAWN">Withdrawn</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden p-0">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={8} cols={6} />
          </div>
        ) : error ? (
          <div className="p-6">
            <ErrorState message={error} onRetry={refetch} />
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <HandHeart className="h-10 w-10 mx-auto mb-3 text-gray-300" />
            <p>No Gudunmawa campaigns found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creator</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Raised / Target</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Style</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contributors</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => {
                  const pct =
                    Number(item.targetAmount) > 0
                      ? Math.min(
                          100,
                          Math.round(
                            (Number(item.currentAmount) / Number(item.targetAmount)) * 100
                          )
                        )
                      : 0;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {item.user?.name || item.user?.email}
                          </p>
                          {item.user?.aminiTag && (
                            <p className="text-xs text-gray-500 font-mono">
                              {item.user.aminiTag}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[180px]">
                          {item.purpose}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm font-semibold text-green-700">
                          {formatAmount(item.currentAmount)}
                        </p>
                        <p className="text-xs text-gray-500">
                          of {formatAmount(item.targetAmount)} ({pct}%)
                        </p>
                        <div className="mt-1 h-1.5 w-24 rounded-full bg-gray-200">
                          <div
                            className="h-1.5 rounded-full bg-green-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">
                          {item.contributionStyle?.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {item._count?.contributions ?? "—"}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                            statusColors[item.status] || "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {item.status?.toLowerCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-500">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => setSelectedId(item.id)}
                          className="text-xs text-primary-600 hover:text-primary-800 font-medium"
                        >
                          View
                        </button>
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
              Showing <span className="font-medium">{items.length}</span> of{" "}
              <span className="font-medium">{pagination?.total || items.length}</span> campaigns
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-lg border border-gray-200 p-1.5 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages}
                className="rounded-lg border border-gray-200 p-1.5 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {detailLoading ? "Loading..." : detail?.title}
              </h2>
              <button
                onClick={() => setSelectedId(null)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {detailLoading ? (
              <div className="p-6">
                <TableSkeleton rows={4} cols={2} />
              </div>
            ) : detail ? (
              <div className="p-6 space-y-6">
                {/* Campaign info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Creator</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {detail.user?.name || detail.user?.email}
                    </p>
                    {detail.user?.aminiTag && (
                      <p className="text-xs text-gray-500">{detail.user.aminiTag}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                    <span
                      className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        statusColors[detail.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {detail.status?.toLowerCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Target</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {formatAmount(detail.targetAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Raised</p>
                    <p className="mt-1 text-sm font-semibold text-green-700">
                      {formatAmount(detail.currentAmount)}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Purpose</p>
                    <p className="mt-1 text-sm text-gray-700">{detail.purpose}</p>
                  </div>
                </div>

                {/* Contributions */}
                {detail.contributions && detail.contributions.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      Contributions ({detail.contributions.length})
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {detail.contributions.map((c) => (
                        <div
                          key={c.id}
                          className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {c.contributor?.name || c.contributor?.email}
                            </p>
                            <p className="text-xs text-gray-500">{formatDate(c.createdAt)}</p>
                          </div>
                          <p className="text-sm font-semibold text-green-700">
                            {formatAmount(c.amount)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
