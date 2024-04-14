export default function AddNewResultTable() {
  return (
    <div className="overflow-scroll shadow-md sm:rounded-lg w-full">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase border-b border-grey-300 bg-gray-50 ">
          <tr>
            <th scope="col" className="pl-6 pr-3 py-3">
              Subject
            </th>
            <th scope="col" className="px-6 py-3">
              Mid-Term test
            </th>
            <th scope="col" className="px-6 py-3">
              CA Score
            </th>
            <th scope="col" className="px-6 py-3">
              Exam score
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Grade
            </th> */}
          </tr>
        </thead>
        <tbody>
          {[
            "General Mathematics",
            "Use of English Language",
            "Chemistry",
            "Further Mathematics",
            "Biology",
            "Physics",
            "Economics",
            "Civic Education",
            "Data Processing",
          ].map(item => (
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
              <td className="px-6 py-4">
                <input
                  type="text"
                  className="max-w-[100px] placeholder:text-Text-meduim-emphasis border border-grey-300"
                  placeholder="0.00"
                />
              </td>
              {/* <td className="px-6 py-4">
                <span>N/A</span>
              </td>
              <td className="px-6 py-4">
                <span>N/A</span>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
