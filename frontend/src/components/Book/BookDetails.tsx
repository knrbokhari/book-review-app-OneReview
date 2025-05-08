"use client";

import React from "react";
import { renderStars } from "@/lib/renderStars";
import { BookOpen, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function BookDetails() {
  // Sample book data
  const book = {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    publisher: "Free Press",
    rating: 4.6,
    coverImage: "/images/home/book1.jpg",
    price: "$14.99",
    description: "Powerful Lessons in Personal Change.",
    totalReviews: 12467,
    pages: 304,
    summary:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. Would you have done anything different, if you had the chance to undo your regrets? A dazzling novel about all the choices that go into a life well lived.",
    genres: ["Fiction", "Fantasy", "Contemporary"],
  };

  // Reading status options
  const readingStatuses = [
    { id: "want-to-read", label: "Want to Read", icon: BookOpen },
    { id: "reading", label: "Currently Reading", icon: Clock },
    { id: "completed", label: "Completed", icon: CheckCircle },
  ];

  // State for selected reading status
  const [selectedStatus, setSelectedStatus] = useState(null);

  // Function to handle reading status selection
  const handleStatusSelect = (statusId: any) => {
    setSelectedStatus(statusId);
  };

  return (
    <div className="mx-auto my-8 w-full overflow-hidden rounded-xl bg-white p-6 shadow-lg dark:bg-dark-2">
      <div className="gap-8 md:flex">
        {/* Left side - Book image */}
        <div className="mb-6 flex justify-center md:mb-0 md:w-1/3">
          <div className="relative">
            <img
              className="max-h-96 w-full rounded-lg object-cover shadow-md"
              src={book.coverImage}
              alt={book.title}
            />
          </div>
        </div>

        {/* Right side - Book details */}
        <div className="md:w-2/3">
          {/* Title and basic info */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {book.title}
          </h1>
          <div className="mt-2 text-lg text-gray-600 dark:text-white">
            by {book.author}
          </div>

          <div className="mt-4 flex items-center dark:text-white">
            <div className="flex">{renderStars(book.rating)}</div>
            <span className="ml-2 text-gray-700 dark:text-white">
              {book.rating}
            </span>
            <span className="mx-2 text-gray-400 dark:text-white">•</span>
            <span className="text-gray-700 dark:text-white">
              {book.totalReviews.toLocaleString()} reviews
            </span>
          </div>

          {/* <div className="mt-3 text-gray-600">
            <p>Publisher: {book.publisher}</p>
            <p>Publication Date: {book.publicationDate}</p>
            <p>Pages: {book.pages}</p>
          </div> */}

          {/* Genres */}
          <div className="mt-4 flex flex-wrap gap-2">
            {book.genres.map((genre) => (
              <span
                key={genre}
                className="[#2BB5FF] rounded-full bg-[#2bb5ff98] px-3 py-1 text-sm text-white"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Reading status selection */}
          <div className="mt-6">
            <h3 className="mb-3 text-lg font-medium text-gray-900 dark:text-white">
              Reading Status
            </h3>
            <div className="flex flex-wrap gap-3">
              {readingStatuses.map((status) => (
                <button
                  key={status.id}
                  onClick={() => handleStatusSelect(status.id)}
                  className={`flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    selectedStatus === status.id
                      ? "bg-[#2BB5FF] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <status.icon size={16} className="mr-2" />
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6">
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Summary
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-white">
              {book.summary}
            </p>
          </div>

          {/* Call to Action */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-md bg-[#2BB5FF] px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700">
              Add to Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
