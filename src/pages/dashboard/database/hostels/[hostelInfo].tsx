/* eslint-disable react/no-array-index-key */
import { PlusOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Input, InputRef, Space, Tag, theme, Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { Container } from "@/components/layout/dashboard";
import CheckboxGroup from "@/components/ui/form/checkboxgroup";
import RadioGroup from "@/components/ui/form/radiogroup";
import SelectField from "@/components/ui/form/selectfield";
import TextAreaWithLabelAndCount from "@/components/ui/form/textarea";
import TextField from "@/components/ui/form/textfield";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_HOSTEL } from "@/config/links";
import { useFormContext } from "@/hooks/useFormContext";
import {
  HostelInfoContextType,
  HostelInfoSchemaType,
  newTeacherBioDataSchema,
} from "@/types/form";

const ReactHookForm = React.createContext<HostelInfoContextType | undefined>(
  undefined
);

export default function HostelInfo() {
  const router = useRouter();
  const id = router.query.hostelInfo as string;

  const onSubmit = (data: object) => {
    console.log(data, "data");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<HostelInfoSchemaType>({
    resolver: zodResolver(newTeacherBioDataSchema),
  });

  React.useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);

  return (
    <ReactHookForm.Provider value={{ register, errors }}>
      <Container headerTitle={id}>
        <main className="p-10 bg-white h-full">
          <Link href={DASHBOARD_HOSTEL} className="flex items-center gap-2">
            <Icon icon="teenyicons:arrow-left-solid" />
            Back to Hostel
          </Link>
          <HostelDetailHeading />
          <HostelInformation />
          <HostelFacilities />
          <HostelStaffDetails />
          <AdditionalInformation />
          <AllocateStudent />
          <RoomNamingConfiguration />
          <HostelFee />
          <div className="flex justify-end gap-6">
            <button
              className="flex gap-3 items-center font-semibold bg-primary-purple-700 text-sm text-white px-20 py-3 rounded-lg"
              onClick={handleSubmit(onSubmit)}
            >
              <LoadingState label="Save" isSubmitting={isSubmitting} />
            </button>
          </div>
        </main>
      </Container>
    </ReactHookForm.Provider>
  );
}

function HostelInformation() {
  const { register, errors } = useFormContext(ReactHookForm);

  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Hostel information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the hostel detail profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <TextField
          id="hostel_name"
          label="Hostel name"
          placeholder="Babalola Hostel"
          required
          defaultValue="Cora Hostel"
          register={register}
          errorMessage={errors.hostel_name?.message || ""}
        />
        <TextField
          id="capacity"
          label="Capacity"
          placeholder="2000"
          defaultValue={"3204"}
          required
          type="number"
          register={register}
          errorMessage={errors.capacity?.message || ""}
        />
        <SelectField
          id="hostel_type"
          label="Type"
          options={["Male", "Female"]}
          defaultValue={"Female"}
          register={register}
          errorMessage={errors.hostel_type?.message || ""}
        />
      </div>
    </div>
  );
}

function HostelStaffDetails() {
  const { register, errors } = useFormContext(ReactHookForm);

  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Hostel staff details
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the hostel detail profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <TextField
          id="staff_name"
          label="Staff name"
          placeholder="Mr Bamidele"
          required
          defaultValue={"Mrs Rosie"}
          register={register}
          errorMessage={errors.staff_name?.message || ""}
        />
        <TextField
          id="contact_detail"
          label="Contact detail"
          placeholder="0811-234-5678"
          defaultValue={"09062327721"}
          required
          register={register}
          errorMessage={errors.contact_detail?.message || ""}
        />
      </div>
    </div>
  );
}

function HostelFee() {
  const { register, errors } = useFormContext(ReactHookForm);

  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">Hostel fee</h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the hostel detail profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <TextField
          id="amount_to_be_paid"
          label="Amount to be paid"
          placeholder="$1300"
          type="number"
          required
          defaultValue={"$1000"}
          register={register}
          errorMessage={errors.amount_to_be_paid?.message || ""}
        />
        <SelectField
          id="period_of_payment"
          label="Period of payment"
          options={["1st Term", "2nd Term", "3rd Term"]}
          defaultValue={"2nd Term"}
          register={register}
          errorMessage={errors.period_of_payment?.message || ""}
        />
      </div>
    </div>
  );
}
function AdditionalInformation() {
  const { register, errors } = useFormContext(ReactHookForm);

  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Additional information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the hostel detail profile.
        </p>
      </div>
      <div className="flex-1 text-sm text-Text-high-emphasis font-medium space-y-2">
        <TextAreaWithLabelAndCount
          id="Notes&Comments"
          label={
            <>
              Other notes & comments <small>(Optional)</small>
            </>
          }
          placeholder="If you want to provide note and comment"
          isFullWidth
          defaultValue={"No comment"}
          register={register}
          errorMessage={errors["Notes&Comments"]?.message || ""}
        />
      </div>
    </div>
  );
}

function AllocateStudent() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Allocate Student
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the hostel detail profile.
        </p>
      </div>
      <div className="flex-1 text-sm text-Text-high-emphasis font-medium space-y-5">
        <TagContainer />
      </div>
    </div>
  );
}

function RoomNamingConfiguration() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Room naming configuration
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the hostel detail profile.
        </p>
      </div>
      <div className="flex-1">
        <RadioGroup
          id="naming_convention"
          label="Naming convention"
          options={[
            { value: "number", label: "Number (i.e Room 1)", checked: false },
            { value: "letter", label: "Letter (i.e Room A)", checked: true },
          ]}
          isFullWidth
        />
      </div>
    </div>
  );
}

function HostelFacilities() {
  const { register, errors } = useFormContext(ReactHookForm);

  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Hostel facilities
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the hostel detail profile.
        </p>
      </div>
      <div className="flex-1">
        <SelectField
          id="room_type"
          label="Room type"
          options={["Single room", "Double room"]}
          defaultValue={"Single room"}
          register={register}
          errorMessage={errors.room_type?.message || ""}
        />

        <CheckboxGroup
          id="amenities"
          label="Available amenities"
          options={[
            { value: "beds", label: "Beds (4)", checked: false },
            { value: "study-table", label: "Study tables", checked: false },
            { value: "wardrobes", label: "Wardrobes", checked: false },
            { value: "bathrooms", label: "Bathrooms", checked: true },
            { value: "common-rooms", label: "Common rooms", checked: false },
            { value: "fan", label: "Fan", checked: false },
            { value: "wi-Fi", label: "Wi-Fi", checked: false },
          ]}
        />
      </div>
    </div>
  );
}

function HostelDetailHeading() {
  return (
    <div className="flex justify-between gap-16 pb-4 my-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h2 className="text-2xl font-bold tracking-tight text-Text-high-emphasis ">
          Hostel Detail
        </h2>
        <p className=" text-sm font-medium text-gray-800">
          Update your student biodata here
        </p>
      </div>
    </div>
  );
}

const TagContainer: React.FC = () => {
  const { token } = theme.useToken();
  const [tags, setTags] = React.useState([
    "Dorothy Lloyd",
    "Hettie Patterson",
    "Sara Boone",
    "Ronald Montgomery",
    "Brett Carroll",
    "Nancy Holmes",
  ]);
  const [inputVisible, setInputVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [editInputIndex, setEditInputIndex] = React.useState(-1);
  const [editInputValue, setEditInputValue] = React.useState("");
  const inputRef = React.useRef<InputRef>(null);
  const editInputRef = React.useRef<InputRef>(null);

  React.useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  React.useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter(tag => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  const tagInputStyle: React.CSSProperties = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
    padding: 2,
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    fontSize: 16,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  return (
    <Space size={[0, 8]} wrap>
      <Space size={[0, 8]} wrap>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag}
                size="large"
                style={tagInputStyle}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              key={tag}
              closable={index !== -1}
              className="flex items-center py-1 px-3 rounded gap-2 select-none bg-neutral-300"
              onClose={() => handleClose(tag)}
              closeIcon={
                <Icon
                  icon="material-symbols:cancel-outline"
                  fontSize={20}
                  className="cursor-pointer ml-2 mb-1 inline"
                />
              }
            >
              <button
                onDoubleClick={e => {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }}
                className="text-gray-800 font-medium text-base"
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </button>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={tagInputStyle}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        ) : (
          <Tag style={tagPlusStyle} onClick={showInput}>
            <PlusOutlined /> New Student
          </Tag>
        )}
      </Space>
    </Space>
  );
};
