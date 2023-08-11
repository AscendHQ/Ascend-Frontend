/* eslint-disable sonarjs/no-duplicate-string */
import {
  DASHBOARD_CLASS,
  DASHBOARD_CLASS_INFO,
  DASHBOARD_STUDENT,
  DASHBOARD_SUBJECT,
  DASHBOARD_SUBJECT_INFO,
  DASHBOARD_TEACHER,
  DASHBOARD_TEACHER_INFO_BIODATA,
  DASHBOARD_TEACHER_INFO_OFFICIAL_INFO,
  DASHBOARD_TEACHER_INFO_PERMISSION,
  DASHBOARD_TEACHER_SECURITY_INFO,
  NEW_CLASS,
  NEW_SUBJECT,
  NEW_TEACHER_BIODATA,
  NEW_TEACHER_OFFICIAL_INFO,
  NEW_TEACHER_PERMISSION,
  STUDENT_ACADEMIC_INFORMATION,
  STUDENT_ACADEMIC_INFORMATION_UPDATE,
  STUDENT_BIODATA,
  STUDENT_BIODATA_UPDATE,
} from "@/config/links";

const databaseNavSection = [
  {
    title: "Students",
    path: DASHBOARD_STUDENT,
    isActivepath: [
      DASHBOARD_STUDENT,
      STUDENT_BIODATA,
      STUDENT_ACADEMIC_INFORMATION,
      STUDENT_ACADEMIC_INFORMATION_UPDATE,
      STUDENT_BIODATA_UPDATE,
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
      DASHBOARD_CLASS_INFO("[classInfo]"),
    ],
  },
  {
    title: "Teachers",
    path: DASHBOARD_TEACHER,
    isActivepath: [
      DASHBOARD_TEACHER,
      NEW_TEACHER_BIODATA,
      NEW_TEACHER_PERMISSION,
      NEW_TEACHER_OFFICIAL_INFO,
      DASHBOARD_TEACHER_INFO_BIODATA("[teacherInfo]"),
      DASHBOARD_TEACHER_INFO_OFFICIAL_INFO("[teacherInfo]"),
      DASHBOARD_TEACHER_INFO_PERMISSION("[teacherInfo]"),
      DASHBOARD_TEACHER_SECURITY_INFO("[teacherInfo]"),
    ],
  },
  {
    title: "Hostels",
    path: "/dashboard/hostels",
    isActivepath: ["/dashboard/hostels"],
  },
];

export default databaseNavSection;
