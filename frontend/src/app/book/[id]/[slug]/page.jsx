import BookCarousel from "@/components/Book/BookCarousel";
import BookDetails from "@/components/Book/BookDetails";
import AverageRatings from "@/components/reviews/average-ratings";
import ProductReviews from "@/components/reviews/book-reviews";
import React from "react";
// import { Element } from "react-scroll";

const page = () => {
  const product = {
    id: 1,
    name: "The Great Gatsby",
    reviews: 4.5,
    total_reviews: 100,
    ratings: [
      { star: 5, count: 60 },
      { star: 4, count: 20 },
      { star: 3, count: 10 },
      { star: 2, count: 5 },
      { star: 1, count: 5 },
    ],
    type: {
      slug: "fiction",
    },
  };
  return (
    <div>
      <BookDetails />

      <BookCarousel isLoading={false} title="Related Books" products={[]} />

      <div className="">
        {/* <Element name="book-reviews"> */}
        <h2 className="mb-5 ml-5 text-2xl">Ratings & Reviews</h2>
        {/* <AverageRatings
          title={"product?.name"}
          ratingCount={[{ rating: 5 }] || product?.reviews}
          totalReviews={0 || product?.total_reviews}
          ratings={0 || product?.ratings}
        /> */}
        <ProductReviews
          productId={product?.id}
          productType={product?.type?.slug}
        />
        {/* </Element> */}
      </div>
    </div>
  );
};

export default page;
