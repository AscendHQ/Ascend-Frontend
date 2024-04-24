/* eslint-disable sonarjs/no-duplicate-string */
export const hostelInfo = [
  {
    hostelName: "Hostel Lucille",
    staffName: "Johnny White",
    capacity: 961,
    numberOfStudents: 878,
    gender: 0,
    dateAdded: "12 May, 2023",
    classes: "Grade 4,Grade 5,Grade 6",
  },
  {
    hostelName: "Hostel Charles",
    staffName: "Curtis McCarthy",
    capacity: 680,
    numberOfStudents: 661,
    gender: 1,
    dateAdded: "12 May, 2023",
    classes: "Grade 3,Grade 4",
  },
  {
    hostelName: "Hostel Rosalie",
    staffName: "Mark Long",
    capacity: 378,
    numberOfStudents: 837,
    gender: 0,
    dateAdded: "12 May, 2023",
    classes: "Grade 4,Grade 5",
  },
  {
    hostelName: "Hostel Ollie",
    staffName: "William Lawson",
    capacity: 815,
    numberOfStudents: 551,
    gender: 0,
    dateAdded: "12 May, 2023",
    classes: "Grade 4,Grade 6",
  },
  {
    hostelName: "Hostel Sally",
    staffName: "Lina Larson",
    capacity: 820,
    numberOfStudents: 325,
    gender: 0,
    dateAdded: "12 May, 2023",
    classes: "Grade 3,Grade 4,Grade 5,Grade 6",
  },
  {
    hostelName: "Hostel Maurice",
    staffName: "Stella Shaw",
    capacity: 820,
    numberOfStudents: 325,
    gender: 0,
    dateAdded: "12 May, 2023",
    classes: "Grade 3,Grade 4,Grade 5,Grade 6",
  },
  {
    hostelName: "Hostel Francisco",
    staffName: "Leroy Dixon",
    capacity: 820,
    numberOfStudents: 325,
    gender: 0,
    dateAdded: "12 May, 2023",
    classes: "Grade 3,Grade 4,Grade 5,Grade 6",
  },
];

export const lessonInfo = [
  {
    staffName: "Fred Swanson",
    subject: "Use of English Language",
    class: "Grade 5",
    statusIsActive: 0,
  },
  {
    staffName: "Luella Wood",
    subject: "Mathematics",
    class: "Grade 7",
    statusIsActive: 0,
  },
  {
    staffName: "Jim Johnston",
    subject: "Chemistry",
    class: "Grade 7",
    statusIsActive: 0,
  },
  {
    staffName: "Lottie Brewer",
    subject: "Physics",
    class: "Grade 6",
    statusIsActive: 1,
  },
  {
    staffName: "Edwin Elliott",
    subject: "Biology",
    class: "Grade 5",
    statusIsActive: 1,
  },
  {
    staffName: "Charles Patterson",
    subject: "Civic Education",
    class: "Grade 5",
    statusIsActive: 2,
  },
  {
    staffName: "Calvin Brown",
    subject: "Further Mathematics",
    class: "Grade 7",
    statusIsActive: 1,
  },
];

export const payrollInfo = [
  {
    staffName: "Fred Swanson",
    class: "Grade 4",
    jobTitle: "Class Teacher",

    basicSalary: 32000,
    deductions: 3100,
    accountNumberDetails: "51121375105",
    bankAccountDetails: "Access Diamond Bank",
  },
  {
    staffName: "Luella Wood",
    class: "Grade 4",
    jobTitle: "Head Teacher",

    deductions: 2000,
    basicSalary: 24700,
    accountNumberDetails: "30357306841",
    bankAccountDetails: "Guarantee Trust Bank",
  },
  {
    staffName: "Jim Johnston",
    class: "Grade 4",
    jobTitle: "Class Teacher",
    deductions: 3600,
    basicSalary: 53700,

    accountNumberDetails: "50173652452",
    bankAccountDetails: "Access Bank",
  },
  {
    staffName: "Lottie Brewer",
    class: "Grade 4",
    deductions: 4800,
    basicSalary: 72700,
    jobTitle: "Class Teacher",

    accountNumberDetails: "47084389455",
    bankAccountDetails: "United Bank of Africa",
  },
  {
    staffName: "Edwin Elliott",
    class: "Grade 4",
    deductions: 4000,
    basicSalary: 78400,
    jobTitle: "Class Teacher",

    accountNumberDetails: "78735530203",
    bankAccountDetails: "Union Bank",
  },
  {
    staffName: "Charles Patterson",
    basicSalary: 21800,
    class: "Grade 4",
    deductions: 4300,
    jobTitle: "Class Teacher",

    accountNumberDetails: "52255181577",
    bankAccountDetails: "Polaris Bank",
  },
  {
    staffName: "Calvin Brown",
    class: "Grade 4",
    basicSalary: 36300,
    deductions: 900,
    jobTitle: "Class Teacher",

    accountNumberDetails: "68030027884",
    bankAccountDetails: "First Bank",
  },
];

export const resultInfo = [
  {
    studentName: "Fred Swanson",
    class: "Grade 4",
    statusIsActive: 0,
  },
  {
    studentName: "Luella Wood",
    class: "Grade 4",
    statusIsActive: 0,
  },
  {
    studentName: "Jim Johnston",
    class: "Grade 4",
    statusIsActive: 0,
  },
  {
    studentName: "Lottie Brewer",
    class: "Grade 4",
    statusIsActive: 1,
  },
  {
    studentName: "Edwin Elliott",
    class: "Grade 4",
    statusIsActive: 1,
  },
  {
    studentName: "Charles Patterson",
    class: "Grade 4",
    statusIsActive: 2,
  },
  {
    studentName: "Calvin Brown",
    class: "Grade 4",
    statusIsActive: 1,
  },
];

export const roleInfo = [
  {
    roleName: "Admin",
    description:
      "This user has access to all functions and is usually the creator of the school account.",
    numberOfStaff: 2,
    class: "Grade 4",
    jobTitle: "Class Teacher",
    basicSalary: 32000,
    deductions: 3100,
    accountNumberDetails: "51121375105",
    bankAccountDetails: "Access Diamond Bank",
  },
  {
    roleName: "Staff",
    class: "Grade 4",
    jobTitle: "Head Teacher",
    numberOfStaff: 2,
    description:
      "This user has access to all functions and is usually the creator of the school account.",
    deductions: 2000,
    basicSalary: 24700,
    accountNumberDetails: "30357306841",
    bankAccountDetails: "Guarantee Trust Bank",
  },
  {
    roleName: "Bursary",
    numberOfStaff: 2,
    class: "Grade 4",
    jobTitle: "Class Teacher",
    deductions: 3600,
    basicSalary: 53700,
    description:
      "This user has access to all functions and is usually the creator of the school account.",
    accountNumberDetails: "50173652452",
    bankAccountDetails: "Access Bank",
  },
];
