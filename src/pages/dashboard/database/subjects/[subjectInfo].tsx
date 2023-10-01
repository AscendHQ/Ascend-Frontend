/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable react/no-array-index-key */
import { PlusOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { Input, InputRef, Space, Tag, theme, Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { DASHBOARD_SUBJECT } from "@/config/links";

export default function SubjectInfo() {
  const router = useRouter();
  const id = router.query.subjectInfo as string;

  return (
    <div>
      <Container headerTitle={id}>
        <main className="bg-white px-10 pt-7 h-full">
          <div className="flex justify-between">
            <Link
              href={DASHBOARD_SUBJECT}
              className="flex items-center gap-3 text-sm"
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              <span>Back</span>
            </Link>
            <ul className="flex gap-2">
              <li>
                <DashboardButton variant={"secondary"}>Cancel</DashboardButton>
              </li>
              <li>
                <DashboardButton variant={"primary"}>
                  Save changes
                </DashboardButton>
              </li>
            </ul>
          </div>
          <SubjectInformation />
        </main>
      </Container>
    </div>
  );
}
function SubjectInformation() {
  return (
    <div className="flex justify-between gap-16 pb-16 mt-14 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Subject information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="subject_name"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Subject name
          </label>
          <input
            type="text"
            id="subject_name"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Enter a subject name"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="subject_code"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Subject code
          </label>
          <input
            type="text"
            id="subject_code"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="e.g. PHY"
            required
          />
        </div>
        <ClassTagContainer />
        <TeacherTagContainer />
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>{" "}
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="hours_per_week"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Hours per week
          </label>
          <select
            name="hours_per_week"
            id="hours_per_week"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>
        <div className="lg:min-w-full flex-1 ">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis h-28"
            placeholder="What is this subject about?"
          />
          <span className="text-gray-800">0/40 characters remaining</span>
        </div>
      </div>
    </div>
  );
}
const ClassTagContainer: React.FC = () => {
  const { token } = theme.useToken();
  const [tags, setTags] = React.useState([
    "SS3A",
    "SS3B",
    "SS2A",
    "SS2B",
    "SS1A",
    "SS1B",
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
    <div className="lg:min-w-full flex-1 ">
      <label
        htmlFor="classes_offering"
        className="block mb-2 text-sm font-medium text-Text-high-emphasis"
      >
        Classes offering
      </label>
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
              <PlusOutlined /> New Class
            </Tag>
          )}
        </Space>
      </Space>
    </div>
  );
};
const TeacherTagContainer: React.FC = () => {
  const { token } = theme.useToken();
  const [tags, setTags] = React.useState([
    "Manuel Hunt",
    "Amy Becker",
    "Sylvia Martinez",
    "Bryan Moran",
    "Vera Beck",
    "Jackson Jensen",
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
    <div className="lg:min-w-full flex-1 ">
      <label
        htmlFor="teachers_handling"
        className="block mb-2 text-sm font-medium text-Text-high-emphasis"
      >
        Teachers handling
      </label>
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
              <PlusOutlined /> New Teacher
            </Tag>
          )}
        </Space>
      </Space>
    </div>
  );
};
