import cn from "classnames";
import { StarIcon } from "lucide-react";

type RatingProgressProps = {
  ratingId?: number;
  ratingProgressItem: any;
  totalReviews: number;
  colorClassName?: string;
};

export default function RatingProgressBar({
  ratingId = 0,
  ratingProgressItem,
  totalReviews,
  colorClassName = "bg-[#32b4fc]",
}: RatingProgressProps) {
  return (
    <div className="text-heading flex items-center text-sm">
      <div className="flex w-11 shrink-0 items-center space-x-1 font-semibold rtl:space-x-reverse">
        <span className="text-heading text-sm font-semibold">{ratingId}</span>{" "}
        <StarIcon className="h-2.5 w-2.5 ltr:ml-1.5 rtl:mr-1.5" />
      </div>
      <div className="relative h-[5px] w-52 overflow-hidden rounded-md bg-[#F1F1F1]">
        <div
          className={cn("absolute h-full rounded-md", colorClassName)}
          style={{
            width: `${(ratingProgressItem?.length / totalReviews) * 100}%`,
          }}
        />
      </div>
      <div className="shrink-0 ltr:pl-5 rtl:pr-5">
        {ratingProgressItem?.length ?? 0}
      </div>
    </div>
  );
}
