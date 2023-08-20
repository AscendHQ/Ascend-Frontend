/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";

export default function SubjectPerformance() {
  return (
    <div className="bg-white py-4 rounded-lg grid px-6 flex-1 border border-border-colour-light">
      <div className="flex justify-between items-center gap-5">
        <div className="">
          <h3 className="text-Text-high-emphasis text-lg font-semibold ">
            Subject Performance
          </h3>
          <p className="text-sm text-gray-800">
            This is a performance stats for all subjects
          </p>
        </div>
        <select
          id="term"
          className="text-sm rounded-lg p-3 bg-white border"
          defaultValue={"First Term"}
        >
          <option value="Third Term">Third Term</option>
          <option value="First Term">First Term</option>
          <option value="Second Term">Second Term</option>
        </select>
      </div>
      <div className="max-h-64 overflow-scroll pr-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="mt-6" key={i}>
            <div className="flex justify-between">
              <h4 className="text-Text-high-emphasis text-sm">Mathematics</h4>
              <p className="text-Text-high-emphasis text-sm">93,382</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3 dark:bg-gray-700">
              <div
                className="bg-primary-purple-600 h-2.5 rounded-full"
                style={{ width: `75%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <button className="text-gray-800 font-semibold gap-4 flex items-center pt-2">
        <span>SEE ALL SUBJECTS</span>
        <Icon icon="material-symbols:arrow-forward-ios" />
      </button>
    </div>
  );
}
