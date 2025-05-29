"use client";

import { useEffect, useState } from "react";
import cn from "classnames";
import RatingsBadge from "../ui/rating-badge";
import Spinner from "../ui/spinner/spinner";
import Sorting from "./sorting";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useCreateReviewMutation, useReviewListQuery } from "@/apis/reviews";
import ReviewCard from "./review-card";
import Pagination from "../ui/pagination";
import Button from "../ui/button";
import CustomModal from "../ui/modal/common-modal";
import Label from "../ui/label";
import TextArea from "../ui/text-area";
import RateInput from "./rate-input";
import { Form } from "react-hook-form";
import Image from "next/image";
import { productPlaceholder } from "@/lib/placeholders";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { renderStars } from "@/lib/renderStars";

type ProductReviewsProps = {
  className?: any;
  product: any;
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

const reviewFormSchema = yup.object().shape({
  rating: yup.number().min(1, "Rating is required").required(),
  comment: yup.string().required("Comment is required"),
});

const ProductReviews: React.FC<ProductReviewsProps> = ({ product }) => {
  const router = useRouter();
  // const { query } = usePathname();
  // const { text, ...restQuery } = query;
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const { reviews, isLoading, paginatorInfo }: any = useReviewListQuery({
    bookId: product?.id,
    limit: 5,
    page,
  });

  const { mutate: createReview, isPending: creating } =
    useCreateReviewMutation();

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

  const methods = useForm({
    resolver: yupResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (value: any) => {
    createReview(
      {
        rating: value?.rating,
        content: value?.comment,
        bookId: product?.id,
        title: product?.name,
      },
      {
        onSuccess: async (data: any) => {
          setOpen(false);
        },
      },
    );
  };

  const boxedLayout = true;

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
          <div className="border-border-200 flex flex-col items-center gap-2 border-opacity-70 py-3 sm:space-y-1 lg:flex-row lg:space-y-0 lg:!border-0 lg:py-0 ltr:sm:border-l rtl:sm:border-r">
            <Button onClick={() => setOpen(true)}>Add Review</Button>
            <div className="border-border-200 hidden w-full shrink-0 border-opacity-70 lg:block lg:w-auto lg:py-5 ltr:sm:pl-8 ltr:sm:pr-5 ltr:lg:border-l rtl:sm:pl-5 rtl:sm:pr-8 rtl:lg:border-r">
              <Sorting />
            </div>
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
            {reviews?.map((review: any) => (
              <ReviewCard key={`review-no-${review?.id}`} review={review} />
            ))}

            {paginatorInfo && (
              <div className="border-border-200 flex items-center justify-between border-t border-opacity-70 py-4">
                <div className="text-xs text-gray-400">
                  Page {paginatorInfo.currentPage} Of{" "}
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
            )}
          </div>
        </div>
      ) : (
        <div className="border-border-200 flex flex-col items-center justify-center border-b border-opacity-70 px-5 py-16">
          <h3 className="text-lg font-semibold text-gray-400">
            No reviews found
          </h3>
        </div>
      )}

      <CustomModal
        isOpen={open}
        onClose={() => setOpen(false)}
        size="md"
        title="Add Review"
        variant="default"
      >
        <div className="bg-light flex w-full flex-col justify-center md:rounded-xl">
          <div className="border-border-200 flex items-center gap-2 border-b p-7">
            <div className="flex shrink-0">
              <Image
                src={product?.image ? product?.image : productPlaceholder}
                alt={product?.name}
                width={90}
                height={90}
                className="inline-flex rounded bg-black"
              />
            </div>
            <div className="ltr:pl-6 rtl:pr-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {product?.name}
              </h1>
              <div className="mt-2 text-lg text-gray-600 dark:text-white">
                by {product?.author?.name}
              </div>

              <div className="mt-4 flex items-center dark:text-white">
                <div className="flex">{renderStars(product?.ratings)}</div>
                <span className="ml-2 text-gray-700 dark:text-white">
                  {product?.ratings}
                </span>
                <span className="mx-2 text-gray-400 dark:text-white">•</span>
                <span className="text-gray-700 dark:text-white">
                  {product?.totalReviews?.toLocaleString()} reviews
                </span>
              </div>
            </div>
          </div>
          <div className="mt-5 w-full">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <Label className="mb-2">Ratings</Label>
                  <RateInput
                    control={control}
                    name="rating"
                    defaultValue={0}
                    style={{ fontSize: 30 }}
                    allowClear={false}
                  />
                </div>

                <TextArea
                  label="Comment"
                  {...register("comment")}
                  variant="outline"
                  className="mb-5 w-full"
                  error={errors.comment?.message}
                />

                <div className="mt-8">
                  <Button type="submit" className="h-11 w-full sm:h-12">
                    Submit
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default ProductReviews;
