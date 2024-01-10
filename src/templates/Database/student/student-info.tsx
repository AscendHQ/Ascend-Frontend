// export type studentInfoProp = {
//   registration_number: string;
//   first_name: string;
//   middle_name: string;
//   last_name: string;
//   class: string;
//   gender: "female" | "male";
//   guardianInfo: string;
// };

type PersonalInformation = {
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: "female" | "male";
  dob: string;
  religion: string;
  nationality: string;
};

type ContactInformation = {
  residential_address: string;
  contact_number: string;
};

type GuardianInformation = {
  first_name: string;
  last_name: string;
  relationship_with_student: string;
  contact_number: string;
  email: string;
};

type Class = {
  _id: string;
  name: string;
};

type AcademicDetails = {
  class: Class;
  previous_school: string;
};

type Accommodation = {
  hostel: string;
  block: string;
  room: string;
};

type MedicalInformation = {
  allergies: string;
  emergency_contact: string;
  medication: string;
};

type AdditionalInformation = {
  disabilities: string;
  nature_of_disability: string;
  medication: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type studentInfoProp = {
  personal_information: PersonalInformation;
  contact_information: ContactInformation;
  guardian_information: GuardianInformation;
  academic_details: AcademicDetails;
  accommodation: Accommodation;
  medical_information: MedicalInformation;
  additional_information: AdditionalInformation;
  _id: string;
  registration_number: string;
  organization: string;
  is_active: boolean;
  is_deleted: boolean;
};

/* 

{
  "personal_information": 
  {
    "first_name":"Pelumi",
    "middle_name":"",
    "last_name":"Kayode",
    "gender":"female",
    "dob":"2002-05-19T00:00:00.000Z",
    "religion":"christain",
    "nationality":"Nigeria"
  },
  "contact_information":
  {
    "residential_address":"No 5, Oluwaseun street, Apatapiti, FUTA South Gate, Akure, Ondo State","contact_number":"+23470234576"},
    "guardian_information":{"first_name":"Fakorede","last_name":"Fatomiwa","relationship_with_student":"father","contact_number":"+23470234576","email":"fa_fatomiwa@gmail.com"},"academic_details":{"class":{"_id":"659528ba318e3ed72b91decd","name":"JSS 1A"},"previous_school":""},"accommodation":{"hostel":"64e27df6ef6d500c306117f2","block":"block c","room":"A"},"medical_information":{"allergies":"cold","emergency_contact":"+23470234576","medication":"hot water"},"additional_information":{"disabilities":"","nature_of_disability":"","medication":""},"_id":"6595a078f7c5fdeeb1852fbe","registration_number":"AAP240002","organization":"653978e6277a07a04af91983","is_active":true,"is_deleted":false,"createdAt":"2024-01-03T17:59:20.481Z","updatedAt":"2024-01-03T17:59:20.481Z",}

*/
// export const studentInfo: studentInfoProp[] = [
//   {
//     regNo: "FWOAU",
//     studentName: "Dapo Odunayo",
//     class: "JSS2A",
//     gender: "male",
//     guardianInfo: "Mr. Odunayo Kelvin",
//   },
//   {
//     regNo: "GnL7",
//     studentName: "Tobi idowu",
//     class: "JSS1C",
//     gender: "female",
//     guardianInfo: "Mrs. Idowu Christiana",
//   },
//   {
//     regNo: "dPeKmB",
//     studentName: "Cynthia Okechukwu",
//     class: "JSS1A",
//     gender: "female",
//     guardianInfo: "Mr. Okechukwu Mike",
//   },
//   {
//     regNo: "fngtQJ",
//     studentName: "Adam Ogunneye",
//     class: "SS2B",
//     gender: "male",
//     guardianInfo: "Mrs. Ogunneye Allie",
//   },
//   {
//     regNo: "14LfnH",
//     studentName: "Hilda Balci",
//     class: "SS3A",
//     gender: "female",
//     guardianInfo: "Mrs. Balci Vera",
//   },
//   {
//     regNo: "PBdsL",
//     studentName: "Larry Bakare",
//     class: "SS3A",
//     gender: "male",
//     guardianInfo: "Mr. Bakare Wayne",
//   },
//   {
//     regNo: "Aw5zX",
//     studentName: "Isaac Koko",
//     class: "SS1B",
//     gender: "male",
//     guardianInfo: "Mrs. Ajanaku Maria",
//   },
// ];
