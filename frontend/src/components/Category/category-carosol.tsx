import React from "react";
import ErrorMessage from "../ui/error-message";
import NewSectionBlock from "../ui/new-section-block";
import NotFound from "../ui/not-found";
import rangeMap from "@/lib/range-map";
import Carousel from "../ui/carousel";
import CategoryLoader from "./category-loader";
import CategoryCard from "./category-card";

interface Props {
  products: any;
  title: string;
  gridClassName?: string;
  isLoading: any;
  error: any;
  errorText: any;
}

const breakpoints = {
  320: {
    slidesPerView: 2,
  },

  600: {
    slidesPerView: 2,
  },

  960: {
    slidesPerView: 3,
  },

  1280: {
    slidesPerView: 4,
  },

  1600: {
    slidesPerView: 5,
  },
  2600: {
    slidesPerView: 7,
  },
};

const CategoryCarousel = ({
  products,
  title,
  isLoading,
  error,
  errorText,
}: Props) => {
  if (error) return <ErrorMessage message={error.message} />;
  if (!isLoading && !products.length) {
    return (
      <NewSectionBlock title={title}>
        <NotFound text={errorText} className="mx-auto w-7/12" />
      </NewSectionBlock>
    );
  }

  return (
    <NewSectionBlock title={title}>
      {isLoading && !products.length ? (
        <div className="3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]- grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:gap-8 xl:gap-y-11 2xl:grid-cols-6">
          {rangeMap(6, (i) => (
            <CategoryLoader key={i} uniqueKey={i} />
          ))}
        </div>
      ) : (
        <div>
          <Carousel
            items={products}
            breakpoints={breakpoints}
            spaceBetween={20}
            className="-mt-6 pt-4"
          >
            {(item: any) => <CategoryCard item={item} />}
          </Carousel>
        </div>
      )}
    </NewSectionBlock>
  );
};

export default CategoryCarousel;
