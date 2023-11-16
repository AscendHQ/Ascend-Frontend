import { InboxOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DASHBOARD_CLASS, MOCK_API_LINK } from "@/config/links";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: MOCK_API_LINK,
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const NewBulkClass: React.FC = () => (
  <Container headerTitle="New Class">
    <main className="px-10 pt-10 pb-36 h-full bg-white">
      <Link
        href={DASHBOARD_CLASS}
        className="flex items-center gap-3 mb-3 text-sm"
      >
        <Icon icon="teenyicons:arrow-left-solid" />
        <span>Back</span>
      </Link>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag class file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading other data aside class file.
        </p>
      </Dragger>
    </main>
  </Container>
);

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
