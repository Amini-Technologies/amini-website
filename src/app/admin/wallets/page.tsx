"use client";

import { useState } from "react";
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
} from "lucide-react";
import { mockWallets, dashboardStats } from "@/lib/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";

const statusColors = {
  active: "bg-green-100 text-green-700",
  suspended: "bg-red-100 text-red-700",
  closed: "bg-gray-100 text-gray-700",
};

export default function WalletsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  const filteredWallets = mockWallets.filter((wallet) => {
    const matchesSearch =
      wallet.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wallet.virtualAccountNumber.includes(searchQuery);

    const matchesStatus =
      statusFilter === "all" || wallet.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalBalance = mockWallets.reduce((sum, w) => sum + w.balance, 0);
  const activeWallets = mockWallets.filter((w) => w.status === "active").length;
  const suspendedWallets = mockWallets.filter(
    (w) => w.status === "suspended"
  ).length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wallets</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage all user wallets and virtual accounts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Sync Balances
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2">
              <Wallet className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Balance</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(totalBalance)}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Platform Total</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(dashboardStats.totalWalletBalance)}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2">
              <Wallet className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Wallets</p>
              <p className="text-lg font-bold text-gray-900">{activeWallets}</p>
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
              <p className="text-lg font-bold text-gray-900">
                {suspendedWallets}
              </p>
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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input pl-10 pr-8 appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Wallets table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Virtual Account
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Currency
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredWallets.map((wallet) => (
                <tr key={wallet.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center shrink-0">
                        <span className="text-sm font-medium text-white">
                          {wallet.userName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {wallet.userName}
                        </p>
                        <p className="text-xs text-gray-500">ID: {wallet.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-mono text-sm text-gray-900">
                        {wallet.virtualAccountNumber}
                      </p>
                      <p className="text-xs text-gray-500">
                        {wallet.virtualAccountBank}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(wallet.balance)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">
                      {wallet.currency}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        statusColors[wallet.status]
                      }`}
                    >
                      {wallet.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-500">
                      {formatDate(wallet.createdAt)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowActionMenu(
                            showActionMenu === wallet.id ? null : wallet.id
                          )
                        }
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {showActionMenu === wallet.id && (
                        <div className="absolute right-0 z-10 mt-1 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black/5">
                          <div className="py-1">
                            <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Eye className="h-4 w-4" />
                              View Transactions
                            </button>
                            <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <RefreshCw className="h-4 w-4" />
                              Sync Balance
                            </button>
                            {wallet.status === "active" ? (
                              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-amber-600 hover:bg-amber-50">
                                <Ban className="h-4 w-4" />
                                Suspend Wallet
                              </button>
                            ) : (
                              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-green-50">
                                <Wallet className="h-4 w-4" />
                                Activate Wallet
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

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium">{filteredWallets.length}</span> of{" "}
            <span className="font-medium">{mockWallets.length}</span> wallets
          </p>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
