"use client";

import { useState } from "react";
import {
  Users,
  Wallet,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
} from "lucide-react";
import { formatCurrency, formatNumber, formatDate } from "@/lib/utils";
import { useDashboardStats, useChartData } from "@/hooks/useAdminApi";
import { LoadingState, StatCardsSkeleton, TableSkeleton } from "@/components/admin/ui/LoadingState";
import { ErrorState } from "@/components/admin/ui/ErrorState";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const statusIcons: Record<string, JSX.Element> = {
  completed: <CheckCircle className="h-4 w-4 text-green-500" />,
  COMPLETED: <CheckCircle className="h-4 w-4 text-green-500" />,
  pending: <Clock className="h-4 w-4 text-amber-500" />,
  PENDING: <Clock className="h-4 w-4 text-amber-500" />,
  failed: <XCircle className="h-4 w-4 text-red-500" />,
  FAILED: <XCircle className="h-4 w-4 text-red-500" />,
  reversed: <AlertTriangle className="h-4 w-4 text-gray-500" />,
  REVERSED: <AlertTriangle className="h-4 w-4 text-gray-500" />,
};

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

const typeColors: Record<string, string> = {
  transfer: "bg-blue-100 text-blue-700",
  TRANSFER: "bg-blue-100 text-blue-700",
  deposit: "bg-green-100 text-green-700",
  DEPOSIT: "bg-green-100 text-green-700",
  withdrawal: "bg-accent-100 text-primary-700",
  WITHDRAWAL: "bg-accent-100 text-primary-700",
  bill_payment: "bg-amber-100 text-amber-700",
  BILL_PAYMENT: "bg-amber-100 text-amber-700",
};

export default function AdminDashboard() {
  const [chartDays, setChartDays] = useState(7);
  const { data: dashboardData, isLoading, error, refetch } = useDashboardStats();
  const { data: chartData, isLoading: chartsLoading } = useChartData(chartDays);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">Loading dashboard data...</p>
        </div>
        <StatCardsSkeleton count={4} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="card h-80 animate-pulse bg-gray-100" />
          <div className="card h-80 animate-pulse bg-gray-100" />
        </div>
        <TableSkeleton rows={5} cols={6} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );
  }

  const stats = [
    {
      name: "Total Users",
      value: formatNumber(dashboardData?.users?.total || 0),
      change: dashboardData?.users?.growth
        ? `${dashboardData.users.growth >= 0 ? '+' : ''}${dashboardData.users.growth}%`
        : "N/A",
      trend: (dashboardData?.users?.growth || 0) >= 0 ? "up" : "down",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      name: "Active Wallets",
      value: formatNumber(dashboardData?.wallets?.active || 0),
      change: `${dashboardData?.wallets?.suspended || 0} suspended`,
      trend: "up",
      icon: Wallet,
      color: "bg-green-500",
    },
    {
      name: "Total Transactions",
      value: formatNumber(dashboardData?.transactions?.total || 0),
      change: `${dashboardData?.transactions?.pending || 0} pending`,
      trend: "up",
      icon: ArrowLeftRight,
      color: "bg-accent-500",
    },
    {
      name: "Today's Volume",
      value: formatCurrency(Number(dashboardData?.transactions?.todayVolume || 0)),
      change: dashboardData?.transactions?.growth
        ? `${dashboardData.transactions.growth >= 0 ? '+' : ''}${dashboardData.transactions.growth}%`
        : "N/A",
      trend: (dashboardData?.transactions?.growth || 0) >= 0 ? "up" : "down",
      icon: TrendingUp,
      color: "bg-amber-500",
    },
  ];

  const recentTransactions = dashboardData?.recentTransactions || [];
  const transactionVolumeData = chartData?.transactionVolume || [];
  const userGrowthData = chartData?.userGrowth || [];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back! Here&apos;s what&apos;s happening with Amini today.
          </p>
        </div>
        {/* Security Score Badge */}
        {dashboardData?.security && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 border border-green-200">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Security Score: {dashboardData.security.securityScore}%
            </span>
            {dashboardData.security.highPriorityAlerts > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                {dashboardData.security.highPriorityAlerts} alerts
              </span>
            )}
          </div>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="card hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2 ${stat.color}`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Transaction Volume Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Transaction Volume
            </h3>
            <select
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={chartDays}
              onChange={(e) => setChartDays(Number(e.target.value))}
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          </div>
          <div className="h-72">
            {chartsLoading ? (
              <LoadingState message="Loading chart..." />
            ) : transactionVolumeData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transactionVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                  <Bar
                    dataKey="deposits"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                    name="Deposits"
                  />
                  <Bar
                    dataKey="withdrawals"
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                    name="Withdrawals"
                  />
                  <Bar
                    dataKey="transfers"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    name="Transfers"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No transaction data available
              </div>
            )}
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
          </div>
          <div className="h-72">
            {chartsLoading ? (
              <LoadingState message="Loading chart..." />
            ) : userGrowthData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => formatNumber(value)}
                  />
                  <Tooltip
                    formatter={(value: number) => formatNumber(value)}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="totalUsers"
                    stroke="#22c55e"
                    strokeWidth={2}
                    fill="url(#colorUsers)"
                    name="Total Users"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No user growth data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h3>
          <a
            href="/admin/transactions"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            View all
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        {recentTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From / To
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-gray-900">
                        {tx.reference}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                          typeColors[tx.type] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {String(tx.type).toLowerCase().replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm text-gray-900">{tx.sender || 'System'}</p>
                        <p className="text-xs text-gray-500">
                          → {tx.receiver || 'External'}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(Number(tx.amount))}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                          statusColors[tx.status] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {statusIcons[tx.status]}
                        {String(tx.status).toLowerCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-500">
                        {formatDate(tx.createdAt)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No recent transactions
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <a
          href="/admin/users"
          className="card hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-100 p-3 group-hover:bg-blue-200 transition-colors">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Manage Users</p>
              <p className="text-sm text-gray-500">
                {formatNumber(dashboardData?.users?.total || 0)} users
              </p>
            </div>
          </div>
        </a>

        <a
          href="/admin/wallets"
          className="card hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-green-100 p-3 group-hover:bg-green-200 transition-colors">
              <Wallet className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">View Wallets</p>
              <p className="text-sm text-gray-500">
                {formatCurrency(Number(dashboardData?.wallets?.totalBalance || 0))} total
              </p>
            </div>
          </div>
        </a>

        <a
          href="/admin/transactions"
          className="card hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-accent-100 p-3 group-hover:bg-accent-200 transition-colors">
              <ArrowLeftRight className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Transactions</p>
              <p className="text-sm text-gray-500">
                {dashboardData?.transactions?.pending || 0} pending review
              </p>
            </div>
          </div>
        </a>

        <a
          href="/admin/security"
          className="card hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-red-100 p-3 group-hover:bg-red-200 transition-colors">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Security</p>
              <p className="text-sm text-gray-500">
                {dashboardData?.security?.unresolvedAlerts || 0} unresolved alerts
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
