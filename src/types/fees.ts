export type FeeClass = {
  _id: string;
  name: string;
  level: "junior" | "senior";
  section?: string;
  other_section?: string;
};

export type FeeItem = { label: string; amount: number };

export type FeeStudent = {
  _id: string;
  registration_number: string;
  personal_information: {
    first_name: string;
    middle_name?: string;
    last_name: string;
  };
  guardian_information?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    contact_number?: string;
  };
};

export type FeeInvoice = {
  _id: string;
  invoice_number: string;
  fee_structure: { _id: string; name: string } | string;
  student: FeeStudent | string;
  class: FeeClass | string;
  session: string;
  term: string;
  items: FeeItem[];
  total_amount: number;
  amount_paid: number;
  balance: number;
  status: "unpaid" | "partial" | "paid";
  display_status: "unpaid" | "partial" | "paid" | "overdue";
  due_date: string;
  createdAt: string;
};

export type FeePayment = {
  _id: string;
  amount: number;
  method: "cash" | "bank_transfer" | "pos" | "online" | "other";
  reference: string;
  receipt_number: string;
  note?: string;
  paid_at: string;
  provider?: string;
  channel?: string;
};

export type InvoiceListResponse = {
  invoices: FeeInvoice[];
  summary: {
    invoiced: number;
    collected: number;
    outstanding: number;
    paid: number;
    partial: number;
    unpaid: number;
    overdue: number;
  };
};

export type StudentFinancialBalance = {
  student: FeeStudent;
  current_expected: number;
  current_paid: number;
  current_balance: number;
  arrears_balance: number;
  total_outstanding: number;
  arrears_sources: { period: string; amount: number }[];
};

export type FinancialOverviewResponse = {
  session: string;
  term: string;
  summary: {
    expected: number;
    collected: number;
    current_outstanding: number;
    previous_arrears: number;
    total_receivable: number;
    collection_rate: number;
    fully_paid: number;
    partially_paid: number;
    unpaid: number;
  };
  students: StudentFinancialBalance[];
};
