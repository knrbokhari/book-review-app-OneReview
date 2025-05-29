"use client";

import { useReviewListUserQuery } from "@/apis/reviews";
import { TrashIcon } from "@/assets/icons";
import RatingsBadge from "@/components/ui/rating-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import Pagination from "rc-pagination";
import React, { useState } from "react";

const page = () => {
  const [page, setPage] = useState(1);

  const { reviews, loading, paginatorInfo } = useReviewListUserQuery({
    limit: 10,
    page,
  });

  function handlePagination(current: number) {
    setPage(current);
  }

  return (
    <div>
      <h2 className="mb-5 text-[26px] font-bold leading-[30px] text-dark dark:text-white">
        My Review
      </h2>
      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead>Book Name</TableHead>
              <TableHead>Ratting</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reviews?.map((item: any, index: any) => (
              <TableRow
                key={index}
                className="border-[#eee] dark:border-dark-3"
              >
                <TableCell className="min-w-[155px] xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">{item?.title}</h5>
                </TableCell>

                <TableCell className="min-w-[155px] xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">
                    <RatingsBadge
                      rating={item.rating}
                      className="cursor-pointer pl-3 pr-2 font-bold sm:px-3"
                      variant="small"
                    />
                  </h5>
                </TableCell>

                <TableCell>
                  <h5 className="text-dark dark:text-white">{item.content}</h5>
                </TableCell>

                <TableCell>
                  <p className="text-dark dark:text-white">
                    {dayjs(item.created_at).format("MMM DD, YYYY h:mm A")}
                  </p>
                </TableCell>

                <TableCell className="xl:pr-7.5">
                  <div className="flex items-center justify-end gap-x-3.5">
                    <button className="hover:text-primary">
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
    </div>
  );
};

export default page;
