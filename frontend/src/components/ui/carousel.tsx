"use client";

import React, { useRef, useState } from "react";
import { useIsRTL } from "@/lib/locals";

import {
  Swiper,
  SwiperSlide,
  Navigation,
  SwiperOptions,
} from "@/components/ui/slider";
import classNames from "classnames";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps extends SwiperOptions {
  items: any[];
  children: (item: { [key: string]: any }) => React.ReactNode;
  className?: string;
}

/**
 * Common carousel
 * @param items any[]
 * @param children (item: { [key: string]: any }) => React.ReactNode
 * @param className string
 * @param rest SwiperOptions
 * @returns
 */

const Carousel = ({ items, children, className, ...rest }: CarouselProps) => {
  const { isRTL } = useIsRTL();

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const breakpoints = {
    320: {
      slidesPerView: 3,
      spaceBetween: 10,
    },

    480: {
      slidesPerView: 3,
      spaceBetween: 20,
    },

    700: {
      slidesPerView: 3,
    },

    900: {
      slidesPerView: 4,
    },

    1100: {
      slidesPerView: 4,
    },

    1280: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    1700: {
      slidesPerView: 8,
      spaceBetween: 30,
    },
    2600: {
      slidesPerView: 10,
      spaceBetween: 40,
    },
  };

  return (
    <div className={classNames("relative", className)}>
      <Swiper
        id="author-card-menu"
        modules={[Navigation]}
        navigation={{
          prevEl,
          nextEl,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
        }}
        breakpoints={breakpoints}
        {...rest}
      >
        {items?.map((item: any, idx: number) => (
          <SwiperSlide key={idx} className="carousel-slide py-2">
            {children(item)}
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        ref={(node) => setPrevEl(node)}
        className="author-slider-prev bg-light text-heading shadow-300 absolute top-1/2 z-[5] -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full outline-none transition-colors hover:text-orange-500 focus:outline-none ltr:-left-3 ltr:lg:-left-4 rtl:-right-3 rtl:lg:-right-4"
      >
        <span className="sr-only">Previous</span>
        {isRTL ? <ChevronRight /> : <ChevronLeft />}
      </div>
      <div
        ref={(node) => setNextEl(node)}
        className="author-slider-next bg-light text-heading shadow-300 absolute top-1/2 z-[5] -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full outline-none transition-colors hover:text-orange-500 focus:outline-none ltr:-right-3 ltr:lg:-right-4 rtl:-left-3 rtl:lg:-left-4"
      >
        <span className="sr-only">Next</span>
        {isRTL ? <ChevronLeft /> : <ChevronRight />}
      </div>
    </div>
  );
};

export default Carousel;
