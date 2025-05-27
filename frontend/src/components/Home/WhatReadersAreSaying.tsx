import React from "react";
import { Star, Quote } from "lucide-react";

const WhatReadersAreSaying = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      review:
        "This website has completely transformed how I discover new books. The reviews are thoughtful and help me find exactly what I'm looking for!",
      book: "The Seven Husbands of Evelyn Hugo",
      avatar: "SJ",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      review:
        "Amazing community of book lovers! I've found so many hidden gems through the recommendations here. The interface is clean and easy to navigate.",
      book: "Project Hail Mary",
      avatar: "MC",
      date: "1 week ago",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      rating: 4,
      review:
        "Love the detailed reviews and the ability to connect with other readers. It's like having a personal book club at your fingertips!",
      book: "The Midnight Library",
      avatar: "ER",
      date: "3 days ago",
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 5,
      review:
        "The best book review platform I've used. Great variety of genres and honest, helpful reviews from real readers.",
      book: "Dune",
      avatar: "DT",
      date: "5 days ago",
    },
    {
      id: 5,
      name: "Lisa Park",
      rating: 5,
      review:
        "I've discovered my new favorite authors through this site. The personalized recommendations are spot on!",
      book: "The Song of Achilles",
      avatar: "LP",
      date: "1 week ago",
    },
    {
      id: 6,
      name: "James Wilson",
      rating: 4,
      review:
        "Fantastic resource for book enthusiasts. The reviews are detailed and really help with purchasing decisions.",
      book: "The Invisible Life of Addie LaRue",
      avatar: "JW",
      date: "4 days ago",
    },
  ];

  const renderStars = (rating: any) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="bg-gradient-to-br- from-slate-50 to-blue-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            What Readers Are Saying
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Join thousands of book lovers who trust our community for honest
            reviews and recommendations
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Quote Icon */}
              <div className="mb-4 flex items-start justify-between">
                <Quote className="h-6 w-6 text-blue-500 opacity-50" />
                <div className="flex space-x-1">
                  {renderStars(review.rating)}
                </div>
              </div>

              {/* Review Text */}
              <p className="mb-4 leading-relaxed text-gray-700">
                "{review.review}"
              </p>

              {/* Book Title */}
              <p className="mb-4 text-sm font-medium text-blue-600">
                Reading: {review.book}
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-semibold text-white">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-lg">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div>
              <div className="mb-2 text-3xl font-bold text-blue-600 md:text-4xl">
                50K+
              </div>
              <div className="text-gray-600">Book Reviews</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-green-600 md:text-4xl">
                25K+
              </div>
              <div className="text-gray-600">Active Readers</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-purple-600 md:text-4xl">
                4.8
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-orange-600 md:text-4xl">
                15K+
              </div>
              <div className="text-gray-600">Books Cataloged</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col gap-4 sm:flex-row">
            <button className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-700 hover:shadow-xl">
              Join Our Community
            </button>
            <button className="rounded-lg border-2 border-blue-600 bg-white px-8 py-3 font-semibold text-blue-600 transition-colors duration-200 hover:bg-gray-50">
              Browse Reviews
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Free to join • No spam • Unsubscribe anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatReadersAreSaying;
