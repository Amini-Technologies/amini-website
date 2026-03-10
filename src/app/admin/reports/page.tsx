"use client";

import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Users,
  Wallet,
  ArrowLeftRight,
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { dashboardStats } from "@/lib/mockData";

const reportTypes = [
  {
    name: "Transaction Report",
    description: "Detailed breakdown of all transactions",
    icon: ArrowLeftRight,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "User Report",
    description: "User registration and activity metrics",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Financial Report",
    description: "Revenue, fees, and financial summary",
    icon: Wallet,
    color: "bg-accent-100 text-primary-600",
  },
  {
    name: "Growth Report",
    description: "Platform growth and trends analysis",
    icon: TrendingUp,
    color: "bg-amber-100 text-amber-600",
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="mt-1 text-sm text-gray-600">
            Generate and download platform analytics reports
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatNumber(dashboardStats.totalUsers)}
          </p>
          <p className="text-xs text-green-600 mt-1">
            +{dashboardStats.recentGrowth.users}% this month
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatNumber(dashboardStats.totalTransactions)}
          </p>
          <p className="text-xs text-green-600 mt-1">
            +{dashboardStats.recentGrowth.transactions}% this month
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Transaction Volume</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(dashboardStats.transactionVolume)}
          </p>
          <p className="text-xs text-green-600 mt-1">
            +{dashboardStats.recentGrowth.volume}% this month
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Total Wallet Balance</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(dashboardStats.totalWalletBalance)}
          </p>
        </div>
      </div>

      {/* Report Types */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Generate Reports
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {reportTypes.map((report) => (
            <div
              key={report.name}
              className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className={`rounded-lg p-3 ${report.color}`}>
                <report.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{report.name}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {report.description}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <button className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </button>
                  <button className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Download CSV
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Custom Report
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input type="date" className="input pl-10" />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input type="date" className="input pl-10" />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select className="input">
              <option>All Reports</option>
              <option>Transactions Only</option>
              <option>Users Only</option>
              <option>Financial Only</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="btn-primary">Generate Report</button>
          </div>
        </div>
      </div>
    </div>
  );
}
