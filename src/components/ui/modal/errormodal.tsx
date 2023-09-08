import { Icon } from "@iconify/react";
import { Modal } from "antd";
import React from "react";

import { ErrorModalProps } from "@/types";

const ErrorModal: React.FC<ErrorModalProps> = ({
  title,
  content,
  okButtonProps,
  cancelButtonProps,
  onOk,
  onCancel,
  mainButtonProps,
}) => {
  const showModal = () => {
    Modal.confirm({
      title: title || "Error",
      icon: (
        <Icon
          icon="material-symbols:error"
          fontSize={35}
          className="text-secondary-red-600"
        />
      ),
      content: content || "An error occurred.",
      okButtonProps: okButtonProps || {
        style: {
          backgroundColor: "#fff",
          color: "#cd2026",
          border: "1px solid #cd2026",
        },
      },
      cancelButtonProps: cancelButtonProps || {
        style: {
          backgroundColor: "floralwhite",
        },
      },
      centered: true,
      onOk() {
        console.log("OK");
        if (onOk) {
          onOk();
        }
        return true;
      },
      onCancel() {
        console.log("Cancel");
        if (onCancel) {
          onCancel();
        }
      },
    });
  };

  return (
    <button
      className="flex gap-2 w-full transition-all py-1 rounded-sm"
      onClick={showModal}
    >
      {mainButtonProps}
    </button>
  );
};

export default ErrorModal;
