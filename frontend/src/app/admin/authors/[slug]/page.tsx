"use client";

import { useAuthorQuery } from "@/apis/authors";
import AuthorForm from "@/components/Authors/author-form";
import ErrorMessage from "@/components/ui/error-message";
import { Loader } from "@/components/ui/spinner/spinner";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const { author, loading, error } = useAuthorQuery(slug);

  console.log(author);

  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="border-border-base flex border-b border-dashed py-5 sm:py-8">
        <h1 className="text-heading text-lg font-semibold">Update Author</h1>
      </div>
      <AuthorForm initialValues={author} />
    </>
  );
};

export default page;
