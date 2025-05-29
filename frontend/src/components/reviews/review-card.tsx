import dayjs from "dayjs";
import Image from "next/image";
import RatingsBadge from "../ui/rating-badge";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Check, ThumbsDown, ThumbsUp } from "lucide-react";

export default function ReviewCard({ review }: any) {
  //   const { createFeedback } = useCreateFeedback();
  //   const { isAuthorized } = useUser();

  const {
    id,
    comment,
    rating,
    photos,
    created_at,
    user,
    negative_feedbacks_count,
    positive_feedbacks_count,
    my_feedback,
    clint_feedback,
    updated_at,
  } = review;
  //   function feedback(value: { positive: boolean } | { negative: boolean }) {
  //     if (!isAuthorized) {
  //       openModal("LOGIN_VIEW");
  //       return;
  //     }
  //     createFeedback({
  //       model_id: id,
  //       model_type: "Review",
  //       ...value,
  //     });
  //   }
  //   function openAbuseReportModal() {
  //     if (!isAuthorized) {
  //       openModal("LOGIN_VIEW");
  //       return;
  //     }
  //     openModal("ABUSE_REPORT", {
  //       model_id: id,
  //       model_type: "Review",
  //     });
  //   }

  //   const handleImageClick = (idx: number) => {
  //     openModal("REVIEW_IMAGE_POPOVER", {
  //       images: photos,
  //       initSlide: idx,
  //     });
  //   };

  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return (
    <div className="border-border-200 border-t border-opacity-70 py-7 first:border-t-0">
      <RatingsBadge rating={rating} className="mb-2.5" />
      <div className="mb-4 flex items-center text-xs text-gray-500">
        By{" "}
        <span className="ml-1 mr-1 text-base font-bold capitalize text-[#16AAFB]">
          {review?.user?.username}
        </span>
        <Check className="h-[13px] w-[13px] text-base text-gray-700" />
      </div>
      <p className="text-heading leading-7 text-dark">{review?.content}</p>

      <div className="flex items-center justify-between">
        <div className="mt-3.5 text-xs text-gray-400">
          Date: {dayjs(created_at).format("DD MMM, YYYY h:mm A")}
        </div>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <button
            className="flex items-center text-xs tracking-wider text-gray-400 transition"
            disabled={my_feedback?.positive}
            // onClick={() => feedback({ positive: true })}
          >
            <ThumbsUp className="mr-1 h-4 w-4" />
            {0}
          </button>
          <button
            className="flex items-center text-xs tracking-wider text-gray-400 transition"
            // onClick={() => feedback({ negative: true })}
            disabled={my_feedback?.negative}
          >
            <ThumbsDown className="mr-1 h-4 w-4" />
            {0}
          </button>

          {/* <Menu
            as="div"
            className="relative inline-block ltr:text-left rtl:text-right"
          >
            <Menu.Button className="group p-2">
              <MenuIcon className="text-gray-400 transition-colors group-hover:text-accent" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="ul"
                className={cn(
                  'absolute mt-2 w-48 overflow-hidden rounded border border-border-200 bg-light py-2 shadow-700 focus:outline-none ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left'
                )}
              >
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={openAbuseReportModal}
                      className={cn(
                        'flex w-full items-center space-x-4 px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none rtl:space-x-reverse',
                        active ? 'text-accent' : 'text-body'
                      )}
                    >
                      {t('text-report-abuse')}
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu> */}
        </div>
      </div>
    </div>
  );
}
