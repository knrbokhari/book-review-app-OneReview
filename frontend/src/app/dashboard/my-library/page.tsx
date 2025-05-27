"use client";

import { useLibraryListQuery } from "@/apis/my-library";
import { TrashIcon } from "@/assets/icons";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UpdateStatus from "@/components/my-library/updateStatus";
import Pagination from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { set } from "lodash";
import { Edit } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const [page, setPage] = useState(1);
  const { library, loading, paginatorInfo } = useLibraryListQuery({
    page,
    perPage: 10,
    sortBy: "addedDate",
    sortOrder: "desc",
  });

  function handlePagination(current: number) {
    setPage(current);
  }

  return (
    <div>
      <h2 className="mb-5 text-[26px] font-bold leading-[30px] text-dark dark:text-white">
        My Library
      </h2>

      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead>Book Name</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Added Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {library?.map((item: any, index: number) => (
              <TableRow
                key={index}
                className="border-[#eee] dark:border-dark-3"
              >
                <TableCell className="flex min-w-fit items-center gap-3 pl-5 sm:pl-6 xl:pl-7.5">
                  <Image
                    src={item?.book?.image}
                    className="aspect-[4/6] w-15 rounded-[5px] object-cover"
                    width={40}
                    height={50}
                    alt={"Image for " + item.name}
                    role="presentation"
                  />
                  <div>{item?.book?.name}</div>
                </TableCell>

                <TableCell>
                  <h5 className="text-dark dark:text-white">
                    {item?.book?.ratings}
                  </h5>
                </TableCell>
                <TableCell>
                  <h5 className="text-dark dark:text-white">
                    {item?.book?.totalReviews}
                  </h5>
                </TableCell>
                <TableCell>
                  <h5 className="text-dark dark:text-white">
                    {item?.createdAt}
                  </h5>
                </TableCell>
                <TableCell>
                  <UpdateStatus item={item} />

                  {/* <h5 className="text-dark dark:text-white">
                    <UpdateStatus item={item} />
                  </h5> */}
                </TableCell>
                <TableCell className="xl:pr-7.5">
                  <div className="flex items-center justify-end gap-x-3.5">
                    <button className="hover:text-primary">
                      <span className="sr-only">Delete</span>
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
    </div>
  );
};

export default page;
