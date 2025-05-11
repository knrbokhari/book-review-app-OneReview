"use client";

import BookForm from "@/components/Book/book-from";
import React from "react";

const page = () => {
  return (
    <>
      <div className="border-border-base flex border-b border-dashed py-5 sm:py-8">
        <h1 className="text-heading text-lg font-semibold">Create Book</h1>
      </div>
      <BookForm initialValues={null} />
    </>
  );
};

export default page;
