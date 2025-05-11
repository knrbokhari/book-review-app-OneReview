"use client";

import { useCategoryQuery } from "@/apis/category";
import CategoryForm from "@/components/Category/category-from";
import ErrorMessage from "@/components/ui/error-message";
import { Loader } from "@/components/ui/spinner/spinner";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const { category, loading, error } = useCategoryQuery(slug);

  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="border-border-base flex border-b border-dashed py-5 sm:py-8">
        <h1 className="text-heading text-lg font-semibold">Update Category</h1>
      </div>
      <CategoryForm initialValues={category} />
    </>
  );
};

export default page;
