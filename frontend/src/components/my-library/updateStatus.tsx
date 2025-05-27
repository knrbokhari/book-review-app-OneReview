import { useUpdateLibraryMutation } from "@/apis/my-library";
import React, { useState } from "react";
import {
  ChevronDown,
  BookOpen,
  Eye,
  CheckCircle,
  OptionIcon,
} from "lucide-react";

const UpdateStatus = ({ item }: any) => {
  const [status, setStatus] = React.useState(item?.status);
  const { mutate, isPending } = useUpdateLibraryMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setIsOpen(false);
    mutate({
      userId: item?.userId,
      bookId: item?.bookId,
      status: newStatus,
    });
  };

  const options = [
    {
      value: "Want to Read",
      label: "Want to Read",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100",
    },
    {
      value: "Currently Reading",
      label: "Currently Reading",
      icon: Eye,
      color: "text-orange-600",
      bgColor: "bg-orange-50 hover:bg-orange-100",
    },
    {
      value: "Completed",
      label: "Completed",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 hover:bg-green-100",
    },
  ];

  const selectedOption = options.find((opt) => opt.value === status);
  const Icon = selectedOption?.icon || BookOpen;

  return (
    <div className="relative" onMouseLeave={() => setIsOpen(false)}>
      <select
        name=""
        id=""
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        className={`border-1 flex w-full items-center justify-between gap-3 rounded border-gray-200 bg-gray-1 px-4 py-3 shadow transition-all duration-200 hover:shadow-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-gray-50`}
          >
            <div>
              <span
                className={`${status === option.value ? "border-r-4 border-blue-500 bg-blue-50" : ""} font-medium text-gray-800`}
              >
                {option.label}
              </span>
              {status === option.value && (
                <CheckCircle className="ml-auto h-4 w-4 text-blue-500" />
              )}
            </div>
          </option>
        ))}
      </select>
    </div>
  );
};

export default UpdateStatus;
