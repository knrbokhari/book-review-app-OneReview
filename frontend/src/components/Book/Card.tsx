import { renderStars } from "@/lib/renderStars";

export default function BookCard({ product }: any) {
  const book = {
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: 4.5,
    coverImage: "/api/placeholder/240/360",
    price: "$16.99",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
  };

  return (
    <div className="bg-white- m-4 mx-auto max-w-md overflow-hidden rounded-xl shadow-md md:max-w-2xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-full w-full object-cover md:w-48"
            src={book.coverImage}
            alt={book.title}
          />
        </div>
        <div className="p-8">
          <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
            Book
          </div>
          <h1 className="mt-1 block text-xl font-medium leading-tight text-black">
            {book.title}
          </h1>
          <p className="mt-2 text-gray-500">by {book.author}</p>
          <div className="mt-2 flex items-center">
            {renderStars(book.rating)}
            <span className="ml-2 text-gray-600">{book.rating} out of 5</span>
          </div>
          <p className="mt-4 font-bold text-gray-900">{book.price}</p>
        </div>
      </div>
    </div>
  );
}
