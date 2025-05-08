"use client";

import AuthorForm from "@/components/Authors/author-form";
import React from "react";

const page = () => {
  return (
    <>
      <div className="border-border-base flex border-b border-dashed py-5 sm:py-8">
        <h1 className="text-heading text-lg font-semibold">Create Author</h1>
      </div>
      <AuthorForm initialValues={null} />
    </>
  );
};

export default page;
