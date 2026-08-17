import { FeeInvoice, FeePayment } from "./fees";

export type ParentStudent = {
  _id: string;
  registration_number: string;
  personal_information: {
    first_name: string;
    middle_name?: string;
    last_name: string;
    gender?: string;
  };
  academic_details: {
    class?:
      | { _id: string; name: string; section?: string; other_section?: string }
      | string;
    current_session?: string;
    current_term?: string;
  };
  is_active?: boolean;
};

export type ParentDashboardChild = {
  student: ParentStudent;
  attendance: {
    total_days: number;
    percentage: number;
    counts: { present: number; absent: number; late: number; excused: number };
  };
  finances: { invoiced: number; paid: number; balance: number };
  latest_result: null | {
    _id: string;
    session: string;
    term: string;
    average: number;
    status: string;
  };
};

export type ParentChildDetails = {
  student: ParentStudent;
  attendance: ParentDashboardChild["attendance"] & {
    history: Array<{
      attendance_id: string;
      date: string;
      session: string;
      term: string;
      status: "present" | "absent" | "late" | "excused";
      remark: string;
    }>;
  };
  finances: ParentDashboardChild["finances"];
  invoices: Array<FeeInvoice & { payment_url?: string }>;
  payments: FeePayment[];
  results: Array<{
    _id: string;
    session: string;
    term: string;
    status?: string;
    blocks: Array<{
      _id: string;
      subject: { _id: string; name: string } | string;
      mid_term_test: number;
      ca_score: number;
      exam_score: number;
      total: number;
      grade: string;
    }>;
  }>;
};
