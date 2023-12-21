export type studentInfoProp = {
  regNo: string;
  studentName: string;
  class: string;
  gender: "female" | "male";
  guardianInfo: string;
};
export const studentInfo: studentInfoProp[] = [
  {
    regNo: "FWOAU",
    studentName: "Dapo Odunayo",
    class: "JSS2A",
    gender: "male",
    guardianInfo: "Mr. Odunayo Kelvin",
  },
  {
    regNo: "GnL7",
    studentName: "Tobi idowu",
    class: "JSS1C",
    gender: "female",
    guardianInfo: "Mrs. Idowu Christiana",
  },
  {
    regNo: "dPeKmB",
    studentName: "Cynthia Okechukwu",
    class: "JSS1A",
    gender: "female",
    guardianInfo: "Mr. Okechukwu Mike",
  },
  {
    regNo: "fngtQJ",
    studentName: "Adam Ogunneye",
    class: "SS2B",
    gender: "male",
    guardianInfo: "Mrs. Ogunneye Allie",
  },
  {
    regNo: "14LfnH",
    studentName: "Hilda Balci",
    class: "SS3A",
    gender: "female",
    guardianInfo: "Mrs. Balci Vera",
  },
  {
    regNo: "PBdsL",
    studentName: "Larry Bakare",
    class: "SS3A",
    gender: "male",
    guardianInfo: "Mr. Bakare Wayne",
  },
  {
    regNo: "Aw5zX",
    studentName: "Isaac Koko",
    class: "SS1B",
    gender: "male",
    guardianInfo: "Mrs. Ajanaku Maria",
  },
];
