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
      name: "naeem",
      image: null,
      created_at: null,
      products_count: 0,
    },
  ];
  return (
    <div>
      <Breadcrumb pageName="Authors" />

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
            {data.map((item, index) => (
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
                    <button className="hover:text-primary">
                      <span className="sr-only">View Invoice</span>
                      <Edit size={18} />
                    </button>

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
