/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NotificationInstance } from "antd/es/notification/interface";
import { ComponentProps } from "react";
import { UseFormRegister } from "react-hook-form";

type hostelOption = "All" | "Female Hostel" | "Male Hostel";

export type FilterButtonsProps = {
  studentDemographics: {
    name: hostelOption;
    number: number;
  }[];
  viewStudent: hostelOption;
  setViewStudent: (value: hostelOption) => void;
};

export type TableHeaderProps = {
  text: string | JSX.Element;
  isCentered?: boolean;
  styles?: string;
};

export type TableCellProps = {
  content: string | number | JSX.Element;
  isCentered?: boolean;
  styles?: string;
  leftElement?: JSX.Element;
};

export type HostelItem = {
  hostelName: string;
  staffName: string;
  capacity: number;
  numberOfStudents: number;
  gender: number;
  dateAdded: string;
  classes: string;
};
export type StudentDemographic = {
  name: "All" | "Female Hostel" | "Male Hostel";
  number: number;
};

export type studentDemographicsState = {
  viewStudent: "All" | "Male Hostel" | "Female Hostel";
  studentDemographics: StudentDemographic[];
};
export type lessonTitle = "All" | "Approved" | "Rejected";

export type LessonPlan = {
  title: lessonTitle;
  number: number;
};

export type LessonPlanState = {
  viewLessonPlan: lessonTitle;
  LessonPlans: LessonPlan[];
  // { value: string; label: string; checked: boolean }
};

export type LessonPlanListProps = {
  lessonPlans: LessonPlan[];
  currentLessonPlan: lessonTitle;
  setCurrentLessonPlan: React.Dispatch<React.SetStateAction<lessonTitle>>;
};
export type LessonPlanTableRowProps = {
  item: {
    staffName: string;
    subject: string;
    class: string;
    statusIsActive: number;
  };
  setOpenResultApproved: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenResultRejected: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStudent: React.Dispatch<
    React.SetStateAction<{ activeStatus: number }>
  >;
  index: number;
};

export type ClassRowProps = {
  item: {
    className: string;
    numberOfStudents: number;
    teacher: string;
    class: string;
    studentsOffering: string;
    statusIsActive: boolean;
  };
  index: number;
};

export type ClassDemographic = {
  name: "All" | "Inactive" | "Active";
  number: number;
};

export type ClassDemographicsState = {
  viewStudent: "All" | "Active" | "Inactive";
  studentClassDemographics: ClassDemographic[];
};
export type ClassListProps = {
  studentClassDemographics: ClassDemographic[];
  viewStudent: string;
  setViewStudent: React.Dispatch<
    React.SetStateAction<"All" | "Active" | "Inactive">
  >;
};

// @ts-ignore
type NewType = UseFormRegister<T>;

export type TextFieldProps = {
  id: string;
  label: string | JSX.Element;
  required?: boolean;
  isFullWidth?: boolean;
  register: NewType;
  value?: string;
  errorMessage: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type TextAreaProps = {
  id: string;
  label: React.ReactNode;
  maxLength?: number;
  errorMessage: string;
  register: NewType;
  isFullWidth?: boolean;
  showCharacterCount?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type SelectFieldProps = {
  id: string;
  label: string;
  options: string[];
  isFullWidth?: boolean;
  value?: string;
  labelStyle?: string;
  register: NewType;
  errorMessage: string;
  selectStyle?: string;
  wrapperStyle?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export interface InputGroupProps extends ComponentProps<"input"> {
  id: string;
  label: string;
  options: { value: string; label: string; checked: boolean }[];
  isFullWidth?: boolean;
}
export type ErrorModalProps = {
  title?: string;
  content?: string;
  okButtonProps?: {
    style: React.CSSProperties;
  };
  cancelButtonProps?: {
    style: React.CSSProperties;
  };
  mainButtonProps: JSX.Element;
  onOk?: () => void;
  onCancel?: () => void;
};
export type PayrollRowProps = {
  item: {
    staffName: string;
    class: string;
    jobTitle: string;
    basicSalary: number;
    deductions: number;
    accountNumberDetails: string;
    bankAccountDetails: string;
  };
  index: number;
  api: NotificationInstance;
};
