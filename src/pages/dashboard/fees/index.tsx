import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import Link from "next/link";
import React from "react";

import { axiosInstance } from "@/api";
import FinancialOverview from "@/components/fees/financial-overview";
import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import { DASHBOARD_FEE_INVOICE } from "@/config/links";
import { classInfoProp } from "@/templates/Database/class/class-types";
import { useOrganization } from "@/templates/Settings/hooks";
import { InvoiceListResponse } from "@/types/fees";

import { useFetchClassInfo } from "../database/classes";

type EditableFeeItem = { id: string; label: string; amount: string };
type FeeStructureSummary = {
  _id: string;
  name: string;
  class: classInfoProp | string;
  total_amount: number;
  due_date: string;
  invoice_count: number;
};

const TERMS = ["1st Term", "2nd Term", "3rd Term"];
const STATUS_OPTIONS = ["all", "unpaid", "partial", "paid", "overdue"];
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(amount);

const getClassLabel = (classInfo: classInfoProp) => {
  const section =
    classInfo.level === "junior" ? classInfo.other_section : classInfo.section;
  return section ? `${classInfo.name} - ${section}` : classInfo.name;
};

const getStudentName = (student: InvoiceListResponse["invoices"][number]["student"]) => {
  if (typeof student === "string") return "Student";
  return [
    student.personal_information.first_name,
    student.personal_information.middle_name,
    student.personal_information.last_name,
  ]
    .filter(Boolean)
    .join(" ");
};

function FeeStructureList({ structures }: { structures?: FeeStructureSummary[] }) {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (structureId: string) =>
      axiosInstance
        .post(`/fees/structures/${structureId}/generate-invoices`)
        .then(response => response.data as { invoices_created: number }),
    onSuccess: response => {
      api.success({
        message: "Invoices synchronized",
        description:
          response.invoices_created === 0
            ? "Every eligible student already has this invoice."
            : `${response.invoices_created} missing invoice(s) were generated.`,
      });
      queryClient.invalidateQueries({ queryKey: ["feeInvoices"] });
      queryClient.invalidateQueries({ queryKey: ["feeStructures"] });
    },
    onError: (error: Error & { response?: { data?: string } }) => {
      api.error({
        message: "Invoices could not be synchronized",
        description: error.response?.data ?? error.message,
      });
    },
  });

  if (!structures?.length) return null;
  return (
    <section className="mt-6 rounded-lg border bg-white p-5">
      {contextHolder}
      <h2 className="text-lg font-semibold">Fee structures</h2>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {structures.map(structure => (
          <div key={structure._id} className="flex items-center justify-between gap-4 rounded-lg border p-4">
            <div>
              <p className="font-semibold">{structure.name}</p>
              <p className="text-sm text-gray-800">
                {typeof structure.class === "string" ? "Class" : getClassLabel(structure.class)} · {formatCurrency(structure.total_amount)}
              </p>
              <p className="text-xs text-gray-800">
                {structure.invoice_count} invoice(s) · Due {new Date(structure.due_date).toLocaleDateString("en-NG")}
              </p>
            </div>
            <button
              type="button"
              disabled={mutation.isPending}
              onClick={() => mutation.mutate(structure._id)}
              className="whitespace-nowrap rounded border px-3 py-2 text-sm font-semibold text-primary-purple-700 disabled:opacity-50"
            >
              Generate missing
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function CreateFeeStructure({
  classes,
  session,
  term,
  onClose,
}: {
  classes: classInfoProp[];
  session: string;
  term: string;
  onClose: () => void;
}) {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [name, setName] = React.useState("");
  const [classId, setClassId] = React.useState(classes[0]?._id ?? "");
  const [dueDate, setDueDate] = React.useState("");
  const [items, setItems] = React.useState<EditableFeeItem[]>([
    { id: "tuition", label: "Tuition", amount: "" },
  ]);

  React.useEffect(() => {
    if (!classId && classes[0]) setClassId(classes[0]._id);
  }, [classId, classes]);

  const mutation = useMutation({
    mutationFn: () =>
      axiosInstance
        .post("/fees/structures", {
          name,
          class_id: classId,
          session,
          term,
          due_date: dueDate,
          items: items.map(item => ({
            label: item.label,
            amount: Number(item.amount),
          })),
        })
        .then(response => response.data as { invoices_created: number }),
    onSuccess: response => {
      api.success({
        message: "Fee structure created",
        description: `${response.invoices_created} student invoices were generated.`,
      });
      queryClient.invalidateQueries({ queryKey: ["feeInvoices"] });
      queryClient.invalidateQueries({ queryKey: ["feeStructures"] });
      onClose();
    },
    onError: (error: Error & { response?: { data?: string } }) => {
      api.error({
        message: "Fee structure could not be created",
        description: error.response?.data ?? error.message,
      });
    },
  });

  const updateItem = (index: number, update: Partial<EditableFeeItem>) => {
    setItems(current =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...update } : item
      )
    );
  };
  const total = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const canSubmit = Boolean(
    name.trim() && classId && dueDate && items.every(item => item.label && +item.amount > 0)
  );

  return (
    <section className="mt-6 rounded-lg border bg-white p-6">
      {contextHolder}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Create fee structure</h2>
          <p className="text-sm text-gray-800">
            Invoices will be generated for every student in the selected class.
          </p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close form">
          <Icon icon="carbon:close-outline" className="text-2xl" />
        </button>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="text-sm font-semibold">
          Structure name
          <input
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="e.g. First Term Fees"
            className="mt-1 w-full rounded border p-2 font-normal"
          />
        </label>
        <label className="text-sm font-semibold">
          Class
          <select
            value={classId}
            onChange={event => setClassId(event.target.value)}
            className="mt-1 w-full rounded border bg-white p-2 font-normal"
          >
            {classes.map(classInfo => (
              <option key={classInfo._id} value={classInfo._id}>
                {getClassLabel(classInfo)}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold">
          Session and term
          <input
            value={`${session}, ${term}`}
            readOnly
            className="mt-1 w-full rounded border bg-gray-50 p-2 font-normal"
          />
        </label>
        <label className="text-sm font-semibold">
          Payment due date
          <input
            type="date"
            value={dueDate}
            onChange={event => setDueDate(event.target.value)}
            className="mt-1 w-full rounded border p-2 font-normal"
          />
        </label>
      </div>
      <div className="mt-6 space-y-3">
        <h3 className="font-semibold">Fee items</h3>
        {items.map((item, index) => (
          <div key={item.id} className="flex flex-wrap items-center gap-3">
            <input
              value={item.label}
              onChange={event => updateItem(index, { label: event.target.value })}
              placeholder="Fee name"
              className="min-w-[220px] flex-1 rounded border p-2"
            />
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={item.amount}
              onChange={event => updateItem(index, { amount: event.target.value })}
              placeholder="Amount"
              className="w-48 rounded border p-2"
            />
            <button
              type="button"
              disabled={items.length === 1}
              onClick={() => setItems(current => current.filter((_, itemIndex) => itemIndex !== index))}
              className="rounded border p-2 disabled:opacity-40"
              aria-label="Remove fee item"
            >
              <Icon icon="material-symbols:delete-outline-rounded" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setItems(current => [
              ...current,
              { id: `fee-item-${Date.now()}`, label: "", amount: "" },
            ])
          }
          className="flex items-center gap-1 font-semibold text-primary-purple-700"
        >
          <Icon icon="material-symbols:add-rounded" /> Add fee item
        </button>
      </div>
      <div className="mt-6 flex items-center justify-between border-t pt-5">
        <p className="text-lg font-bold">Total: {formatCurrency(total)}</p>
        <button
          type="button"
          disabled={!canSubmit || mutation.isPending}
          onClick={() => mutation.mutate()}
          className="rounded-lg bg-primary-purple-700 px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          {mutation.isPending ? "Generating invoices..." : "Create and generate invoices"}
        </button>
      </div>
    </section>
  );
}

function InvoiceTable({ data, isLoading }: { data?: InvoiceListResponse; isLoading: boolean }) {
  if (isLoading) return <div className="flex justify-center py-16"><Spinner /></div>;
  if (!data?.invoices.length) {
    return <p className="rounded-lg border bg-white p-10 text-center text-gray-800">No invoices match these filters.</p>;
  }
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="bg-grey-50 text-xs uppercase text-gray-800">
          <tr>
            <th className="p-4">Invoice</th><th className="p-4">Student</th>
            <th className="p-4">Fee</th><th className="p-4">Total</th>
            <th className="p-4">Paid</th><th className="p-4">Balance</th>
            <th className="p-4">Status</th><th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.invoices.map(invoice => (
            <tr key={invoice._id} className="border-t">
              <td className="p-4 font-semibold">{invoice.invoice_number}</td>
              <td className="p-4">
                <div className="font-semibold">{getStudentName(invoice.student)}</div>
                <div className="text-xs text-gray-800">
                  {typeof invoice.student === "string" ? "" : invoice.student.registration_number}
                </div>
              </td>
              <td className="p-4">
                {typeof invoice.fee_structure === "string" ? "School fees" : invoice.fee_structure.name}
              </td>
              <td className="p-4">{formatCurrency(invoice.total_amount)}</td>
              <td className="p-4 text-secondary-green-600">{formatCurrency(invoice.amount_paid)}</td>
              <td className="p-4 font-semibold">{formatCurrency(invoice.balance)}</td>
              <td className="p-4 capitalize">{invoice.display_status}</td>
              <td className="p-4">
                <Link href={DASHBOARD_FEE_INVOICE(invoice._id)} className="font-semibold text-primary-purple-700 hover:underline">
                  View invoice
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Fees() {
  const { data: organization } = useOrganization();
  const classQuery = useFetchClassInfo();
  const classes: classInfoProp[] = classQuery.data?.classes ?? [];
  const settings = organization?.academic_settings;
  const [session, setSession] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [classId, setClassId] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [showCreate, setShowCreate] = React.useState(false);

  React.useEffect(() => {
    if (settings?.current_session && settings.current_term) {
      setSession(settings.current_session);
      setTerm(settings.current_term);
    }
  }, [settings]);

  const invoiceQuery = useQuery({
    queryKey: ["feeInvoices", session, term, classId, status],
    queryFn: () =>
      axiosInstance
        .get("/fees/invoices", {
          params: {
            session,
            term,
            class_id: classId || undefined,
            status: status === "all" ? undefined : status,
          },
        })
        .then(response => response.data as InvoiceListResponse),
    enabled: Boolean(session && term),
  });
  const structureQuery = useQuery({
    queryKey: ["feeStructures", session, term],
    queryFn: () =>
      axiosInstance
        .get("/fees/structures", { params: { session, term } })
        .then(response => response.data as FeeStructureSummary[]),
    enabled: Boolean(session && term),
  });

  return (
    <Container headerTitle="Fees & Invoices">
      <main className="min-h-full bg-neutral-300 p-6 lg:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Fees and payments</h1>
            <p className="text-sm text-gray-800">Generate invoices, monitor balances, and record payments.</p>
          </div>
          <button type="button" onClick={() => setShowCreate(true)} className="flex items-center gap-2 rounded-lg bg-primary-purple-700 px-5 py-3 font-semibold text-white">
            <Icon icon="material-symbols:add-rounded" /> Create fee structure
          </button>
        </div>
        {showCreate && session && term && (
          <CreateFeeStructure classes={classes} session={session} term={term} onClose={() => setShowCreate(false)} />
        )}
        <div className="mt-6">
          <FinancialOverview session={session} term={term} classId={classId} />
        </div>
        <FeeStructureList structures={structureQuery.data} />
        <section className="my-6 flex flex-wrap gap-4 rounded-lg bg-white p-4">
          <label className="text-sm font-semibold">Session
            <input value={session} onChange={event => setSession(event.target.value)} className="ml-2 rounded border p-2 font-normal" placeholder="2026/2027" />
          </label>
          <label className="text-sm font-semibold">Term
            <select value={term} onChange={event => setTerm(event.target.value)} className="ml-2 rounded border bg-white p-2 font-normal">
              {TERMS.map(option => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold">Class
            <select value={classId} onChange={event => setClassId(event.target.value)} className="ml-2 rounded border bg-white p-2 font-normal">
              <option value="">All classes</option>
              {classes.map(classInfo => <option key={classInfo._id} value={classInfo._id}>{getClassLabel(classInfo)}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold">Status
            <select value={status} onChange={event => setStatus(event.target.value)} className="ml-2 rounded border bg-white p-2 font-normal capitalize">
              {STATUS_OPTIONS.map(option => <option key={option}>{option}</option>)}
            </select>
          </label>
        </section>
        <InvoiceTable data={invoiceQuery.data} isLoading={invoiceQuery.isLoading || classQuery.isLoading} />
      </main>
    </Container>
  );
}
