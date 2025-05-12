import { avatarPlaceholder } from "@/lib/placeholders";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

interface CategoryProps {
  item: any;
  className?: string;
}

const CategoryCard: React.FC<CategoryProps> = ({ item, className }) => {
  return (
    <Link
      href="/"
      className={cn(
        "relative flex cursor-pointer flex-col items-center rounded border border-gray-200 bg-white py-3 shadow-md sm:flex-row sm:p-5",
        className,
      )}
      title={item?.name}
    >
      {item?.image && (
        <span
          className={cn(
            "relative h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-300 md:flex",
          )}
        >
          <Image
            src={item?.image || avatarPlaceholder}
            alt={item?.name!}
            layout="fill"
            objectFit="cover"
          />
        </span>
      )}
      <div className="flex w-full flex-col overflow-hidden px-2 sm:ltr:ml-4 sm:rtl:mr-4">
        <span
          className={`text-heading mx-auto max-w-[140px] overflow-hidden truncate text-ellipsis whitespace-nowrap text-sm font-semibold transition-colors hover:text-[#37B1FC] sm:mb-2 sm:max-w-[200px] sm:text-lg`}
        >
          {item?.name}
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
