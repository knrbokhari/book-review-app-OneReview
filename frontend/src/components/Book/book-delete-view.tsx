import React from "react";
import { useModalAction, useModalState } from "../ui/modal/modal.context";
import ConfirmationCard from "../ui/modal/confirmation-modal";
import { useDeleteBookMutation } from "@/apis/book";

const DeleteBookView = () => {
  const { mutate: deleteBook, isPending: loading } = useDeleteBookMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();

  function handleDelete() {
    try {
      deleteBook(data as string);
      closeModal();
    } catch (error) {
      closeModal();
    }
  }

  return (
    <>
      <ConfirmationCard
        onCancel={closeModal}
        onDelete={handleDelete}
        deleteBtnLoading={loading}
      />
    </>
  );
};

export default DeleteBookView;
