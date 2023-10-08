/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

/* eslint-disable react/display-name */
type ComponentToPrintProps = {
  text: string;
};

const ComponentToPrint = React.forwardRef(
  (props: ComponentToPrintProps, ref: React.Ref<HTMLDivElement>) => {
    // const { text } = props;
    const rowStyle =
      "text-center [&>td]:border [&>td]:border-black border-collapse";
    return (
      <div className="relativeCSS p-4" ref={ref}>
        <style type="text/css" media="print">
          {
            "\
            @page { size: landscape; overflow: scroll;}\
            "
          }
        </style>
        <section className="border-3 border-black">
          <div className=" p-2 flex">
            <Image
              src="/Ascend-Logo.svg"
              alt="Ascend Logo"
              width={100}
              height={24}
              priority
            />
            <div className="text-center flex justify-center items-center flex-col bg-primary-purple-500 mx-10 text-white flex-[3] gap-1 p-3 rounded-sm">
              <h1 className="text-2xl max-w-xs font-semibold uppercase">
                Ascend Secondary School, Iwo, Osun State
              </h1>
              <p className="font-GTWalsheimPro italic">
                Education for Empowerment
              </p>
            </div>
            <div className="p-2 border-2 border-primary-purple-800 rounded-sm">
              <Image
                src="/aremu-student.jpeg"
                alt="aremu-student"
                width={100}
                height={24}
                priority
                className="rounded-sm"
              />
            </div>
          </div>
          <h2 className="text-center text-3xl uppercase font-bold">
            Report Card
          </h2>
        </section>
        <main>
          <div>
            <div className="grid grid-cols-5 border-collapse uppercase font-semibold">
              <div className="col-span-2 border border-black p-2 ">
                <span>NAME OF STUDENT : </span>
                <span>Oluwagbamila Aremu</span>
              </div>
              <div className="col-span-2 border border-black p-2">
                <span>ADMISSION NO : </span>
                <span>AS/2018/9356</span>
              </div>
              <div className="border border-black p-2">
                <span>CLASS : </span>
                <span>SS2A</span>
              </div>
            </div>
            <div className="grid grid-cols-5 border-collapse font-semibold">
              <div className="col-span-2 border border-black p-2 ">
                <span>SESSION : </span>
                <span>2022/2023</span>
              </div>
              <div className="col-span-2 border border-black p-2">
                <span>TERM : </span>
                <span>Third Term</span>
              </div>
              <div className="border border-black p-2">
                <span>STATUS : </span>
                <span>Passed</span>
              </div>
            </div>
            <div className="grid grid-cols-10 border-collapse font-semibold">
              <div className="col-span-2 border border-black p-2 ">
                <span>NUMBER IN CLASS : </span>
                <span>34</span>
              </div>
              <div className="col-span-3 border border-black p-2">
                <span>TOTAL MARKS OBTAINABLE : </span>
                <span>1800</span>
              </div>
              <div className="col-span-3 border border-black p-2">
                <span>TOTAL MARKS OBTAINED : </span>
                <span>1517</span>
              </div>

              <div className="col-span-2 border border-black p-2">
                <span>POSITION : </span>
                <span>
                  2<sup>nd</sup>
                </span>
              </div>
            </div>
          </div>
          <table className="w-full border border-black">
            <thead>
              <tr className="[&>th]:border [&>th]:border-black border-collapse">
                <th className="w-72">Subjects</th>
                <th>1st CA</th>
                <th>2nd CA</th>
                <th>3rd CA</th>
                <th>Exam</th>
                <th>Total</th>
                <th>Grade</th>
                <th className="w-40">Subject Position</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              <tr className={rowStyle}>
                <td>English Language</td>
                <td>8</td>
                <td>9</td>
                <td>9</td>
                <td>42</td>
                <td>68</td>
                <td>C5</td>
                <td>13</td>
                <td>Credit</td>
              </tr>
              <tr className={rowStyle}>
                <td>Mathematics</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>49</td>
                <td>79</td>
                <td>B3</td>
                <td>10</td>
                <td>Distinction</td>
              </tr>
              <tr className={rowStyle}>
                <td>Computer Science</td>
                <td>4</td>
                <td>4</td>
                <td>5</td>
                <td>33</td>
                <td>46</td>
                <td>F9</td>
                <td>20</td>
                <td>Fail</td>
              </tr>
              <tr className={rowStyle}>
                <td>Civic Education</td>
                <td>8</td>
                <td>9</td>
                <td>9</td>
                <td>42</td>
                <td>68</td>
                <td>C5</td>
                <td>13</td>
                <td>Credit</td>
              </tr>
              <tr className={rowStyle}>
                <td>Biology</td>
                <td>8</td>
                <td>9</td>
                <td>9</td>
                <td>42</td>
                <td>68</td>
                <td>C5</td>
                <td>13</td>
                <td>Credit</td>
              </tr>
              <tr className={rowStyle}>
                <td>Chemistry</td>
                <td>8</td>
                <td>9</td>
                <td>9</td>
                <td>42</td>
                <td>68</td>
                <td>C5</td>
                <td>13</td>
                <td>Credit</td>
              </tr>
              <tr className={rowStyle}>
                <td>Physics</td>
                <td>8</td>
                <td>9</td>
                <td>9</td>
                <td>42</td>
                <td>68</td>
                <td>C5</td>
                <td>13</td>
                <td>Credit</td>
              </tr>
              <tr className={rowStyle}>
                <td>Agricultural Science</td>
                <td>8</td>
                <td>9</td>
                <td>9</td>
                <td>42</td>
                <td>68</td>
                <td>C5</td>
                <td>13</td>
                <td>Credit</td>
              </tr>
              <tr className={rowStyle}>
                <td>Animal Husbandry</td>
                <td>8</td>
                <td>9</td>
                <td>9</td>
                <td>42</td>
                <td>68</td>
                <td>C5</td>
                <td>13</td>
                <td>Credit</td>
              </tr>
              <tr className={rowStyle}>
                <td>Christian Religious Studies</td>
                <td>8</td>
                <td>9</td>
                <td>9</td>
                <td>42</td>
                <td>68</td>
                <td>C5</td>
                <td>13</td>
                <td>Credit</td>
              </tr>
            </tbody>
          </table>
        </main>
        <div className="flex gap-2 mt-5">
          <table>
            <tbody>
              <tr className={rowStyle}>
                <td className="w-1/3">Class Teacher Remarks :</td>
                <td>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                  nemo repellendus nam, magnam sapiente ut ducimus? Quae, esse!
                </td>
              </tr>

              <tr className={rowStyle}>
                <td>Vacation Date :</td>
                <td>15th July, 2024</td>
              </tr>
              <tr className={rowStyle}>
                <td>Resumption Date :</td>
                <td>17th Sept, 2024</td>
              </tr>
            </tbody>
          </table>
          <table className="w-2/6">
            <thead>
              <tr className="[&>th]:border [&>th]:border-black border-collapse">
                <th>PSYCHOMOTOR</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr className={rowStyle}>
                <td>Handwriting</td>
                <td>A</td>
              </tr>
              <tr className={rowStyle}>
                <td>Games/Sports</td>
                <td>B</td>
              </tr>
              <tr className={rowStyle}>
                <td>Drawing And Painting</td>
                <td>D</td>
              </tr>
              <tr className={rowStyle}>
                <td>Craft</td>
                <td>B</td>
              </tr>
              <tr className={rowStyle}>
                <td>Musical Skill</td>
                <td>E</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex gap-2 mt-5">
          <table className="flex-1">
            <thead>
              <tr className="[&>th]:border [&>th]:border-black border-collapse">
                <th>AFFECTIVE</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr className={rowStyle}>
                <td>Punctuality</td>
                <td>C</td>
              </tr>
              <tr className={rowStyle}>
                <td>Attendance</td>
                <td>B</td>
              </tr>
              <tr className={rowStyle}>
                <td>Politeness</td>
                <td>C</td>
              </tr>
              <tr className={rowStyle}>
                <td>Neatness</td>
                <td>B</td>
              </tr>
              <tr className={rowStyle}>
                <td>Communication</td>
                <td>A</td>
              </tr>
              <tr className={rowStyle}>
                <td>Honesty</td>
                <td>B</td>
              </tr>
              <tr className={rowStyle}>
                <td>Obedience</td>
                <td>B</td>
              </tr>
              <tr className={rowStyle}>
                <td>Attentiveness</td>
                <td>B</td>
              </tr>
            </tbody>
          </table>
          <table className="flex-1">
            <thead>
              <tr className="[&>th]:border [&>th]:border-black border-collapse">
                <th>Key to rating</th>
                <th className="w-20"></th>
              </tr>
            </thead>
            <tbody>
              <tr className={rowStyle}>
                <td>Maintains an excellent degree of observable traits</td>
                <td>A</td>
              </tr>
              <tr className={rowStyle}>
                <td>Maintains High level of observable traits</td>
                <td>B</td>
              </tr>
              <tr className={rowStyle}>
                <td>Maintains Acceptable level of observable traits</td>
                <td>C</td>
              </tr>
              <tr className={rowStyle}>
                <td>Shows minimal regard for observable traits</td>
                <td>D</td>
              </tr>
              <tr className={rowStyle}>
                <td>No regards for observable traits</td>
                <td>E</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex gap-8 mt-5">
          <div className="flex-1">
            <h4 className="text-center text-2xl mb-2">Grading</h4>
            <table className="w-full">
              <thead>
                <tr className="[&>th]:border [&>th]:border-black border-collapse">
                  <th>Score</th>
                  <th>Grade&Remark</th>
                </tr>
              </thead>
              <tbody>
                <tr className={rowStyle}>
                  <td>100 - 70</td>
                  <td>A (Excellent)</td>
                </tr>
                <tr className={rowStyle}>
                  <td>69 - 60</td>
                  <td>B (Very Good)</td>
                </tr>
                <tr className={rowStyle}>
                  <td>59 - 50</td>
                  <td>C (Good)</td>
                </tr>
                <tr className={rowStyle}>
                  <td>49 - 45</td>
                  <td>D (Satisfactory)</td>
                </tr>
                <tr className={rowStyle}>
                  <td>44 - 40</td>
                  <td>E (Pass)</td>
                </tr>
                <tr className={rowStyle}>
                  <td>39 - 0</td>
                  <td>F (Fail)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex-1 flex gap-8 items-center justify-center">
            <div className="flex-1 text-center">
              <h4>Class teacher Signature</h4>
              <span className="border-b-2 border-black border-dashed h-24 block">
                <img
                  src="https://static.cdn.wisestamp.com/wp-content/uploads/2020/08/Oprah-Winfrey-Signature-1.png"
                  alt="Oprah-Winfrey-Signature"
                  className="w-40 mx-auto block"
                />
              </span>
            </div>
            <div className="flex-1 text-center">
              <h4>Principal Signature</h4>
              <span className="border-b-2 border-black border-dashed h-24 block">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/023/264/092/small/fake-hand-drawn-autographs-set-handwritten-signature-scribble-for-business-certificate-or-letter-isolated-illustration-vector.jpg"
                  alt="Oprah-Winfrey-Signature"
                  className="w-40 mx-auto block"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ComponentToPrint;
