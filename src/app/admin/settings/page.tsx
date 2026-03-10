"use client";

import { useState } from "react";
import {
  Bell,
  Lock,
  Globe,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    transactions: true,
    security: true,
    marketing: false,
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your admin preferences and platform settings
        </p>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-blue-100 p-2">
            <Bell className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Notification Settings
            </h3>
            <p className="text-sm text-gray-600">
              Configure how you receive notifications
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries({
            email: {
              label: "Email Notifications",
              description: "Receive notifications via email",
            },
            push: {
              label: "Push Notifications",
              description: "Receive push notifications in your browser",
            },
            transactions: {
              label: "Transaction Alerts",
              description: "Get notified about large or suspicious transactions",
            },
            security: {
              label: "Security Alerts",
              description: "Receive alerts for security-related events",
            },
            marketing: {
              label: "Marketing Updates",
              description: "Receive product updates and news",
            },
          }).map(([key, { label, description }]) => (
            <div
              key={key}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="font-medium text-gray-900">{label}</p>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[key as keyof typeof notifications]}
                  onChange={(e) =>
                    setNotifications((prev) => ({
                      ...prev,
                      [key]: e.target.checked,
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-green-100 p-2">
            <Lock className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Security Settings
            </h3>
            <p className="text-sm text-gray-600">
              Manage your account security
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">
                Add an extra layer of security to your account
              </p>
            </div>
            <button className="btn-secondary text-sm py-2 px-4">Enable</button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Change Password</p>
              <p className="text-sm text-gray-600">
                Update your admin password
              </p>
            </div>
            <button className="btn-secondary text-sm py-2 px-4">Change</button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Active Sessions</p>
              <p className="text-sm text-gray-600">
                Manage your active login sessions
              </p>
            </div>
            <button className="btn-secondary text-sm py-2 px-4">Manage</button>
          </div>
        </div>
      </div>

      {/* Platform Settings */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-accent-100 p-2">
            <Globe className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Platform Settings
            </h3>
            <p className="text-sm text-gray-600">
              Configure platform-wide settings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Currency
            </label>
            <select className="input">
              <option>NGN - Nigerian Naira</option>
              <option>USD - US Dollar</option>
              <option>GBP - British Pound</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timezone
            </label>
            <select className="input">
              <option>Africa/Lagos (WAT)</option>
              <option>UTC</option>
              <option>Europe/London</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction Limit (NGN)
            </label>
            <input
              type="number"
              className="input"
              placeholder="1000000"
              defaultValue="1000000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Withdrawal Limit (NGN)
            </label>
            <input
              type="number"
              className="input"
              placeholder="500000"
              defaultValue="500000"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="btn-primary flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
