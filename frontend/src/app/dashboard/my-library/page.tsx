import { TrashIcon } from "@/assets/icons";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
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
import React from "react";

const page = () => {
  const data = [
    {
      image: null,
      name: "naeem",
      status: "sdfds",
      ratings: 0,
      totalReviews: 0,
      addedDate: "",
    },
  ];
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
            {data.map((item, index) => (
              <TableRow
                key={index}
                className="border-[#eee] dark:border-dark-3"
              >
                <TableCell className="flex min-w-fit items-center gap-3 pl-5 sm:pl-6 xl:pl-7.5">
                  <Image
                    src={item.image}
                    className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                    width={60}
                    height={50}
                    alt={"Image for " + item.name}
                    role="presentation"
                  />
                  <div>{item.name}</div>
                </TableCell>

                <TableCell>
                  <h5 className="text-dark dark:text-white">{item.ratings}</h5>
                </TableCell>
                <TableCell>
                  <h5 className="text-dark dark:text-white">
                    {item.totalReviews}
                  </h5>
                </TableCell>
                <TableCell>
                  <h5 className="text-dark dark:text-white">
                    {item.addedDate}
                  </h5>
                </TableCell>
                <TableCell>
                  <h5 className="text-dark dark:text-white">{item.status}</h5>
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
      </div>
    </div>
  );
};

export default page;
