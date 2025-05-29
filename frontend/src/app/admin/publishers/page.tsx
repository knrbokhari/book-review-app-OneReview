"use client";

import {
  useDeletePublisherMutation,
  usePublisherListQuery,
} from "@/apis/publisher";
import { TrashIcon } from "@/assets/icons";
import Button from "@/components/ui/button";
import CustomModal from "@/components/ui/modal/common-modal";
import ConfirmationCard from "@/components/ui/modal/confirmation-modal";
import { useModalAction } from "@/components/ui/modal/modal.context";
import Pagination from "@/components/ui/pagination";
import { Loader } from "@/components/ui/spinner/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const router = useRouter();
  const { openModal } = useModalAction();
  const [page, setPage] = useState(1);
  const { publishers, paginatorInfo, loading } = usePublisherListQuery({
    limit: 20,
    page,
  });
  const [item, setDeleteItem] = useState<any>(null);
  const { mutate: deleteItem, isPending: deleting } =
    useDeletePublisherMutation();

  async function handleDelete() {
    try {
      deleteItem(item?.id as string);
      setDeleteItem(null);
    } catch (error) {}
  }

  function handlePagination(current: number) {
    setPage(current);
  }
  if (loading) return <Loader text="Loading..." />;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white">
          Publishers
        </h2>

        <Link href="/admin/publishers/create">
          <Button>Add Publisher</Button>
        </Link>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead className="min-w-[155px] xl:pl-7.5">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Books</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {publishers?.map((item: any, index: any) => (
              <TableRow
                key={index}
                className="border-[#eee] dark:border-dark-3"
              >
                <TableCell className="min-w-[155px] xl:pl-7.5">
                  <Image
                    src={item?.image || "/need-image.png"}
                    className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                    width={40}
                    height={35}
                    alt={"Image for author" + item?.name}
                    role="presentation"
                  />
                </TableCell>
                <TableCell className="min-w-[155px] xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">{item.name}</h5>
                </TableCell>

                <TableCell>
                  <h5 className="text-dark dark:text-white">
                    {item.products_count}
                  </h5>
                </TableCell>

                <TableCell>
                  <p className="text-dark dark:text-white">
                    {dayjs(item.created_at).format("MMM DD, YYYY")}
                  </p>
                </TableCell>

                <TableCell className="xl:pr-7.5">
                  <div className="flex items-center justify-end gap-x-3.5">
                    <button
                      onClick={(e) =>
                        router.push(`/admin/publishers/${item?.id}`)
                      }
                      className="text-green-500 hover:text-green-700"
                    >
                      <span className="sr-only">View Invoice</span>
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={
                        () => setDeleteItem(item)
                        // openModal("DELETE_PUBLISHER_VIEW", item?.id)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <span className="sr-only">Delete Invoice</span>
                      <TrashIcon width={20} height={20} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-5 flex items-center justify-end">
          {paginatorInfo?.pages > 1 && (
            <Pagination
              total={paginatorInfo.total}
              current={paginatorInfo.currentPage}
              pageSize={paginatorInfo.perPage}
              onChange={handlePagination}
            />
          )}
        </div>
      </div>
      <CustomModal
        isOpen={item?.id}
        onClose={() => setDeleteItem(null)}
        size="md"
        title="Delete Publication"
        variant="default"
      >
        <ConfirmationCard
          onCancel={() => setDeleteItem(null)}
          onDelete={handleDelete}
          deleteBtnLoading={loading}
        />
      </CustomModal>
    </div>
  );
};

export default page;
