/* eslint-disable react/no-array-index-key */
import { PlusOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import type { InputRef } from "antd";
import { Input, Space, Tag, theme, Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import SelectField from "@/components/ui/form/selectfield";
import TextAreaWithLabelAndCount from "@/components/ui/form/textarea";
import TextField from "@/components/ui/form/textfield";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_CLASS } from "@/config/links";
import {
  ClassInfoContextType,
  classInfoSchema,
  ClassInfoSchemaType,
} from "@/types/form";

import useTagManagement from "./useTagManagement.hook";

const ReactHookForm = React.createContext<ClassInfoContextType | undefined>(
  undefined
);

export default function ClassInfo() {
  const router = useRouter();
  const id = router.query.classInfo as string;

  const onSubmit = (data: object) => {
    console.log(data, "data");

    router.push("/");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ClassInfoSchemaType>({
    resolver: zodResolver(classInfoSchema),
  });

  React.useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);

  return (
    <ReactHookForm.Provider value={{ register, errors }}>
      <Container headerTitle={id}>
        <main className="bg-white px-10 pt-7 h-full">
          <div className="flex justify-between">
            <Link
              href={DASHBOARD_CLASS}
              className="flex items-center gap-3 text-sm"
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              <span>Back</span>
            </Link>
            <DashboardButton variant="primary" onClick={handleSubmit(onSubmit)}>
              <LoadingState label="Save changes" isSubmitting={isSubmitting} />
            </DashboardButton>
          </div>
          <ClassInformation />
        </main>
      </Container>
    </ReactHookForm.Provider>
  );
}

const useFormContext = () => {
  const context = React.useContext(ReactHookForm);
  if (!context) {
    throw new Error("useFormContext must be used within a MyProvider");
  }
  return context;
};

function ClassInformation() {
  const { register, errors } = useFormContext();

  return (
    <div className="flex justify-between gap-16 pb-16 mt-14 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Class information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <TextField
          id="class_name"
          label="Class name"
          placeholder="SS2B"
          required
          defaultValue="SS1A"
          register={register}
          errorMessage={errors.class_name?.message || ""}
        />
        <TextField
          id="academic_year"
          label="Academic year"
          placeholder="2023"
          required
          defaultValue="2023"
          register={register}
          errorMessage={errors.academic_year?.message || ""}
          onChange={e => console.log(e.target.value)}
        />
        <TextField
          id="class_teacher"
          label="Class teacher"
          placeholder="Myrtle Rios"
          required
          defaultValue="Myrtle Rios"
          register={register}
          errorMessage={errors.class_teacher?.message || ""}
        />
        <TextField
          id="class_teacher_contact"
          label="Class teacher contact"
          placeholder="(234)81 0000 0000"
          required
          defaultValue="(234)81 0000 0000"
          register={register}
          errorMessage={errors.class_teacher_contact?.message || ""}
        />
        <div className="lg:min-w-full flex-1">
          <label
            htmlFor="students"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Students
          </label>

          <TagContainer />
        </div>
        <SelectField
          id="status"
          label="Status"
          options={["Active", "Inactive"]}
          defaultValue="Inactive"
          onChange={e => console.log(e.target.value)}
          isFullWidth
          register={register}
          errorMessage={errors.status?.message || ""}
        />

        <TextAreaWithLabelAndCount
          id="additional_notes"
          label="Additional notes"
          placeholder="Add additional notes"
          maxLength={40}
          showCharacterCount
          isFullWidth
          register={register}
          errorMessage={errors.additional_notes?.message || ""}
        />
      </div>
    </div>
  );
}

function TagContainer() {
  const { token } = theme.useToken();
  const [tags, setTags] = React.useState({
    data: [
      "Dorothy Lloyd",
      "Hettie Patterson",
      "Sara Boone",
      "Ronald Montgomery",
      "Brett Carroll",
      "Nancy Holmes",
    ],
    message: "",
  });

  const [
    { inputVisible, inputValue, editInputIndex, editInputValue },
    {
      handleClose,
      showInput,
      handleInputChange,
      handleInputConfirm,
      handleEditInputChange,
      handleEditInputConfirm,
      setEditInputIndex,
      setEditInputValue,
    },
  ] = useTagManagement(tags.data, setTags);
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

  const tagInputStyle: React.CSSProperties = {
    width: 130,
    height: 25,
    marginInlineEnd: 8,
    verticalAlign: "top",
    padding: 2,
  };

  const tagPlusStyle: React.CSSProperties = {
    padding: 2,
    height: 25,
    fontSize: 12,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  return (
    <Space size={[0, 8]} wrap>
      <Space size={[0, 8]} wrap>
        {tags.data.map((tag, index) => {
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
}
