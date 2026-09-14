export type CbtQuestionInput = {
  prompt: string;
  options: string[];
  correct_option: number;
  marks: number;
};

export type CbtExam = {
  _id: string;
  title: string;
  instructions?: string;
  class: {
    _id: string;
    name: string;
    section?: string;
    other_section?: string;
  };
  subject: { _id: string; name: string; code: string };
  session: string;
  term: string;
  duration_minutes: number;
  starts_at: string;
  ends_at: string;
  status: "draft" | "published" | "closed";
  total_marks: number;
  question_count: number;
  attempt_count: number;
  submitted_count: number;
  attempt?: CbtAttempt;
};

export type CbtAttempt = {
  _id: string;
  status: "in_progress" | "submitted";
  answers: Array<{ question_id: string; selected_option: number }>;
  started_at?: string;
  expires_at: string;
  submitted_at?: string;
  score?: number;
  total_marks?: number;
  percentage?: number;
  student?: {
    _id: string;
    registration_number: string;
    personal_information: {
      first_name: string;
      middle_name?: string;
      last_name: string;
    };
  };
};

export type ActiveCbt = {
  attempt: CbtAttempt;
  exam: {
    _id: string;
    title: string;
    instructions?: string;
    session: string;
    term: string;
    total_marks: number;
    questions: Array<{
      _id: string;
      prompt: string;
      options: string[];
      marks: number;
    }>;
  };
};
