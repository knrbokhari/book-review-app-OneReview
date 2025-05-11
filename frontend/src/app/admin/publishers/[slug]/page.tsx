"use client";

import { usePublisherQuery } from "@/apis/publisher";
import PublisherForm from "@/components/Publisher/publisher-from";
import ErrorMessage from "@/components/ui/error-message";
import { Loader } from "@/components/ui/spinner/spinner";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const { publisher, loading, error } = usePublisherQuery(slug);

  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="border-border-base flex border-b border-dashed py-5 sm:py-8">
        <h1 className="text-heading text-lg font-semibold">Update Author</h1>
      </div>
      <PublisherForm initialValues={publisher} />
    </>
  );
};

export default page;
