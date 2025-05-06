import React from "react";
import ErrorMessage from "../ui/error-message";
import NewSectionBlock from "../ui/new-section-block";
import NotFound from "../ui/not-found";
import rangeMap from "@/lib/range-map";
import Carousel from "../ui/carousel";
import BookCard from "./Card";
import BookLoader from "./book-loader";

interface Props {
  products: any;
  title: string;
  gridClassName?: string;
  isLoading: any;
  error: any;
}

const breakpoints = {
  280: {
    slidesPerView: 2,
  },

  600: {
    slidesPerView: 3,
  },

  860: {
    slidesPerView: 4,
  },

  1024: {
    slidesPerView: 4,
  },

  1366: {
    slidesPerView: 5,
  },

  1450: {
    slidesPerView: 6,
  },
};

const BookCarousel = ({
  products,
  title,
  gridClassName,
  isLoading,
  error,
}: Props) => {
  if (error) return <ErrorMessage message={error.message} />;
  if (!isLoading && !products.length) {
    return (
      <NewSectionBlock title={title}>
        <NotFound text="Book Not Found" className="mx-auto w-7/12" />
      </NewSectionBlock>
    );
  }

  return (
    <NewSectionBlock title="Related Products">
      {isLoading && !products.length ? (
        <div className="3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]- grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:gap-8 xl:gap-y-11 2xl:grid-cols-6">
          {rangeMap(6, (i) => (
            <BookLoader key={i} uniqueKey={i} />
          ))}
        </div>
      ) : (
        <div>
          <Carousel
            items={products}
            breakpoints={breakpoints}
            spaceBetween={0}
            className="-mt-6 pt-4"
          >
            {(item: any) => <BookCard product={item} />}
          </Carousel>
        </div>
      )}
    </NewSectionBlock>
  );
};

export default BookCarousel;
