import { useState } from "react";
import { Search, BookOpen, Star, Library, BookMarked } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BookReviewHero() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div
      className="relative text-white dark:bg-sky-900/35"
      style={{
        backgroundImage: "url('/images/home/home7.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container relative mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          {/* Hero Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Your Personal Reading Journey
            </h1>
            <p className="mb-6 text-xl text-sky-100 md:text-2xl">
              Track your reads, discover new books, and share your thoughts with
              a community of book lovers.
            </p>

            {/* Search Bar */}
            <div className="relative mx-auto mb-8 max-w-lg md:mx-0">
              <input
                type="text"
                placeholder="Search for books, authors, or genres..."
                className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-3 pl-12 text-white backdrop-blur-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-4 top-3.5 text-sky-200"
                size={20}
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <Link href="/auth/sign-up">
                <button
                  className="rounded-full bg-sky-500 px-8 py-3 font-medium text-white transition-colors hover:bg-sky-600"
                  style={{ backgroundColor: "#13abfd" }}
                >
                  Create Account
                </button>
              </Link>
              <Link href="/book">
                <button className="rounded-full border border-sky-300 bg-transparent px-8 py-3 font-medium text-white transition-colors hover:bg-white/10">
                  Browse Books
                </button>
              </Link>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative mt-8 flex-1 md:mt-0">
            <div className="relative h-64 md:h-96">
              {/* Floating Book Elements */}
              <div
                className="absolute left-12 top-8 z-10 h-64 w-48 rotate-6 transform rounded-lg shadow-xl md:left-24"
                style={{ backgroundColor: "#13abfd" }}
              >
                <Image
                  className="rounded bg-gradient-to-br from-slate-800 to-slate-900 shadow-3"
                  src="/images/home/book3.jpg"
                  width={192}
                  alt="books"
                  height={256}
                />
              </div>

              <div
                className="absolute left-24 top-16 z-20 h-64 w-48 -rotate-6 transform rounded-lg bg-gradient-to-br from-sky-600 to-sky-400 shadow-xl md:left-48"
                style={{ backgroundColor: "#13abfd" }}
              >
                <Image
                  className="rounded bg-gradient-to-br from-slate-800 to-slate-900 shadow-3"
                  src="/images/home/book2.jpg"
                  width={192}
                  alt="books"
                  height={256}
                />
              </div>

              <div
                className="absolute left-32 top-4 z-30 h-64 w-48 rotate-12 transform rounded-lg bg-gradient-to-br from-sky-600 to-sky-400 shadow-xl md:left-72"
                style={{ backgroundColor: "#13abfd" }}
              >
                <Image
                  className="rounded bg-gradient-to-br from-slate-800 to-slate-900 shadow-3"
                  src="/images/home/book1.jpg"
                  width={192}
                  alt="books"
                  height={256}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights - Moved to horizontally across the bottom with background image */}
      <div className="relative mt-8 bg-slate-900/80 py-8 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: "#13abfd" }}
              >
                <BookOpen className="text-white" size={24} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold">Personal Library</h3>
                <p className="text-sky-100">Build your collection of books</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: "#13abfd" }}
              >
                <Star className="text-white" size={24} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold">Read & Review</h3>
                <p className="text-sky-100">
                  Share thoughts on your favorite books
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: "#13abfd" }}
              >
                <Library className="text-white" size={24} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold">Track Progress</h3>
                <p className="text-sky-100">Monitor your reading journey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
