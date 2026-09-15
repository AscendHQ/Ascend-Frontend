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
    <div className="overflow-x-auto rounded-lg border border-border-colour-light sm:col-span-2">
      <table className="w-full min-w-[620px] text-left text-sm text-Text-meduim-emphasis">
        <thead className="border-b border-border-colour-light bg-neutral-300 text-xs uppercase text-Text-high-emphasis">
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
              <tr
                className="border-b border-border-colour-light bg-white last:border-0"
                key={subject._id}
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-Text-high-emphasis">
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
                    className="w-24 rounded-lg border border-border-colour-light px-3 py-2 placeholder:text-Text-meduim-emphasis outline-none focus:border-primary-purple-700"
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
                    className="w-24 rounded-lg border border-border-colour-light px-3 py-2 placeholder:text-Text-meduim-emphasis outline-none focus:border-primary-purple-700"
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
                    className="w-24 rounded-lg border border-border-colour-light px-3 py-2 placeholder:text-Text-meduim-emphasis outline-none focus:border-primary-purple-700"
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
