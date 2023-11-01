import { Icon } from "@iconify/react";
import React from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ViewDetailsModal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50  ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-gray-800  opacity-75"></div>
      <div
        ref={modalRef}
        className="bg-white rounded-xl relative z-50 p-6 max-w-[650px] w-[95%] mx-auto"
      >
        <button onClick={onClose} className="absolute top-7 right-5">
          <Icon icon="ic:round-close" fontSize={20} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default ViewDetailsModal;
