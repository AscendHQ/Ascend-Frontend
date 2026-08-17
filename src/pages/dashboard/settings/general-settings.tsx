/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon } from "@iconify/react";
import { notification } from "antd";
import React from "react";

import AccountSettingContainer from "@/components/layout/account-setting/container";
import { Spinner } from "@/components/ui/Loading";
import {
  useOrganization,
  useUpdateOrganization,
} from "@/templates/Settings/hooks";

export default function AccountSettingGeneralSettings() {
  return (
    <AccountSettingContainer headerTitle="Account Setting">
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
        className="border border-neutral-500 text-gray-800 flex font-semibold py-2 px-4 rounded-lg gap-1"
      >
        <span className="text-gray-700">Grade style: </span>
        {selectedOption
          ? ` ${selectedOption.replace(" Standard", "")}`
          : " Normal"}
        <Icon icon="mdi:chevron-down" fontSize={27} />
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
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="lg:min-w-full flex-1">
          <h4 className="block text-base font-medium text-gray-800">
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
                className="w-full py-4 ml-2 text-base font-medium text-gray-800"
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
                className="w-full py-4 ml-2 text-base font-medium text-gray-800"
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
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-gray-800 text-Text-high-emphasis"
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
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-gray-800 text-Text-high-emphasis"
            placeholder="40"
            required
          />
        </div>
      </div>
    </div>
  );
}

function AcademicTimeline() {
  const [api, contextHolder] = notification.useNotification();
  const { data: organization, isLoading } = useOrganization();
  const { updateOrganization, isUpdatingOrganization } =
    useUpdateOrganization(api);
  const [session, setSession] = React.useState("");
  const [term, setTerm] = React.useState<"1st Term" | "2nd Term" | "3rd Term">(
    "1st Term"
  );
  const [termLength, setTermLength] = React.useState(13);
  const [passMark, setPassMark] = React.useState(50);

  const sessions = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 7 }, (_, index) => {
      const year = currentYear + 2 - index;
      return `${year}/${year + 1}`;
    });
  }, []);

  React.useEffect(() => {
    const settings = organization?.academic_settings;
    if (settings) {
      setSession(settings.current_session);
      setTerm(settings.current_term);
      setTermLength(settings.term_length_weeks);
      setPassMark(settings.pass_mark);
    } else {
      const year = new Date().getFullYear();
      setSession(current => current || `${year}/${year + 1}`);
    }
  }, [organization]);

  const handleSave = () => {
    updateOrganization({
      academic_settings: {
        current_session: session,
        current_term: term,
        term_length_weeks: termLength,
        pass_mark: passMark,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 border-border-colour-light">
      {contextHolder}
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Academic timeline
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="academic_session"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Current academic session
          </label>
          <select
            name="academic_session"
            id="academic_session"
            value={session}
            onChange={event => setSession(event.target.value)}
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-gray-800 text-Text-high-emphasis"
          >
            {sessions.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
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
            value={term}
            onChange={event =>
              setTerm(
                event.target.value as "1st Term" | "2nd Term" | "3rd Term"
              )
            }
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-gray-800 text-Text-high-emphasis"
          >
            <option value="1st Term">1st Term</option>
            <option value="2nd Term">2nd Term</option>
            <option value="3rd Term">3rd Term</option>
          </select>
        </div>

        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="term_length"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Term length (weeks)
          </label>
          <input
            type="number"
            id="term_length"
            min={1}
            max={30}
            value={termLength}
            onChange={event => setTermLength(Number(event.target.value))}
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-gray-800 text-Text-high-emphasis"
          />
        </div>

        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="pass_mark"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Promotion pass mark (%)
          </label>
          <input
            type="number"
            id="pass_mark"
            min={0}
            max={100}
            value={passMark}
            onChange={event => setPassMark(Number(event.target.value))}
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-gray-800 text-Text-high-emphasis"
            required
          />
        </div>
        <div className="lg:min-w-full flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={isUpdatingOrganization || !session}
            className="rounded-lg bg-primary-purple-700 px-10 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {isUpdatingOrganization ? "Saving..." : "Save academic settings"}
          </button>
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
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your school timetable.
        </p>
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap gap-5">
          <div className="lg:min-w-full flex-1">
            <h4 className="block text-base font-medium text-gray-800">
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
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-gray-800 text-Text-high-emphasis"
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
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-gray-800 text-Text-high-emphasis"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-5 mt-10">
          <div className="lg:min-w-full flex-1">
            <h4 className="block text-base font-medium text-gray-800">
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
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-gray-800 text-Text-high-emphasis"
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
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-gray-800 text-Text-high-emphasis"
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
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-gray-800 text-Text-high-emphasis"
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
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase border-b border-grey-300 bg-gray-50 ">
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
          {["A", "B", "C", "D", "E", "F"].map(item => (
            <tr className="bg-white border-b " key={item}>
              <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                {item}
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  className="max-w-[100px] placeholder:text-Text-meduim-emphasis border border-grey-300"
                  placeholder="0.00"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  className="max-w-[100px] placeholder:text-Text-meduim-emphasis border border-grey-300"
                  placeholder="0.00"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
function GradingStyle() {
  const options = ["Normal Standard", "WAEC Standard"];

  const handleDropdownChange = (selectedOption: string) => {
    console.log("Selected Option:", selectedOption);
  };
  return (
    <div className="flex justify-between gap-16 border-b-2 border-border-colour-light py-16">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">Grading style</h4>
        <p className="text-sm tracking-tight text-gray-800">
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
