import { SubjectOption } from "./hooks";

export type SubjectScores = Record<
  string,
  { mid_term_test: string; ca_score: string; exam_score: string }
>;

export default function AddNewResultTable({
  subjects,
  scores,
  onChange,
}: {
  subjects: SubjectOption[];
  scores: SubjectScores;
  onChange: (
    subjectId: string,
    field: "mid_term_test" | "ca_score" | "exam_score",
    value: string
  ) => void;
}) {
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
          </tr>
        </thead>
        <tbody>
          {subjects.map(subject => {
            const row = scores[subject._id] ?? {
              mid_term_test: "",
              ca_score: "",
              exam_score: "",
            };
            return (
              <tr className="bg-white border-b " key={subject._id}>
                <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                  {subject.name}
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={row.mid_term_test}
                    onChange={e =>
                      onChange(subject._id, "mid_term_test", e.target.value)
                    }
                    className="max-w-[100px] placeholder:text-Text-meduim-emphasis border border-grey-300"
                    placeholder="0.00"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={row.ca_score}
                    onChange={e =>
                      onChange(subject._id, "ca_score", e.target.value)
                    }
                    className="max-w-[100px] placeholder:text-Text-meduim-emphasis border border-grey-300"
                    placeholder="0.00"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={row.exam_score}
                    onChange={e =>
                      onChange(subject._id, "exam_score", e.target.value)
                    }
                    className="max-w-[100px] placeholder:text-Text-meduim-emphasis border border-grey-300"
                    placeholder="0.00"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
