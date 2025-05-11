"use client";

import CategoryForm from "@/components/Category/category-from";
import React from "react";

const page = () => {
  return (
    <>
      <div className="border-border-base flex border-b border-dashed py-5 sm:py-8">
        <h1 className="text-heading text-lg font-semibold">Create Category</h1>
      </div>
      <CategoryForm initialValues={null} />
    </>
  );
};

export default page;
