import React from "react";
import { useModalAction, useModalState } from "../ui/modal/modal.context";
import ConfirmationCard from "../ui/modal/confirmation-modal";
import { useDeletePublisherMutation } from "@/apis/publisher";

const DeletePublisherView = () => {
  const { mutate: deletePublisher, isPending: loading } =
    useDeletePublisherMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();

  function handleDelete() {
    try {
      deletePublisher(data as string);
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

export default DeletePublisherView;
