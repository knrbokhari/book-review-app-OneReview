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
      author: "sdfds",
      categories: "",
      publication: "",
      ratings: 0,
      totalReviews: 0,
      publicationDate: "",
    },
  ];
  return (
    <div>
      <Breadcrumb pageName="Books" />

      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead>Book Name</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Publisher</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Publish Date</TableHead>
              <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                className="border-[#eee] dark:border-dark-3"
              >
                <TableCell className="flex min-w-fit items-center gap-3 pl-5 dark:text-white sm:pl-6 xl:pl-7.5">
                  <Image
                    src="/images/home/book1.jpg" //{item.image}
                    className="aspect-[4/6] w-15 rounded-[5px] object-cover"
                    width={40}
                    height={50}
                    alt={"Image for " + item.name}
                    role="presentation"
                  />
                  <div>
                    Atomic Habits
                    {/* {item.name} */}
                  </div>
                </TableCell>

                <TableCell>
                  <h5 className="text-dark dark:text-white">
                    {/* {item.author} */} James Clear
                  </h5>
                </TableCell>

                <TableCell>
                  <h5 className="text-dark dark:text-white">
                    {/* {item.categories} */} Self-help
                  </h5>
                </TableCell>
                <TableCell>
                  <h5 className="text-dark dark:text-white">
                    {/* {item.publication} */} Avery
                  </h5>
                </TableCell>

                <TableCell>
                  <h5 className="text-dark dark:text-white">
                    {/* {item.ratings} */}
                    4.8
                  </h5>
                </TableCell>
                <TableCell>
                  <h5 className="text-dark dark:text-white">
                    {/* {item.totalReviews}  */} 100
                  </h5>
                </TableCell>
                <TableCell>
                  <h5 className="text-dark dark:text-white">
                    {/* {item.publicationDate} */}
                    October 16, 2018
                  </h5>
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
