import { renderStars } from "@/lib/renderStars";
import Link from "next/link";

export default function BookCard({ product }: any) {
  return (
    <Link href={`/book/${product?.id}/${product?.slug}`}>
      <div className="mx-auto w-full overflow-hidden rounded-xl bg-white shadow-md">
        <div className="">
          <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100">
            <img
              className="h-full w-full"
              src={product?.image || "/images/home/book1.jpg"}
              alt={product?.name || "Book Cover"}
            />
          </div>
          <div className="p-2">
            <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
              {product?.categories?.[0]?.name || "N/A"}
            </div>
            <h1
              title={product.name}
              className="mt-1 block w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-medium leading-tight text-black"
            >
              {product.name}
            </h1>
            <p className="mt-2 text-gray-500">by {product?.author?.name}</p>
            <div className="mt-2 flex items-center">
              {renderStars(product.ratings)}
              <span className="ml-2 text-gray-600">
                {product?.ratings} out of 5
              </span>
            </div>
            <p className="mt-1 font-bold text-gray-900">${product?.price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
