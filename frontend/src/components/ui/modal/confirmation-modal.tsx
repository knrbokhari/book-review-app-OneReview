import { TrashIcon } from "@/assets/icons";
import Button from "@/components/ui/button";
import cn from "classnames";

type ConfirmationCardProps = {
  onCancel: () => void;
  onDelete: () => void;
  title?: string;
  icon?: any;
  description?: string;
  cancelBtnClassName?: string;
  deleteBtnClassName?: string;
  cancelBtnText?: string;
  deleteBtnText?: string;
  cancelBtnLoading?: boolean;
  deleteBtnLoading?: boolean;
};

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  onCancel,
  onDelete,
  icon,
  title = "Delete",
  description = "Are you sure, you want to delete",
  cancelBtnText = "Cancel",
  deleteBtnText = "Delete",
  cancelBtnClassName,
  deleteBtnClassName,
  cancelBtnLoading,
  deleteBtnLoading,
}) => {
  return (
    <div className="m-auto w-full max-w-sm rounded-md bg-white p-4 pb-6 sm:w-[24rem] md:rounded-xl">
      <div className="h-full w-full text-center">
        <div className="flex h-full flex-col justify-between">
          {icon ? (
            icon
          ) : (
            <TrashIcon className="m-auto mt-4 h-12 w-12 text-[#32b4fc]" />
          )}
          <p className="mt-4 text-xl font-bold text-black dark:text-white">
            {title}
          </p>
          <p className="px-6 py-2 text-black dark:text-white">{description}?</p>
          <div className="space-s-4 mt-8 flex w-full items-center justify-between gap-2">
            <div className="w-1/2">
              <Button
                onClick={onDelete}
                loading={deleteBtnLoading}
                disabled={deleteBtnLoading}
                variant="custom"
                className={cn(
                  "text-light w-full rounded bg-red-600 px-4 py-2 text-center font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-red-700 focus:bg-red-700 focus:outline-none disabled:!bg-slate-500",
                  deleteBtnClassName,
                )}
              >
                {deleteBtnText}
              </Button>
            </div>
            <div className="w-1/2">
              <Button
                onClick={onCancel}
                loading={cancelBtnLoading}
                disabled={cancelBtnLoading}
                variant="custom"
                className={cn(
                  "text-light w-full rounded bg-[#32b4fc] px-4 py-2 text-center font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-[#26b3ff] focus:bg-[#32b4fc] focus:outline-none",
                  cancelBtnClassName,
                )}
              >
                {cancelBtnText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCard;
