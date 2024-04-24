/* eslint-disable sonarjs/no-duplicate-string */
export type subjectLevelType = "all" | "junior" | "senior";

export type subjectInfoProp = {
  _id: string;
  name: string;
  code: string;
  type: string;
  classes: { _id: string; name: string }[];
  level: Exclude<subjectLevelType, "all">;
};

/* 
{
  "_id":"65956618ea4a8bcecc8d3cbc",
  "organization":"653978e6277a07a04af91983",
  "name":"Music",
  "code":"MSC",
  "type":"core",
  "level":"junior",
  "classes":[{"_id":"659528ba318e3ed72b91decd","name":"JSS 1A"}],
}
*/

// export const subjectInfo: subjectInfoProp[] = [
//   {
//     subjectName: "Physics",
//     subjectCode: "PHY",
//     classes: "SS1_SCI,SS2_SCI,SS3_SCI",
//     studentsOffering: "12",
//     level: "senior",
//   },
//   {
//     subjectName: "Chemistry",
//     subjectCode: "CHEM",
//     classes: "SS1_SCI,SS2_SCI,SS3_SCI",
//     studentsOffering: "12",
//     level: "senior",
//   },
//   {
//     subjectName: "Biology",
//     subjectCode: "BIO",
//     classes: "SS1_SCI,SS2_SCI,SS3_SCI",
//     studentsOffering: "12",
//     level: "senior",
//   },
//   {
//     subjectName: "Further Mathematics",
//     subjectCode: "FMATH",
//     classes: "SS1_SCI,SS2_SCI,SS3_SCI",
//     studentsOffering: "12",
//     level: "senior",
//   },
//   {
//     subjectName: "English Language",
//     subjectCode: "ENG",
//     classes: "JSS1,JSS2,JSS3,SS1_SCI,SS2_SCI,SS3_SCI",
//     studentsOffering: "12",
//     level: "junior",
//   },
//   {
//     subjectName: "Civic Education",
//     subjectCode: "CVE",
//     classes: "SS1_SCI,SS2_SCI,SS3_SCI",
//     studentsOffering: "12",
//     level: "junior",
//   },
//   {
//     subjectName: "Economics",
//     subjectCode: "ECON",
//     classes: "SS1_COM,SS2_COM,SS3_COM",
//     studentsOffering: "12",
//     level: "senior",
//   },
// ];
