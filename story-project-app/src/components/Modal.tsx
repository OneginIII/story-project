import { useEffect, useRef, useState } from "react";
import "./Modal.css";

function Modal(props: {
  isOpen: boolean;
  hasCancelButton?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}) {
  const [modalOpen, setModalOpen] = useState(props.isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    if (props.onClose) {
      props.onClose();
    }
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  const handleBackgroundClose = (
    event: React.MouseEvent<HTMLDialogElement>
  ) => {
    if (event.target === modalRef.current) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(props.isOpen);
    if (props.isOpen) {
      document.body.style.overflow = "initial";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [props.isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (modalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [modalOpen]);

  return (
    <dialog
      ref={modalRef}
      onKeyDown={(e) => handleKeyDown(e)}
      className="modal"
      onMouseDown={handleBackgroundClose}
    >
      {props.children}
    </dialog>
  );
}

export default Modal;
