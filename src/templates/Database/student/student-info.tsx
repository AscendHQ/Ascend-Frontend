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
