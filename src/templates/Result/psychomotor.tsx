export default function Psychomotor() {
  return (
    <div className="overflow-scroll w-full border rounded-md py-5">
      <table className="w-full">
        <thead>
          <tr>
            <th className="">Psychomotor</th>
            <th className="text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {["Obedience", "Neatness", "Politeness", "Dedication"].map(item => (
            <tr key={item}>
              <td className="text-center">{item}</td>
              <td className="pt-2 ">
                <select
                  name=""
                  id=""
                  className="p-2 bg-white border rounded-md"
                  // defaultValue={""}
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
