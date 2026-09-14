import type { CbtQuestionInput } from "@/types/cbt";

const HEADERS = [
  "question",
  "option_a",
  "option_b",
  "option_c",
  "option_d",
  "option_e",
  "option_f",
  "correct_option",
  "marks",
] as const;

const TEMPLATE_ROWS = [
  ["What is 2 + 2?", "2", "3", "4", "5", "", "", "C", "1"],
  [
    "What is the capital of Nigeria?",
    "Lagos",
    "Abuja",
    "Kano",
    "Ibadan",
    "",
    "",
    "B",
    "1",
  ],
];

const escapeCell = (value: string) => `"${value.replace(/"/g, '""')}"`;

export const downloadCbtQuestionTemplate = () => {
  const content = [HEADERS, ...TEMPLATE_ROWS]
    .map(row => row.map(value => escapeCell(String(value))).join(","))
    .join("\r\n");
  const url = URL.createObjectURL(
    new Blob([`\uFEFF${content}\r\n`], { type: "text/csv;charset=utf-8" })
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "ascend-cbt-question-template.csv";
  anchor.click();
  URL.revokeObjectURL(url);
};

const addCell = (row: string[], cell: string) => {
  row.push(cell.trim());
  return "";
};

const addRow = (rows: string[][], row: string[]) => {
  if (row.some(Boolean)) rows.push(row);
  return [] as string[];
};

export const parseCsv = (input: string) => {
  const text = input.replace(/^\uFEFF/, "");
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted && character === '"' && text[index + 1] === '"') {
      cell += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (!quoted && character === ",") {
      cell = addCell(row, cell);
    } else if (!quoted && character === "\n") {
      cell = addCell(row, cell);
      row = addRow(rows, row);
    } else if (character !== "\r") {
      cell += character;
    }
  }
  cell = addCell(row, cell);
  addRow(rows, row);
  if (quoted) throw new Error("The CSV contains an unclosed quotation mark.");
  return rows;
};

const normalizeHeader = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");

const validateHeaders = (headerRow: string[]) => {
  const headers = headerRow.map(normalizeHeader);
  const missing = HEADERS.filter(header => !headers.includes(header));
  if (missing.length) {
    throw new Error(`Missing column(s): ${missing.join(", ")}.`);
  }
  return headers;
};

const questionFromRow = (
  row: string[],
  headers: string[],
  rowNumber: number
): CbtQuestionInput => {
  const value = (header: string) => row[headers.indexOf(header)]?.trim() ?? "";
  const prompt = value("question");
  const optionValues = ["a", "b", "c", "d", "e", "f"].map(letter =>
    value(`option_${letter}`)
  );
  const lastOption = optionValues.reduce(
    (last, option, index) => (option ? index : last),
    -1
  );
  const options = optionValues.slice(0, lastOption + 1);
  const answerLetter = value("correct_option").toUpperCase();
  const correctOption = answerLetter.charCodeAt(0) - 65;
  const marks = value("marks") ? Number(value("marks")) : 1;

  if (!prompt) throw new Error(`Row ${rowNumber}: question is required.`);
  if (options.length < 2 || options.some(option => !option)) {
    throw new Error(
      `Row ${rowNumber}: provide at least options A and B without gaps.`
    );
  }
  if (
    new Set(options.map(option => option.toLowerCase())).size !== options.length
  ) {
    throw new Error(`Row ${rowNumber}: answer options must be different.`);
  }
  if (!/^[A-F]$/.test(answerLetter) || correctOption >= options.length) {
    throw new Error(
      `Row ${rowNumber}: correct_option must be the letter of a completed option.`
    );
  }
  if (!Number.isFinite(marks) || marks < 1) {
    throw new Error(`Row ${rowNumber}: marks must be 1 or more.`);
  }
  return { prompt, options, correct_option: correctOption, marks };
};

export const parseCbtQuestionCsv = (content: string) => {
  const rows = parseCsv(content);
  if (rows.length < 2)
    throw new Error("The CSV does not contain any questions.");
  const headers = validateHeaders(rows[0]);
  const questions = rows
    .slice(1)
    .filter(row => row.some(value => value.trim()))
    .map((row, index) => questionFromRow(row, headers, index + 2));
  if (!questions.length)
    throw new Error("The CSV does not contain any questions.");
  return questions;
};
