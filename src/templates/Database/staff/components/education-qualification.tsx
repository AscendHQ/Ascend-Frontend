import { PlusOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { Input, InputRef, Space, Tag, theme, Tooltip } from "antd";
import React from "react";

import useTagManagement from "@/templates/Database/class/useTagManagement.hook";

export default function EducationQualification() {
  const { token } = theme.useToken();
  const [tags, setTags] = React.useState({
    data: ["Trevor Long"],
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
    <div className="min-w-full">
      <label
        htmlFor={"id"}
        className="block mb-2 text-sm font-medium text-Text-high-emphasis"
      >
        Education Qualifications
      </label>
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
            <PlusOutlined /> New Staff
          </Tag>
        )}
      </Space>
      {tags.message === "Error" && (
        <span className="text-red-800 block text-xs lg:text-sm mt-2">
          Education qualification is compulsory
        </span>
      )}
    </div>
  );
}
