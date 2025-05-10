import { useDeleteAuthorMutation } from "@/apis/authors";
import React from "react";
import { useModalAction, useModalState } from "../ui/modal/modal.context";
import ConfirmationCard from "../ui/modal/confirmation-modal";

const DeleteConfirmationView = () => {
  const { mutate: deleteAuthor, isPending: loading } =
    useDeleteAuthorMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();

  function handleDelete() {
    try {
      deleteAuthor(data as string);
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

export default DeleteConfirmationView;
