import React from "react";
import ReactModal from "react-modal";
import { X as CloseIcon } from "react-feather";

ReactModal.setAppElement("#__next");

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
};

const Modal: React.FC<Props> = ({ isOpen, children, onClose = () => null }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      className="absolute z-2000 w-screen h-screen bg-white/90"
      overlayClassName="fixed top-0 right-0 left-0 bottom-0 z-10"
    >
      <div className="absolute top-5 right-5" onClick={onClose}>
        <CloseIcon strokeWidth={1.5} size={28} color="#2f363d" />
      </div>
      {children}
    </ReactModal>
  );
};

export default Modal;
