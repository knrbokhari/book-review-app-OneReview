import Modal from "@/components/ui/modal/modal";
import dynamic from "next/dynamic";
import { MODAL_VIEWS, useModalAction, useModalState } from "./modal.context";

const DeleteAuthorView = dynamic(
  () => import("@/components/Authors/deleteAuthorView"),
);

function renderModal(view: MODAL_VIEWS | undefined, data: any) {
  switch (view) {
    case "DELETE_AUTHOR_VIEW":
      return <DeleteAuthorView />;
    case "DELETE_PUBLISHER_VIEW":
      return <DeleteAuthorView />;
    case "DELETE_CATEGORY_VIEW":
      return <DeleteAuthorView />;
    case "DELETE_BOOK_VIEW":
      return <DeleteAuthorView />;
    default:
      return null;
  }
}

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();
  return (
    <Modal open={isOpen} onClose={closeModal}>
      {renderModal(view, data)}
    </Modal>
  );
};

export default ManagedModal;
