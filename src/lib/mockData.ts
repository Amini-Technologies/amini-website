// Type definitions for admin dashboard entities

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  aminiTag: string;
  avatar?: string;
  status: "active" | "suspended" | "pending";
  kycStatus: "verified" | "pending" | "rejected";
  createdAt: string;
  lastActive: string;
}

export interface Wallet {
  id: string;
  userId: string;
  userName: string;
  balance: number;
  currency: string;
  status: "active" | "suspended" | "closed";
  virtualAccountNumber: string;
  virtualAccountBank: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  reference: string;
  type: "transfer" | "deposit" | "withdrawal" | "bill_payment";
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed" | "reversed";
  senderName: string;
  receiverName: string;
  description: string;
  createdAt: string;
}
