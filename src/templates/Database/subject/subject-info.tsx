export type subjectInfoProp = {
  subjectName: string;
  subjectCode: string;
  classes: string;
  studentsOffering: string;
  level: "Senior" | "Junior";
};

export const subjectInfo: subjectInfoProp[] = [
  {
    subjectName: "Physics",
    subjectCode: "PHY",
    classes: "SS1_SCI,SS2_SCI,SS3_SCI",
    studentsOffering: "12",
    level: "Senior",
  },
  {
    subjectName: "Chemistry",
    subjectCode: "CHEM",
    classes: "SS1_SCI,SS2_SCI,SS3_SCI",
    studentsOffering: "12",
    level: "Senior",
  },
  {
    subjectName: "Biology",
    subjectCode: "BIO",
    classes: "SS1_SCI,SS2_SCI,SS3_SCI",
    studentsOffering: "12",
    level: "Senior",
  },
  {
    subjectName: "Further Mathematics",
    subjectCode: "FMATH",
    classes: "SS1_SCI,SS2_SCI,SS3_SCI",
    studentsOffering: "12",
    level: "Senior",
  },
  {
    subjectName: "English Language",
    subjectCode: "ENG",
    classes: "JSS1,JSS2,JSS3,SS1_SCI,SS2_SCI,SS3_SCI",
    studentsOffering: "12",
    level: "Junior",
  },
  {
    subjectName: "Civic Education",
    subjectCode: "CVE",
    classes: "SS1_SCI,SS2_SCI,SS3_SCI",
    studentsOffering: "12",
    level: "Junior",
  },
  {
    subjectName: "Economics",
    subjectCode: "ECON",
    classes: "SS1_COM,SS2_COM,SS3_COM",
    studentsOffering: "12",
    level: "Senior",
  },
];
