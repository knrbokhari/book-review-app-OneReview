"use client";

import PublisherForm from "@/components/Publisher/publisher-from";
import React from "react";

const page = () => {
  return (
    <>
      <div className="border-border-base flex border-b border-dashed py-5 sm:py-8">
        <h1 className="text-heading text-lg font-semibold">Create Publisher</h1>
      </div>
      <PublisherForm initialValues={null} />
    </>
  );
};

export default page;
