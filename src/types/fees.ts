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
