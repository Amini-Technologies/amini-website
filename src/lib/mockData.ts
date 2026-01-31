// Mock data for the admin dashboard
// In production, this would come from the API

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

// Mock users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Oluwaseun Adeyemi",
    email: "seun@example.com",
    phone: "+2348012345678",
    username: "seun_adeyemi",
    aminiTag: "AMNI-001",
    status: "active",
    kycStatus: "verified",
    createdAt: "2024-01-15T10:30:00Z",
    lastActive: "2024-11-28T15:45:00Z",
  },
  {
    id: "2",
    name: "Chidinma Okonkwo",
    email: "chidinma@example.com",
    phone: "+2348023456789",
    username: "chi_okonkwo",
    aminiTag: "AMNI-002",
    status: "active",
    kycStatus: "verified",
    createdAt: "2024-02-20T14:20:00Z",
    lastActive: "2024-11-29T09:30:00Z",
  },
  {
    id: "3",
    name: "Emeka Nwosu",
    email: "emeka@example.com",
    phone: "+2348034567890",
    username: "emeka_n",
    aminiTag: "AMNI-003",
    status: "suspended",
    kycStatus: "pending",
    createdAt: "2024-03-10T08:15:00Z",
    lastActive: "2024-11-25T12:00:00Z",
  },
  {
    id: "4",
    name: "Aisha Mohammed",
    email: "aisha@example.com",
    phone: "+2348045678901",
    username: "aisha_m",
    aminiTag: "AMNI-004",
    status: "active",
    kycStatus: "verified",
    createdAt: "2024-04-05T11:45:00Z",
    lastActive: "2024-11-29T16:20:00Z",
  },
  {
    id: "5",
    name: "Tunde Bakare",
    email: "tunde@example.com",
    phone: "+2348056789012",
    username: "tunde_b",
    aminiTag: "AMNI-005",
    status: "pending",
    kycStatus: "pending",
    createdAt: "2024-11-28T09:00:00Z",
    lastActive: "2024-11-28T09:00:00Z",
  },
];

// Mock wallets
export const mockWallets: Wallet[] = [
  {
    id: "w1",
    userId: "1",
    userName: "Oluwaseun Adeyemi",
    balance: 250000,
    currency: "NGN",
    status: "active",
    virtualAccountNumber: "8012345678",
    virtualAccountBank: "Wema Bank",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "w2",
    userId: "2",
    userName: "Chidinma Okonkwo",
    balance: 1500000,
    currency: "NGN",
    status: "active",
    virtualAccountNumber: "8023456789",
    virtualAccountBank: "Wema Bank",
    createdAt: "2024-02-20T14:20:00Z",
  },
  {
    id: "w3",
    userId: "3",
    userName: "Emeka Nwosu",
    balance: 50000,
    currency: "NGN",
    status: "suspended",
    virtualAccountNumber: "8034567890",
    virtualAccountBank: "Wema Bank",
    createdAt: "2024-03-10T08:15:00Z",
  },
  {
    id: "w4",
    userId: "4",
    userName: "Aisha Mohammed",
    balance: 875000,
    currency: "NGN",
    status: "active",
    virtualAccountNumber: "8045678901",
    virtualAccountBank: "Wema Bank",
    createdAt: "2024-04-05T11:45:00Z",
  },
  {
    id: "w5",
    userId: "5",
    userName: "Tunde Bakare",
    balance: 0,
    currency: "NGN",
    status: "active",
    virtualAccountNumber: "8056789012",
    virtualAccountBank: "Wema Bank",
    createdAt: "2024-11-28T09:00:00Z",
  },
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    reference: "TXN-001-2024",
    type: "transfer",
    amount: 25000,
    currency: "NGN",
    status: "completed",
    senderName: "Oluwaseun Adeyemi",
    receiverName: "Chidinma Okonkwo",
    description: "Payment for services",
    createdAt: "2024-11-29T10:30:00Z",
  },
  {
    id: "t2",
    reference: "TXN-002-2024",
    type: "deposit",
    amount: 500000,
    currency: "NGN",
    status: "completed",
    senderName: "Bank Transfer",
    receiverName: "Aisha Mohammed",
    description: "Wallet funding",
    createdAt: "2024-11-29T09:15:00Z",
  },
  {
    id: "t3",
    reference: "TXN-003-2024",
    type: "withdrawal",
    amount: 100000,
    currency: "NGN",
    status: "pending",
    senderName: "Chidinma Okonkwo",
    receiverName: "GTBank - 0123456789",
    description: "Withdrawal to bank",
    createdAt: "2024-11-29T08:45:00Z",
  },
  {
    id: "t4",
    reference: "TXN-004-2024",
    type: "bill_payment",
    amount: 5000,
    currency: "NGN",
    status: "completed",
    senderName: "Oluwaseun Adeyemi",
    receiverName: "MTN Airtime",
    description: "Airtime purchase",
    createdAt: "2024-11-28T16:20:00Z",
  },
  {
    id: "t5",
    reference: "TXN-005-2024",
    type: "transfer",
    amount: 150000,
    currency: "NGN",
    status: "failed",
    senderName: "Emeka Nwosu",
    receiverName: "External Account",
    description: "Failed transfer - insufficient funds",
    createdAt: "2024-11-28T14:00:00Z",
  },
  {
    id: "t6",
    reference: "TXN-006-2024",
    type: "deposit",
    amount: 75000,
    currency: "NGN",
    status: "completed",
    senderName: "Bank Transfer",
    receiverName: "Oluwaseun Adeyemi",
    description: "Wallet funding",
    createdAt: "2024-11-28T11:30:00Z",
  },
  {
    id: "t7",
    reference: "TXN-007-2024",
    type: "transfer",
    amount: 30000,
    currency: "NGN",
    status: "completed",
    senderName: "Aisha Mohammed",
    receiverName: "Oluwaseun Adeyemi",
    description: "Rent contribution",
    createdAt: "2024-11-27T15:45:00Z",
  },
  {
    id: "t8",
    reference: "TXN-008-2024",
    type: "bill_payment",
    amount: 15000,
    currency: "NGN",
    status: "completed",
    senderName: "Chidinma Okonkwo",
    receiverName: "DSTV Subscription",
    description: "Cable TV subscription",
    createdAt: "2024-11-27T10:00:00Z",
  },
];

// Dashboard stats
export const dashboardStats = {
  totalUsers: 12450,
  activeUsers: 10234,
  totalTransactions: 45678,
  transactionVolume: 2500000000,
  totalWalletBalance: 1850000000,
  pendingKyc: 156,
  recentGrowth: {
    users: 12.5,
    transactions: 8.3,
    volume: 15.2,
  },
};

// Chart data
export const transactionChartData = [
  { name: "Mon", deposits: 4000000, withdrawals: 2400000, transfers: 2400000 },
  { name: "Tue", deposits: 3000000, withdrawals: 1398000, transfers: 2210000 },
  { name: "Wed", deposits: 2000000, withdrawals: 9800000, transfers: 2290000 },
  { name: "Thu", deposits: 2780000, withdrawals: 3908000, transfers: 2000000 },
  { name: "Fri", deposits: 1890000, withdrawals: 4800000, transfers: 2181000 },
  { name: "Sat", deposits: 2390000, withdrawals: 3800000, transfers: 2500000 },
  { name: "Sun", deposits: 3490000, withdrawals: 4300000, transfers: 2100000 },
];

export const userGrowthData = [
  { name: "Jan", users: 4000 },
  { name: "Feb", users: 5000 },
  { name: "Mar", users: 6200 },
  { name: "Apr", users: 7800 },
  { name: "May", users: 8500 },
  { name: "Jun", users: 9200 },
  { name: "Jul", users: 9800 },
  { name: "Aug", users: 10500 },
  { name: "Sep", users: 11200 },
  { name: "Oct", users: 11800 },
  { name: "Nov", users: 12450 },
];
