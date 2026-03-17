"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Lock,
  Target,
  Users,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
  useSavingsStats,
  useAutoSavings,
  useTargetSavings,
  useLockedSavings,
  useGroupSavings,
} from "@/hooks/useAdminApi";
import { TableSkeleton } from "@/components/admin/ui/LoadingState";
import { ErrorState } from "@/components/admin/ui/ErrorState";

type TabKey = "auto" | "target" | "locked" | "group";

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  PAUSED: "bg-amber-100 text-amber-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-700",
  PENDING: "bg-gray-100 text-gray-700",
};

function formatAmount(amount: number | string | null | undefined) {
  const num = Number(amount || 0);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(num);
}

interface StatsResponse {
  autoSavings: { total: number; totalAmount: number };
  lockedSavings: { total: number; totalAmount: number };
  targetSavings: { total: number; totalAmount: number };
  groupSavings: { total: number; totalPoolAmount: number };
  gudunmawa: { total: number; totalRaised: number };
}

interface SavingsUser {
  id: string;
  name?: string;
  email: string;
  aminiTag?: string;
}

interface AutoSavingsItem {
  id: string;
  savingsName?: string;
  savingsType: string;
  amount: number;
  currentAmount: number;
  targetAmount?: number;
  status: string;
  createdAt: string;
  user: SavingsUser;
}

interface TargetSavingsItem {
  id: string;
  goalName: string;
  goalIcon: string;
  currentAmount: number;
  targetAmount: number;
  deadline?: string;
  status: string;
  createdAt: string;
  user: SavingsUser;
}

interface LockedSavingsItem {
  id: string;
  savingsName?: string;
  amount: number;
  lockType: string;
  lockPeriod?: number;
  unlockDate: string;
  interestRate: number;
  interestEarned: number;
  status: string;
  createdAt: string;
  user: SavingsUser;
}

interface GroupSavingsItem {
  id: string;
  name: string;
  contributionAmount: number;
  totalPoolAmount: number;
  paymentFrequency: string;
  memberCount: number;
  currentRound: number;
  totalRounds: number;
  status: string;
  createdAt: string;
  organizer: SavingsUser;
  _count?: { members: number };
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
}

export default function SavingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("auto");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data: statsData } = useSavingsStats();
  const stats = statsData as StatsResponse | null;

  const params = {
    search: searchQuery || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    page,
    limit,
  };

  const autoResult = useAutoSavings(activeTab === "auto" ? params : undefined);
  const targetResult = useTargetSavings(activeTab === "target" ? params : undefined);
  const lockedResult = useLockedSavings(activeTab === "locked" ? params : undefined);
  const groupResult = useGroupSavings(activeTab === "group" ? params : undefined);

  const activeResult = {
    auto: autoResult,
    target: targetResult,
    locked: lockedResult,
    group: groupResult,
  }[activeTab];

  const response = activeResult.data as PaginatedResponse<unknown> | null;
  const items = response?.data || [];
  const pagination = response?.pagination;
  const totalPages = pagination?.totalPages || 1;

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setPage(1);
    setSearchQuery("");
    setStatusFilter("all");
  };

  const tabs: { key: TabKey; label: string; icon: React.ElementType; stat: string }[] = [
    {
      key: "auto",
      label: "Auto Savings",
      icon: TrendingUp,
      stat: stats
        ? `${stats.autoSavings.total} · ${formatAmount(stats.autoSavings.totalAmount)}`
        : "—",
    },
    {
      key: "target",
      label: "Target Savings",
      icon: Target,
      stat: stats
        ? `${stats.targetSavings.total} · ${formatAmount(stats.targetSavings.totalAmount)}`
        : "—",
    },
    {
      key: "locked",
      label: "Locked Savings",
      icon: Lock,
      stat: stats
        ? `${stats.lockedSavings.total} · ${formatAmount(stats.lockedSavings.totalAmount)}`
        : "—",
    },
    {
      key: "group",
      label: "Group Savings",
      icon: Users,
      stat: stats
        ? `${stats.groupSavings.total} · ${formatAmount(stats.groupSavings.totalPoolAmount)}`
        : "—",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Adashi & Savings</h1>
          <p className="mt-1 text-sm text-gray-600">
            View all savings plans across the platform
          </p>
        </div>
        <button
          onClick={() => activeResult.refetch()}
          className="btn-secondary text-sm py-2 px-4 flex items-center gap-2 self-start"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`card text-left transition-all ${
                activeTab === tab.key
                  ? "ring-2 ring-primary-500 bg-primary-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                    activeTab === tab.key ? "bg-primary-100" : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      activeTab === tab.key ? "text-primary-600" : "text-gray-500"
                    }`}
                  />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700">{tab.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{tab.stat}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email..."
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
              <option value="PAUSED">Paused</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden p-0">
        {activeResult.isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={8} cols={6} />
          </div>
        ) : activeResult.error ? (
          <div className="p-6">
            <ErrorState message={activeResult.error} onRetry={activeResult.refetch} />
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <TrendingUp className="h-10 w-10 mx-auto mb-3 text-gray-300" />
            <p>No {tabs.find((t) => t.key === activeTab)?.label} found</p>
          </div>
        ) : activeTab === "auto" ? (
          <AutoSavingsTable items={items as AutoSavingsItem[]} />
        ) : activeTab === "target" ? (
          <TargetSavingsTable items={items as TargetSavingsItem[]} />
        ) : activeTab === "locked" ? (
          <LockedSavingsTable items={items as LockedSavingsItem[]} />
        ) : (
          <GroupSavingsTable items={items as GroupSavingsItem[]} />
        )}

        {/* Pagination */}
        {!activeResult.isLoading && !activeResult.error && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{items.length}</span> of{" "}
              <span className="font-medium">{pagination?.total || items.length}</span> records
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
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
        statusColors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status?.toLowerCase()}
    </span>
  );
}

function UserCell({ user }: { user: SavingsUser }) {
  return (
    <div>
      <p className="font-medium text-gray-900 text-sm">{user?.name || user?.email}</p>
      {user?.aminiTag && (
        <p className="text-xs text-gray-500 font-mono">{user.aminiTag}</p>
      )}
    </div>
  );
}

function AutoSavingsTable({ items }: { items: AutoSavingsItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name / Type</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount / Cycle</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saved</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-4 px-4"><UserCell user={item.user} /></td>
              <td className="py-4 px-4">
                <p className="text-sm text-gray-900">{item.savingsName || "—"}</p>
                <p className="text-xs text-gray-500">{item.savingsType}</p>
              </td>
              <td className="py-4 px-4">
                <p className="text-sm font-medium text-gray-900">{formatAmount(item.amount)}</p>
                <p className="text-xs text-gray-500">per cycle</p>
              </td>
              <td className="py-4 px-4">
                <p className="text-sm font-semibold text-green-700">{formatAmount(item.currentAmount)}</p>
                {item.targetAmount && (
                  <p className="text-xs text-gray-500">of {formatAmount(item.targetAmount)}</p>
                )}
              </td>
              <td className="py-4 px-4"><StatusBadge status={item.status} /></td>
              <td className="py-4 px-4 text-sm text-gray-500">{formatDate(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TargetSavingsTable({ items }: { items: TargetSavingsItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goal</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item) => {
            const pct = item.targetAmount > 0
              ? Math.min(100, Math.round((Number(item.currentAmount) / Number(item.targetAmount)) * 100))
              : 0;
            return (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-4 px-4"><UserCell user={item.user} /></td>
                <td className="py-4 px-4">
                  <p className="text-sm font-medium text-gray-900">{item.goalIcon} {item.goalName}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm font-semibold text-green-700">{formatAmount(item.currentAmount)}</p>
                  <p className="text-xs text-gray-500">of {formatAmount(item.targetAmount)} ({pct}%)</p>
                  <div className="mt-1 h-1.5 w-24 rounded-full bg-gray-200">
                    <div className="h-1.5 rounded-full bg-green-500" style={{ width: `${pct}%` }} />
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  {item.deadline ? formatDate(item.deadline) : "—"}
                </td>
                <td className="py-4 px-4"><StatusBadge status={item.status} /></td>
                <td className="py-4 px-4 text-sm text-gray-500">{formatDate(item.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function LockedSavingsTable({ items }: { items: LockedSavingsItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name / Type</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unlock Date</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-4 px-4"><UserCell user={item.user} /></td>
              <td className="py-4 px-4">
                <p className="text-sm text-gray-900">{item.savingsName || "—"}</p>
                <p className="text-xs text-gray-500">{item.lockType}{item.lockPeriod ? ` · ${item.lockPeriod} days` : ""}</p>
              </td>
              <td className="py-4 px-4">
                <p className="text-sm font-semibold text-gray-900">{formatAmount(item.amount)}</p>
              </td>
              <td className="py-4 px-4">
                <p className="text-sm text-green-700 font-medium">{formatAmount(item.interestEarned)}</p>
                <p className="text-xs text-gray-500">{Number(item.interestRate)}% rate</p>
              </td>
              <td className="py-4 px-4 text-sm text-gray-500">{formatDate(item.unlockDate)}</td>
              <td className="py-4 px-4"><StatusBadge status={item.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GroupSavingsTable({ items }: { items: GroupSavingsItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizer</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contribution</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members / Rounds</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-4 px-4"><UserCell user={item.organizer} /></td>
              <td className="py-4 px-4">
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">{item.paymentFrequency}</p>
              </td>
              <td className="py-4 px-4 text-sm font-medium text-gray-900">
                {formatAmount(item.contributionAmount)}
              </td>
              <td className="py-4 px-4 text-sm font-semibold text-green-700">
                {formatAmount(item.totalPoolAmount)}
              </td>
              <td className="py-4 px-4">
                <p className="text-sm text-gray-900">{item._count?.members ?? item.memberCount} members</p>
                <p className="text-xs text-gray-500">Round {item.currentRound}/{item.totalRounds}</p>
              </td>
              <td className="py-4 px-4"><StatusBadge status={item.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
