/* eslint-disable sonarjs/no-duplicate-string */
import {
  DASHBOARD_CLASS,
  DASHBOARD_CLASS_INFO,
  DASHBOARD_HOSTEL,
  DASHBOARD_HOSTEL_INFO,
  DASHBOARD_STUDENT,
  DASHBOARD_SUBJECT,
  DASHBOARD_SUBJECT_INFO,
  DASHBOARD_TEACHER,
  DASHBOARD_TEACHER_INFO_BIODATA,
  DASHBOARD_TEACHER_INFO_OFFICIAL_INFO,
  DASHBOARD_TEACHER_INFO_PERMISSION,
  DASHBOARD_TEACHER_SECURITY_INFO,
  NEW_BULK_CLASS,
  NEW_BULK_HOSTEL,
  NEW_CLASS,
  NEW_HOSTEL,
  NEW_STUDENT_ACADEMIC_INFORMATION,
  NEW_STUDENT_BIODATA,
  NEW_SUBJECT,
  NEW_TEACHER_BIODATA,
  NEW_TEACHER_PERMISSION,
  STUDENT_ACADEMIC_INFORMATION,
  STUDENT_BIODATA,
} from "@/config/links";

const databaseNavSection = [
  {
    title: "Students",
    path: DASHBOARD_STUDENT,
    isActivepath: [
      DASHBOARD_STUDENT,
      STUDENT_BIODATA,
      STUDENT_ACADEMIC_INFORMATION,
      NEW_STUDENT_ACADEMIC_INFORMATION,
      NEW_STUDENT_BIODATA,
    ],
  },
  {
    title: "Subjects",
    path: DASHBOARD_SUBJECT,
    isActivepath: [
      DASHBOARD_SUBJECT,
      NEW_SUBJECT,
      DASHBOARD_SUBJECT_INFO("[subjectInfo]"),
    ],
  },
  {
    title: "Classes",
    path: DASHBOARD_CLASS,
    isActivepath: [
      DASHBOARD_CLASS,
      NEW_CLASS,
      NEW_BULK_CLASS,
      DASHBOARD_CLASS_INFO("[classInfo]"),
    ],
  },
  {
    title: "Staff",
    path: DASHBOARD_TEACHER,
    isActivepath: [
      DASHBOARD_TEACHER,
      NEW_TEACHER_BIODATA,
      NEW_TEACHER_PERMISSION,
      DASHBOARD_TEACHER_INFO_BIODATA("[teacherInfo]"),
      DASHBOARD_TEACHER_INFO_OFFICIAL_INFO("[teacherInfo]"),
      DASHBOARD_TEACHER_INFO_PERMISSION("[teacherInfo]"),
      DASHBOARD_TEACHER_SECURITY_INFO("[teacherInfo]"),
    ],
  },
  {
    title: "Hostels",
    path: DASHBOARD_HOSTEL,
    isActivepath: [
      DASHBOARD_HOSTEL,
      NEW_HOSTEL,
      NEW_BULK_HOSTEL,
      DASHBOARD_HOSTEL_INFO("[hostelInfo]"),
    ],
  },
];

export default databaseNavSection;
