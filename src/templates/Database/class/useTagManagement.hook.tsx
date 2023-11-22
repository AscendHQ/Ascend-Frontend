import React, { ChangeEvent } from "react";

function useTagManagement(
  tags: string[],
  setTags: React.Dispatch<
    React.SetStateAction<{
      data: string[];
      message: string;
    }>
  >
): UseTagManagement {
  const [inputVisible, setInputVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [editInputIndex, setEditInputIndex] = React.useState(-1);
  const [editInputValue, setEditInputValue] = React.useState("");

  const handleClose: TagManagementActions["handleClose"] = removedTag => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags({ data: newTags, message: "" });
  };

  const showInput: TagManagementActions["showInput"] = () => {
    setInputVisible(true);
  };

  const handleInputChange: TagManagementActions["handleInputChange"] = e => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm: TagManagementActions["handleInputConfirm"] = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags({ data: [...tags, inputValue], message: "" });
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange: TagManagementActions["handleEditInputChange"] =
    e => {
      setEditInputValue(e.target.value);
    };

  const handleEditInputConfirm: TagManagementActions["handleEditInputConfirm"] =
    () => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;
      setTags({ data: newTags, message: "" });

      setEditInputIndex(-1);
      setEditInputValue("");
    };

  const state: TagManagementState = {
    tags,
    inputVisible,
    inputValue,
    editInputIndex,
    editInputValue,
  };

  const actions: TagManagementActions = {
    handleClose,
    showInput,
    handleInputChange,
    handleInputConfirm,
    handleEditInputChange,
    handleEditInputConfirm,
    setEditInputIndex,
    setInputVisible,
    setEditInputValue,
  };

  return [state, actions];
}

export default useTagManagement;

type TagManagementState = {
  tags: string[];
  inputVisible: boolean;
  inputValue: string;
  editInputIndex: number;
  editInputValue: string;
};

type TagManagementActions = {
  handleClose: (removedTag: string) => void;
  showInput: () => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleInputConfirm: () => void;
  handleEditInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEditInputConfirm: () => void;
  setEditInputValue: React.Dispatch<React.SetStateAction<string>>;
  setEditInputIndex: React.Dispatch<React.SetStateAction<number>>;
  setInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type UseTagManagement = [TagManagementState, TagManagementActions];
