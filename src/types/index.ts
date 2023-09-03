export type FilterButtonsProps = {
  studentDemographics: {
    name: "All" | "Female Hostel" | "Male Hostel";
    number: number;
  }[];
  viewStudent: "All" | "Male Hostel" | "Female Hostel";
  setViewStudent: (value: "All" | "Male Hostel" | "Female Hostel") => void;
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
export type LessonPlan = {
  name: "All" | "Rejected" | "Approved";
  number: number;
};

export type LessonPlanState = {
  viewStudent: "All" | "Approved" | "Rejected";
  LessonPlans: LessonPlan[];
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
export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
};

export type TextFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  required?: boolean;
  isFullWidth?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type TextAreaProps = {
  id: string;
  label: string;
  placeholder: string;
  maxLength: number;
  isFullWidth?: boolean;
  showCharacterCount: boolean;
};

export type SelectFieldProps = {
  id: string;
  label: string;
  options: string[];
  isFullWidth?: boolean;
};
