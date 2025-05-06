"use client";

import React, { useState } from "react";

const page = () => {
  const [filter, setFilter] = useState("all");

  const books = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "/api/placeholder/200/300",
      rating: 4.5,
      genre: "fiction",
      snippet:
        "A dazzling novel about all the choices that go into a life well lived.",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "/api/placeholder/200/300",
      rating: 5,
      genre: "non-fiction",
      snippet:
        "Tiny changes, remarkable results: an easy and proven way to build good habits and break bad ones.",
    },
    {
      id: 3,
      title: "Project Hail Mary",
      author: "Andy Weir",
      cover: "/api/placeholder/200/300",
      rating: 4.8,
      genre: "sci-fi",
      snippet:
        "A lone astronaut must save the earth from disaster in this incredible new science-based thriller.",
    },
    {
      id: 4,
      title: "Educated",
      author: "Tara Westover",
      cover: "/api/placeholder/200/300",
      rating: 4.7,
      genre: "memoir",
      snippet:
        "An unforgettable memoir about a young girl who kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    },
    {
      id: 5,
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      cover: "/api/placeholder/200/300",
      rating: 4.2,
      genre: "mystery",
      snippet:
        "Four septuagenarians with a few tricks up their sleeves, a female cop with her first big case, and a brutal murder.",
    },
    {
      id: 6,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      cover: "/api/placeholder/200/300",
      rating: 4.3,
      genre: "fiction",
      snippet:
        "A story of love, sacrifice, and what it means to be human, told from the perspective of an Artificial Friend.",
    },
  ];

  const featuredReview = {
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "/api/placeholder/300/450",
    rating: 4.5,
    reviewText:
      "In 'The Midnight Library,' Matt Haig delivers a captivating narrative that explores the infinite possibilities of life through the eyes of Nora Seed. When Nora finds herself in a library between life and death, she gets to try the different versions of her life that could have been. This novel beautifully examines regret, hope, and the ripple effects of our choices with compassion and insight. Haig's prose is accessible yet profound, making complex philosophical concepts digestible and emotionally resonant. A must-read for anyone who has ever wondered 'what if?'",
    reviewer: "Emma Thompson",
    date: "April 15, 2025",
  };

  const filteredBooks =
    filter === "all" ? books : books.filter((book) => book.genre === filter);

  return (
    <div>
      <section className="bg-blue-900 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold">Find Your Next Great Read</h1>
          <p className="mb-8 text-xl">
            Expert reviews and recommendations for every reader
          </p>
          <div className="relative mx-auto max-w-md">
            <input
              type="text"
              placeholder="Search for books or authors..."
              className="w-full rounded-lg px-4 py-3 text-gray-800 focus:outline-none"
            />
            <button className="absolute right-0 top-0 rounded-r-lg bg-blue-600 px-6 py-3 text-white">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Review */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Featured Review
          </h2>
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="lg:flex">
              <div className="lg:w-1/3">
                <img
                  src={featuredReview.cover}
                  alt={`Cover of ${featuredReview.title}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8 lg:w-2/3">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {featuredReview.title}
                    </h3>
                    <p className="text-gray-600">by {featuredReview.author}</p>
                  </div>
                  <div className="rounded-full bg-yellow-400 px-3 py-1 text-lg font-bold text-yellow-800">
                    {featuredReview.rating}/5
                  </div>
                </div>
                <p className="mb-6 leading-relaxed text-gray-800">
                  {featuredReview.reviewText}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-gray-600">
                    <span>Reviewed by {featuredReview.reviewer}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredReview.date}</span>
                  </div>
                  <button className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white">
                    Read Full Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Reviews */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Latest Reviews</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter("all")}
                className={`rounded px-4 py-2 ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("fiction")}
                className={`rounded px-4 py-2 ${filter === "fiction" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                Fiction
              </button>
              <button
                onClick={() => setFilter("non-fiction")}
                className={`rounded px-4 py-2 ${filter === "non-fiction" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                Non-Fiction
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <div className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105">
                <img
                  src={book.cover}
                  alt={`Cover of ${book.title}`}
                  className="h-64 w-full object-cover"
                />
                <div className="p-6">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="text-xl font-bold">{book.title}</h3>
                    <div className="rounded-full bg-yellow-400 px-2 py-1 text-sm font-bold text-yellow-800">
                      {book.rating}/5
                    </div>
                  </div>
                  <p className="mb-4 text-gray-600">by {book.author}</p>
                  <p className="mb-4 text-gray-700">{book.snippet}</p>
                  <button className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">
                    Read Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-900 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
          <p className="mb-6">
            Subscribe to our newsletter for weekly book recommendations
          </p>
          <div className="mx-auto flex max-w-md">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow rounded-l-lg px-4 py-3 text-gray-800 focus:outline-none"
            />
            <button className="rounded-r-lg bg-blue-600 px-6 py-3 font-semibold text-white">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
