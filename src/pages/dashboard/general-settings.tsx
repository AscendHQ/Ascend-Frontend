/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

import AccountSettingContainer from "@/components/layout/account-setting/container";

export default function AccountSettingGeneralSettings() {
  return (
    <AccountSettingContainer>
      <div className="mt-8">
        <AcademicTimeline />
        <AssessmentStyle />
        <TimetableSetting />
        <GradingStyle />
      </div>
    </AccountSettingContainer>
  );
}

interface CustomDropdownProps {
  options: string[];
  onChange: (selectedOption: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option); // You can pass the selected option value back to the parent component if needed.
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleToggle}
        className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        {selectedOption
          ? `Grade style: ${selectedOption.replace(" Standard", "")}`
          : "Grade style: Normal"}
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-lg">
          {options.map(option => (
            <li
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function AssessmentStyle() {
  return (
    <div className="flex justify-between gap-16 border-b-2 border-border-colour-light py-16">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Assessment style
        </h4>
        <p className="text-sm tracking-tight text-Text-meduim-emphasis">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="lg:min-w-full flex-1">
          <h4 className="block text-base font-medium text-Text-meduim-emphasis">
            Select an option
          </h4>
          <div className="flex gap-10">
            <div className="flex items-center">
              <input
                id="examination"
                type="checkbox"
                value=""
                name="examination"
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="examination"
                className="w-full py-4 ml-2 text-base font-medium text-Text-meduim-emphasis"
              >
                Examination
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="continuous_assessment"
                type="checkbox"
                value=""
                name="continuous_assessment"
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="continuous_assessment"
                className="w-full py-4 ml-2 text-base font-medium text-Text-meduim-emphasis"
              >
                Continuous assessment (CA)
              </label>
            </div>
          </div>
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="Examination_percentage_of_total_marks"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Examination percentage of total marks
          </label>
          <input
            type="text"
            id="Examination_percentage_of_total_marks"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="60"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="continuous_assessment_percentage_of_total_mark"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Continuous assessment percentage of total mark
          </label>
          <input
            type="text"
            id="continuous_assessment_percentage_of_total_mark"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="40"
            required
          />
        </div>
      </div>
    </div>
  );
}

function AcademicTimeline() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Academic timeline
        </h4>
        <p className="text-sm tracking-tight text-Text-meduim-emphasis">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="academic_year"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Academic Year
          </label>
          <select
            name="academic_year"
            id="academic_year"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="academic_session"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Academic session
          </label>
          <select
            name="academic_session"
            id="academic_session"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="2022/2023">2022/2023</option>
            <option value="2021/2022">2021/2022</option>
            <option value="2020/2021">2020/2021</option>
          </select>
        </div>

        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="current_term"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Current term
          </label>
          <select
            name="current_term"
            id="current_term"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="First term">First term</option>
            <option value="Second term">Second term</option>
            <option value="Third term">Third term</option>
          </select>
        </div>

        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="term_length"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Term length (in weeks)
          </label>
          <input
            type="text"
            id="term_length"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="1 week"
            required
          />
        </div>
      </div>
    </div>
  );
}
function TimetableSetting() {
  return (
    <div className="flex justify-between gap-16 border-b-2 border-border-colour-light py-16">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Timetable setting
        </h4>
        <p className="text-sm tracking-tight text-Text-meduim-emphasis">
          This will be displayed on your school timetable.
        </p>
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap gap-5">
          <div className="lg:min-w-full flex-1">
            <h4 className="block text-base font-medium text-Text-meduim-emphasis">
              Set a timeline for classes every week
            </h4>
          </div>
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="resumption_time"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Resumption time
            </label>
            <input
              type="time"
              id="resumption_time"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              // placeholder="8:00 AM"
              required
            />
          </div>
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="closing_time"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Closing time
            </label>
            <input
              type="time"
              id="closing_time"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-5 mt-10">
          <div className="lg:min-w-full flex-1">
            <h4 className="block text-base font-medium text-Text-meduim-emphasis">
              Set a timeline for break time every week
            </h4>
          </div>
          <div className="lg:min-w-full flex-1">
            <label
              htmlFor="number_of_breaks"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Number of breaks
            </label>
            <input
              type="text"
              id="number_of_breaks"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              placeholder="1"
              required
            />
          </div>
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="start_time"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Start time
            </label>
            <input
              type="time"
              id="start_time"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              // placeholder="8:00 AM"
              required
            />
          </div>
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="end_time"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              End time
            </label>
            <input
              type="time"
              id="end_time"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const Table = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="pl-6 pr-32 py-3">
              Grade
            </th>
            <th scope="col" className="px-6 py-3">
              From
            </th>
            <th scope="col" className="px-6 py-3">
              To
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              A
            </td>
            <td className="px-6 py-4">
              <input type="text" className="max-w-[100px]" />
            </td>
            <td className="px-6 py-4">
              <input type="text" className="max-w-[100px]" />
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              B
            </td>
            <td className="px-6 py-4">
              <input type="text" className="max-w-[100px]" />
            </td>
            <td className="px-6 py-4">
              <input type="text" className="max-w-[100px]" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
function GradingStyle() {
  const options = ["Normal Standard", "WAEC Standard"];
  const handleDropdownChange = (selectedOption: string) => {
    console.log("Selected Option:", selectedOption);
    // Perform any action based on the selected option.
  };
  return (
    <div className="flex justify-between gap-16 border-b-2 border-border-colour-light py-16">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">Grading style</h4>
        <p className="text-sm tracking-tight text-Text-meduim-emphasis">
          This will be used as metric in grading results.
        </p>
      </div>
      <div className="flex-1 space-y-5">
        <CustomDropdown options={options} onChange={handleDropdownChange} />
        <Table />
      </div>
    </div>
  );
}
