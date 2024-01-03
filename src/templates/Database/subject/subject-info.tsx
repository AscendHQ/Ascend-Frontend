/* eslint-disable sonarjs/no-duplicate-string */
export type subjectInfoProp = {
  subjectName: string;
  subjectCode: string;
  classes: string;
  studentsOffering: string;
  level: "senior" | "junior";
};

export const subjectInfo: subjectInfoProp[] = [
  {
    subjectName: "Physics",
    subjectCode: "PHY",
    classes: "SS1_SCI,SS2_SCI,SS3_SCI",
    studentsOffering: "12",
    level: "senior",
  },
  {
    subjectName: "Chemistry",
    subjectCode: "CHEM",
    classes: "SS1_SCI,SS2_SCI,SS3_SCI",
    studentsOffering: "12",
    level: "senior",
  },
  {
    subjectName: "Biology",
    subjectCode: "BIO",
    classes: "SS1_SCI,SS2_SCI,SS3_SCI",
    studentsOffering: "12",
    level: "senior",
  },
  {
    subjectName: "Further Mathematics",
    subjectCode: "FMATH",
    classes: "SS1_SCI,SS2_SCI,SS3_SCI",
    studentsOffering: "12",
    level: "senior",
  },
  {
    subjectName: "English Language",
    subjectCode: "ENG",
    classes: "JSS1,JSS2,JSS3,SS1_SCI,SS2_SCI,SS3_SCI",
    studentsOffering: "12",
    level: "junior",
  },
  {
    subjectName: "Civic Education",
    subjectCode: "CVE",
    classes: "SS1_SCI,SS2_SCI,SS3_SCI",
    studentsOffering: "12",
    level: "junior",
  },
  {
    subjectName: "Economics",
    subjectCode: "ECON",
    classes: "SS1_COM,SS2_COM,SS3_COM",
    studentsOffering: "12",
    level: "senior",
  },
];
