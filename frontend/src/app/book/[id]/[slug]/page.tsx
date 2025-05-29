"use client";
import { usePathname } from "next/navigation";
import { books } from "@/app/page";
import BookCarousel from "@/components/Book/BookCarousel";
import BookDetails from "@/components/Book/BookDetails";
import AverageRatings from "@/components/reviews/average-ratings";
import ProductReviews from "@/components/reviews/book-reviews";
import React, { ReactElement, ReactNode } from "react";
import { useBookQuery } from "@/apis/book";
// import { Element } from "react-scroll";
// import { InferGetStaticPropsType, NextPage } from "next";
// import { getStaticProps } from "@/apis/book.ssr";
// export { getStaticPaths, getStaticProps } from '@/apis/book.ssr';

// export type NextPageWithLayout<P = {}> = NextPage<P> & {
//   getLayout?: (page: ReactElement) => ReactNode;
// };

// const page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> & {
//   getLayout?: (page: ReactElement) => ReactNode;
// } = ({ book }) =>
const page = () => {
  const pathname = usePathname();
  const { book, loading } = useBookQuery(pathname.split("/")[2]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <BookDetails book={book} />

      {/* <BookCarousel isLoading={false} title="Related Books" products={[]} /> */}

      <div className="">
        {/* <Element name="book-reviews"> */}
        <h2 className="mb-5 ml-5 text-2xl">Ratings & Reviews</h2>
        <AverageRatings
          title={"product?.name"}
          ratingCount={book?.reviews || [{ rating: 5 }]}
          totalReviews={book?.total_reviews}
          ratings={book?.ratings}
        />
        <ProductReviews product={book} />
        {/* </Element> */}
      </div>
    </div>
  );
};

export default page;
