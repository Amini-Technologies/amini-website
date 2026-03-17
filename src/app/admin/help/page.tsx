"use client";

import {
  HelpCircle,
  Book,
  MessageCircle,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react";

const helpTopics = [
  {
    title: "Getting Started",
    description: "Learn the basics of the admin dashboard",
    articles: 8,
  },
  {
    title: "User Management",
    description: "How to manage users and handle KYC",
    articles: 12,
  },
  {
    title: "Transaction Monitoring",
    description: "Understanding and reviewing transactions",
    articles: 10,
  },
  {
    title: "Security & Compliance",
    description: "Security features and compliance guidelines",
    articles: 15,
  },
  {
    title: "Reports & Analytics",
    description: "Generating and understanding reports",
    articles: 6,
  },
  {
    title: "API Integration",
    description: "Technical documentation for developers",
    articles: 20,
  },
];

const faqs = [
  {
    question: "How do I verify a user's KYC?",
    answer:
      "Navigate to the Users page, find the user, click the action menu, and select 'Verify KYC'. Review their submitted documents and approve or reject accordingly.",
  },
  {
    question: "How do I reverse a transaction?",
    answer:
      "Go to Transactions, find the completed transaction, click the action menu, and select 'Reverse'. This will create a refund transaction and update both wallets.",
  },
  {
    question: "How do I suspend a user account?",
    answer:
      "On the Users page, click the action menu for the user and select 'Suspend User'. The user will be notified and won't be able to perform transactions.",
  },
  {
    question: "How do I export transaction reports?",
    answer:
      "Navigate to Reports, select your date range and report type, then click 'Generate Report'. You can download in PDF or CSV format.",
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        <p className="mt-1 text-sm text-gray-600">
          Find answers and get help with the admin dashboard
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card hover:border-primary-200 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-100 p-3 group-hover:bg-blue-200 transition-colors">
              <Book className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Documentation</h3>
              <p className="text-sm text-gray-600">Browse our guides</p>
            </div>
          </div>
        </div>
        <div className="card hover:border-primary-200 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-green-100 p-3 group-hover:bg-green-200 transition-colors">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Live Chat</h3>
              <p className="text-sm text-gray-600">Chat with support</p>
            </div>
          </div>
        </div>
        <div className="card hover:border-primary-200 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-accent-100 p-3 group-hover:bg-accent-200 transition-colors">
              <Mail className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Email Support</h3>
              <p className="text-sm text-gray-600">support@amini.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Topics */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Help Topics
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {helpTopics.map((topic) => (
            <div
              key={topic.title}
              className="p-4 rounded-xl border border-gray-200 hover:border-primary-300 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                    {topic.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {topic.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {topic.articles} articles
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-primary-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">{faq.question}</h4>
                  <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="card gradient-bg text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Need more help?</h3>
            <p className="text-white/80 mt-1">
              Our support team is available 24/7 to assist you
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:support@amini.com"
              className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-medium hover:bg-white/30 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </a>
            <a
              href="tel:+2341234567890"
              className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-medium hover:bg-white/30 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
