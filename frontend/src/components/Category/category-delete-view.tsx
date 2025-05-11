import React from "react";
import { useModalAction, useModalState } from "../ui/modal/modal.context";
import ConfirmationCard from "../ui/modal/confirmation-modal";
import { useDeleteCategoryMutation } from "@/apis/category";

const DeleteCategoryView = () => {
  const { mutate: deleteCategory, isPending: loading } =
    useDeleteCategoryMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();

  function handleDelete() {
    try {
      deleteCategory(data as string);
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

export default DeleteCategoryView;
