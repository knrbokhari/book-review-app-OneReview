"use client";

import { useEffect, useState } from "react";
import cn from "classnames";
import RatingsBadge from "../ui/rating-badge";
import Spinner from "../ui/spinner/spinner";
import Sorting from "./sorting";
import { isEmpty } from "lodash";
import { usePathname, useRouter } from "next/navigation";

type ProductReviewsProps = {
  className?: any;
  productId: string;
  productType?: string;
};

interface Plan {
  id: number | string;
  key: string;
  label: string;
  value: number | string;
}
const plans: Plan[] = [
  {
    id: "1",
    key: "sorting",
    label: "All Star",
    value: "default",
  },
  {
    id: "2",
    key: "sorting",
    label: "5 Star",
    value: "5",
  },
  {
    id: "3",
    key: "sorting",
    label: "4 Star",
    value: "4",
  },
  {
    id: "4",
    key: "sorting",
    label: "3 Star",
    value: "3",
  },
  {
    id: "5",
    key: "sorting",
    label: "2 Star",
    value: "2",
  },
  {
    id: "6",
    key: "sorting",
    label: "1 Star",
    value: "1",
  },
];

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  productType,
}) => {
  const router = useRouter();
  // const { query } = usePathname();
  // const { text, ...restQuery } = query;
  const [page, setPage] = useState(1);
  const { reviews, isLoading, paginatorInfo }: any = {};
  //    useReviews({
  //     product_id: productId,
  //     limit: 5,
  //     page,
  //   });

  useEffect(() => {
    setPage(1);
  }, ["restQuery?.rating"]);

  function onPagination(current: number) {
    setPage(current);
  }

  function handleChange(values: Plan) {
    // const { value } = values;
    // const { rating, ...restQuery } = router.query;
    // router.push(
    //   {
    //     pathname: router.pathname,
    //     query: {
    //       ...restQuery,
    //       ...(value === "default" ? {} : { rating: value }),
    //     },
    //   },
    //   undefined,
    //   { scroll: false },
    // );
  }

  if (isLoading && isEmpty(reviews)) {
    return <Spinner />;
  }

  const boxedLayout = ["books"].includes(productType!);

  return (
    <div>
      <div className="flex gap-3 border-t p-5 md:py-12 lg:px-16">
        <div
          className="w-full sm:w-auto sm:pb-0"
          onClick={() => handleChange(plans[1])}
        >
          <RatingsBadge
            rating={5}
            className="cursor-pointer pl-3 pr-2 font-bold sm:px-3"
            variant="small"
          />
        </div>
        <div
          className="w-full sm:w-auto sm:pb-0"
          onClick={() => handleChange(plans[2])}
        >
          <RatingsBadge
            rating={4}
            className="cursor-pointer pl-3 pr-2 font-bold sm:px-3"
            variant="small"
          />
        </div>
        <div
          className="w-full sm:w-auto sm:pb-0"
          onClick={() => handleChange(plans[3])}
        >
          <RatingsBadge
            rating={3}
            className="cursor-pointer pl-3 pr-2 font-bold sm:px-3"
            variant="small"
          />
        </div>
        <div
          className="w-full sm:w-auto sm:pb-0"
          onClick={() => handleChange(plans[4])}
        >
          <RatingsBadge
            rating={2}
            className="cursor-pointer pl-3 pr-2 font-bold sm:px-3"
            variant="small"
          />
        </div>
        <div
          className="w-full sm:w-auto sm:pb-0"
          onClick={() => handleChange(plans[5])}
        >
          <RatingsBadge
            rating={1}
            className="cursor-pointer pl-3 pr-2 font-bold sm:px-3"
            variant="small"
          />
        </div>
      </div>

      <div
        className={cn("border-border-200 border-b border-t border-opacity-70", {
          "px-5 ltr:lg:pl-16 ltr:lg:pr-10 rtl:lg:pl-10 rtl:lg:pr-16":
            !boxedLayout,
          "px-5 xl:px-0": boxedLayout,
        })}
      >
        <div
          className={cn(
            "flex flex-col justify-between sm:flex-row sm:items-center",
            {
              "mx-auto max-w-screen-xl": boxedLayout,
            },
          )}
        >
          <h2 className="text-heading mt-3 text-lg font-semibold tracking-tight sm:mt-0">
            Reviews ({paginatorInfo?.total ?? 0})
          </h2>
          <div className="border-border-200 flex flex-col items-center border-opacity-70 py-3 sm:space-y-1 lg:flex-row lg:space-y-0 lg:!border-0 lg:py-0 ltr:sm:border-l rtl:sm:border-r">
            <div className="border-border-200 w-full shrink-0 border-opacity-70 lg:w-auto lg:py-5 ltr:sm:pl-8 ltr:sm:pr-5 ltr:lg:border-l rtl:sm:pl-5 rtl:sm:pr-8 rtl:lg:border-r">
              <Sorting />
            </div>
            {/* <div className="w-full shrink-0 border-border-200 border-opacity-70 ltr:sm:pl-8 ltr:sm:pr-5 rtl:sm:pl-5 rtl:sm:pr-8 lg:w-auto lg:py-5 ltr:lg:border-l rtl:lg:border-r">
              <StarFilter />
            </div> */}
          </div>
        </div>
      </div>
      {!isEmpty(reviews) ? (
        <div
          className={cn("border-border-200 border-b border-opacity-70", {
            "px-5 lg:px-16": !boxedLayout,
            "px-5 xl:px-0": boxedLayout,
          })}
        >
          <div
            className={cn({
              "mx-auto max-w-screen-xl": boxedLayout,
            })}
          >
            {/* {reviews?.map((review: any) => (
              <ReviewCard key={`review-no-${review?.id}`} review={review} />
            ))} */}

            {/* {paginatorInfo && (
              <div className="border-border-200 flex items-center justify-between border-t border-opacity-70 py-4">
                <div className="text-xs text-gray-400">
                  {t("text-page")} {paginatorInfo.currentPage} {t("text-of")}{" "}
                  {Math.ceil(paginatorInfo.total / paginatorInfo.perPage)}
                </div>

                <div className="mb-2 flex items-center">
                  <Pagination
                    total={paginatorInfo.total}
                    current={paginatorInfo.currentPage}
                    pageSize={paginatorInfo.perPage}
                    onChange={onPagination}
                  />
                </div>
              </div>
            )} */}
          </div>
        </div>
      ) : (
        <div className="border-border-200 flex flex-col items-center justify-center border-b border-opacity-70 px-5 py-16">
          <h3 className="text-lg font-semibold text-gray-400">
            No reviews found
          </h3>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
