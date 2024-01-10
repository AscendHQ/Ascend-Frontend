/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { ChangeEvent, DragEvent, useRef, useState } from "react";

import { Container } from "@/components/layout/dashboard";
import { DASHBOARD_CLASS } from "@/config/links";

function NewBulkClass() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log("File has been added");

    // Use optional chaining to handle null or undefined
    const selectedFiles = e.target.files?.length
      ? Array.from(e.target.files)
      : [];

    if (selectedFiles.length > 0) {
      console.log(selectedFiles);
      setFiles(prevState => [...prevState, ...selectedFiles]);
    }
  }

  function handleDrop(e: DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        setFiles(prevState => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e: DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragAction(e: DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: string, idx: number) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  }

  return (
    <Container headerTitle="New Class">
      <main className="px-10 pt-10 pb-36 h-full bg-white">
        <Link
          href={DASHBOARD_CLASS}
          className="flex items-center gap-3 mb-3 text-sm"
        >
          <Icon icon="teenyicons:arrow-left-solid" />
          <span>Back</span>
        </Link>
        <div className="flex items-center justify-center h-screen">
          <form
            className={`${
              dragActive ? "bg-blue-400" : "bg-blue-100"
            }  p-4 max-w-lg rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center`}
            onDragEnter={handleDragAction}
            onSubmit={e => e.preventDefault()}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragAction}
          >
            <input
              placeholder="fileInput"
              className="hidden"
              ref={inputRef}
              type="file"
              multiple={true}
              onChange={handleChange}
              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
            />
            <p>
              Drag & Drop files or{" "}
              <button
                className="font-bold text-blue-600 cursor-pointer"
                onClick={openFileExplorer}
              >
                <u>Select files</u>
              </button>{" "}
              to upload
            </p>
            <ol className="flex flex-col p-3 space-y-2" start={0}>
              {files.map((file, idx) => (
                <li
                  key={`${idx}_${file.name}`}
                  className="flex flex-row space-x-5 justify-between items-center py-3 px-3 border border-primary-purple-700 rounded"
                >
                  <span className="text-secondary-green-500">{file.name}</span>
                  <button
                    className="text-red-500 border border-primary-purple-800 hover:bg-primary-purple-800 hover:border-transparent hover:text-white transition-all py-1 px-2 rounded"
                    onClick={() => removeFile(file.name, idx)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ol>
          </form>
        </div>
      </main>
    </Container>
  );
}

export default NewBulkClass;
/* 


function TagContainer() {
  const { token } = theme.useToken();
  const [tags, setTags] = React.useState({
    data: ["A", "B", "C"],
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
    fontSize: 14,
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
            <PlusOutlined /> New Section
          </Tag>
        )}
      </Space>
    </Space>
  );
}



*/
