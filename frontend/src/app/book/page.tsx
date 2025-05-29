"use client";

import { useBookListQuery } from "@/apis/book";
import BookCard from "@/components/Book/Card";
import Pagination from "@/components/ui/pagination";
import { Loader } from "@/components/ui/spinner/spinner";
import React, { useState } from "react";

const page = () => {
  const [page, setPage] = useState(1);
  const { books, paginatorInfo, loading } = useBookListQuery({
    limit: 18,
    page,
  });

  function handlePagination(current: number) {
    setPage(current);
  }

  if (loading) return <Loader text="Loading..." />;

  return (
    <div className="container mx-auto mt-10">
      <h2 className="mb-5 text-[26px] font-bold leading-[30px] text-dark dark:text-white">
        All Books
      </h2>
      <hr />
      <div className="3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]- grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:gap-8 xl:gap-y-11 2xl:grid-cols-6">
        {books.map((item: any) => (
          <BookCard product={item} />
        ))}
      </div>

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
  );
};

export default page;
