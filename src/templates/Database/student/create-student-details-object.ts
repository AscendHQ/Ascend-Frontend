import { formatDateToYYYYMMDD } from "@/pages/dashboard/database/students/[studentInfo]";

import { studentInfoProp } from "./student-info";

export const createStudentDetailsObject = (
  details: (studentInfoProp & { fullname: string }) | null
) => {
  if (!details) return {};

  return {
    "Full Name": details.fullname,
    "Registration Number": details.registration_number,
    Gender: details.personal_information?.gender,
    "Date of Birth": formatDateToYYYYMMDD(
      details.personal_information?.dob || ""
    ),
    "Contact Number": details.contact_information?.contact_number,
    "Residential Address": details.contact_information?.residential_address,
    Religion: details.personal_information?.religion,
    "Guardian's Name": `${details.guardian_information?.first_name} ${details.guardian_information?.last_name}`,
    "Guardian's Relationship":
      details.guardian_information?.relationship_with_student,
    "Guardian's Contact Number": details.guardian_information?.contact_number,
    "Guardian's Email Address": details.guardian_information?.email,
    Allergies: details.medical_information?.allergies,
    Medication: details.medical_information?.medication,
    "Medical Emergency Contact": details.medical_information?.emergency_contact,
    "Student Block": details.accommodation?.block,
    "Student Hostel": details.accommodation?.hostel,
    "Student Room": details.accommodation?.room,
    Disability: details.additional_information?.disabilities,
    "Nature of Disability":
      details.additional_information?.nature_of_disability,
  };
};
