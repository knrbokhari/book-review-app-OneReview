"use client";

import { useNewBooksQuery, usePopularBooksQuery } from "@/apis/book";
import { usePopularCategoryQuery } from "@/apis/category";
import BookCarousel from "@/components/Book/BookCarousel";
import CategoryCarousel from "@/components/Category/category-carosol";
import NewsletterSignup from "@/components/Home/Newsletter";
import WhatReadersAreSaying from "@/components/Home/WhatReadersAreSaying";
import BookReviewHero from "@/components/ui/HeroSections";
import React, { useState } from "react";

export const books = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    publisher: "Viking",
    rating: 4.5,
    image: "https://images.example.com/the-midnight-library.jpg",
    price: "$16.99",
    description:
      "Between life and death, there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    publisher: "Avery",
    rating: 4.8,
    image: "https://images.example.com/atomic-habits.jpg",
    price: "$11.98",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    publisher: "Free Press",
    rating: 4.6,
    image: "https://images.example.com/7-habits.jpg",
    price: "$14.99",
    description: "Powerful Lessons in Personal Change.",
  },
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    publisher: "Simon & Schuster",
    rating: 4.7,
    image: "https://images.example.com/how-to-win-friends.jpg",
    price: "$10.99",
    description: "The only book you need to lead you to success.",
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    publisher: "New World Library",
    rating: 4.6,
    image: "https://images.example.com/power-of-now.jpg",
    price: "$9.99",
    description: "A Guide to Spiritual Enlightenment.",
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    publisher: "Harper",
    rating: 4.5,
    image: "https://images.example.com/subtle-art.jpg",
    price: "$12.99",
    description: "A Counterintuitive Approach to Living a Good Life.",
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    publisher: "The Ralston Society",
    rating: 4.4,
    image: "https://images.example.com/think-and-grow-rich.jpg",
    price: "$7.99",
    description:
      "The Landmark Bestseller Now Revised and Updated for the 21st Century.",
  },
  {
    title: "You Are a Badass",
    author: "Jen Sincero",
    publisher: "Running Press",
    rating: 4.5,
    image: "https://images.example.com/you-are-a-badass.jpg",
    price: "$13.99",
    description:
      "How to Stop Doubting Your Greatness and Start Living an Awesome Life.",
  },
  {
    title: "Awaken the Giant Within",
    author: "Tony Robbins",
    publisher: "Free Press",
    rating: 4.6,
    image: "https://images.example.com/awaken-the-giant.jpg",
    price: "$15.99",
    description:
      "How to Take Immediate Control of Your Mental, Emotional, Physical and Financial Destiny!",
  },
  {
    title: "The Four Agreements",
    author: "Don Miguel Ruiz",
    publisher: "Amber-Allen Publishing",
    rating: 4.7,
    image: "https://images.example.com/four-agreements.jpg",
    price: "$8.99",
    description: "A Practical Guide to Personal Freedom.",
  },
  {
    title: "Daring Greatly",
    author: "Brené Brown",
    publisher: "Gotham Books",
    rating: 4.6,
    image: "https://images.example.com/daring-greatly.jpg",
    price: "$14.99",
    description:
      "How the Courage to Be Vulnerable Transforms the Way We Live, Love, Parent, and Lead.",
  },
  {
    title: "Mindset",
    author: "Carol S. Dweck",
    publisher: "Ballantine Books",
    rating: 4.5,
    image: "https://images.example.com/mindset.jpg",
    price: "$10.99",
    description: "The New Psychology of Success.",
  },
  {
    title: "The Power of Habit",
    author: "Charles Duhigg",
    publisher: "Random House",
    rating: 4.6,
    image: "https://images.example.com/power-of-habit.jpg",
    price: "$11.99",
    description: "Why We Do What We Do in Life and Business.",
  },
  {
    title: "Grit",
    author: "Angela Duckworth",
    publisher: "Scribner",
    rating: 4.5,
    image: "https://images.example.com/grit.jpg",
    price: "$13.99",
    description: "The Power of Passion and Perseverance.",
  },
  {
    title: "Drive",
    author: "Daniel H. Pink",
    publisher: "Riverhead Books",
    rating: 4.4,
    image: "https://images.example.com/drive.jpg",
    price: "$12.99",
    description: "The Surprising Truth About What Motivates Us.",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    publisher: "Grand Central Publishing",
    rating: 4.6,
    image: "https://images.example.com/deep-work.jpg",
    price: "$14.99",
    description: "Rules for Focused Success in a Distracted World.",
  },
  {
    title: "Can't Hurt Me",
    author: "David Goggins",
    publisher: "Lioncrest Publishing",
    rating: 4.8,
    image: "https://images.example.com/cant-hurt-me.jpg",
    price: "$17.99",
    description: "Master Your Mind and Defy the Odds.",
  },
  {
    title: "The Miracle Morning",
    author: "Hal Elrod",
    publisher: "Hal Elrod",
    rating: 4.5,
    image: "https://images.example.com/miracle-morning.jpg",
    price: "$12.99",
    description:
      "The Not-So-Obvious Secret Guaranteed to Transform Your Life (Before 8AM).",
  },
  {
    title: "The Life-Changing Magic of Tidying Up",
    author: "Marie Kondo",
    publisher: "Ten Speed Press",
    rating: 4.6,
    image: "https://images.example.com/life-changing-magic.jpg",
    price: "$9.99",
    description: "The Japanese Art of Decluttering and Organizing.",
  },
  {
    title: "Essentialism",
    author: "Greg McKeown",
    publisher: "Crown Business",
    rating: 4.5,
    image: "https://images.example.com/essentialism.jpg",
    price: "$13.99",
    description: "The Disciplined Pursuit of Less.",
  },
  {
    title: "The Untethered Soul",
    author: "Michael A. Singer",
    publisher: "New Harbinger Publications",
    rating: 4.7,
    image: "https://images.example.com/untethered-soul.jpg",
    price: "$10.99",
    description: "The Journey Beyond Yourself.",
  },
  {
    title: "The Gifts of Imperfection",
    author: "Brené Brown",
    publisher: "Hazelden Publishing",
    rating: 4.6,
    image: "https://images.example.com/gifts-of-imperfection.jpg",
    price: "$11.99",
    description:
      "Let Go of Who You Think You're Supposed to Be and Embrace Who You Are.",
  },
  {
    title: "Start with Why",
    author: "Simon Sinek",
    publisher: "Portfolio",
    rating: 4.5,
    image: "https://images.example.com/start-with-why.jpg",
    price: "$14.99",
    description: "How Great Leaders Inspire Everyone to Take Action.",
  },
  {
    title: "The 5 Second Rule",
    author: "Mel Robbins",
    publisher: "Savio Republic",
    rating: 4.4,
    image: "https://images.example.com/5-second-rule.jpg",
    price: "$13.99",
    description:
      "Transform your Life, Work, and Confidence with Everyday Courage.",
  },
  {
    title: "The Magic of Thinking Big",
    author: "David J. Schwartz",
    publisher: "Simon & Schuster",
    rating: 4.6,
    image: "https://images.example.com/magic-of-thinking-big.jpg",
    price: "$10.99",
    description:
      "Acquire the secrets of success... achieve everything you've always wanted.",
  },
  {
    title: "The Success Principles",
    author: "Jack Canfield",
    publisher: "HarperCollins",
    rating: 4.5,
    image: "https://images.example.com/success-principles.jpg",
    price: "$15.99",
    description: "How to Get from Where You Are to Where You Want to Be.",
  },
  {
    title: "The War of Art",
    author: "Steven Pressfield",
    publisher: "Black Irish Entertainment",
    rating: 4.7,
    image: "https://images.example.com/the-war-of-art.jpg",
    price: "$13.49",
    description:
      "Break Through the Blocks and Win Your Inner Creative Battles.",
  },
  {
    title: "Tools of Titans",
    author: "Tim Ferriss",
    publisher: "Houghton Mifflin Harcourt",
    rating: 4.6,
    image: "https://images.example.com/tools-of-titans.jpg",
    price: "$18.99",
    description:
      "The Tactics, Routines, and Habits of Billionaires, Icons, and World-Class Performers.",
  },
  {
    title: "Ego is the Enemy",
    author: "Ryan Holiday",
    publisher: "Portfolio",
    rating: 4.6,
    image: "https://images.example.com/ego-is-the-enemy.jpg",
    price: "$11.99",
    description: "The fight against ego that everyone must face.",
  },
  {
    title: "Stillness Is the Key",
    author: "Ryan Holiday",
    publisher: "Portfolio",
    rating: 4.7,
    image: "https://images.example.com/stillness-is-the-key.jpg",
    price: "$13.99",
    description:
      "Unlock the ancient art of stillness to become more focused and grounded.",
  },
  {
    title: "Discipline Equals Freedom",
    author: "Jocko Willink",
    publisher: "St. Martin's Press",
    rating: 4.8,
    image: "https://images.example.com/discipline-equals-freedom.jpg",
    price: "$17.49",
    description: "Field Manual for mental and physical toughness.",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    publisher: "HarperOne",
    rating: 4.7,
    image: "https://images.example.com/the-alchemist.jpg",
    price: "$10.99",
    description: "A magical fable about following your dreams.",
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    publisher: "Beacon Press",
    rating: 4.8,
    image: "https://images.example.com/mans-search-for-meaning.jpg",
    price: "$9.99",
    description:
      "A Holocaust survivor’s guide to discovering purpose through suffering.",
  },
  {
    title: "Who Moved My Cheese?",
    author: "Spencer Johnson",
    publisher: "Putnam Adult",
    rating: 4.4,
    image: "https://images.example.com/who-moved-my-cheese.jpg",
    price: "$9.49",
    description:
      "An amazing way to deal with change in your work and in your life.",
  },
  {
    title: "Unlimited Power",
    author: "Tony Robbins",
    publisher: "Free Press",
    rating: 4.6,
    image: "https://images.example.com/unlimited-power.jpg",
    price: "$13.99",
    description: "The new science of personal achievement.",
  },
  {
    title: "Make Your Bed",
    author: "Admiral William H. McRaven",
    publisher: "Grand Central Publishing",
    rating: 4.7,
    image: "https://images.example.com/make-your-bed.jpg",
    price: "$11.99",
    description:
      "Little things that can change your life... and maybe the world.",
  },
  {
    title: "Principles",
    author: "Ray Dalio",
    publisher: "Simon & Schuster",
    rating: 4.5,
    image: "https://images.example.com/principles.jpg",
    price: "$19.99",
    description:
      "Life and work principles from the legendary investor and entrepreneur.",
  },
  {
    title: "Born to Win",
    author: "Zig Ziglar",
    publisher: "Revell",
    rating: 4.6,
    image: "https://images.example.com/born-to-win.jpg",
    price: "$12.99",
    description: "Find your success code and claim your destiny.",
  },
  {
    title: "Your Best Year Ever",
    author: "Michael Hyatt",
    publisher: "Baker Books",
    rating: 4.5,
    image: "https://images.example.com/your-best-year-ever.jpg",
    price: "$13.99",
    description: "A 5-Step Plan for Achieving Your Most Important Goals.",
  },
  {
    title: "The Confidence Code",
    author: "Katty Kay & Claire Shipman",
    publisher: "HarperBusiness",
    rating: 4.4,
    image: "https://images.example.com/the-confidence-code.jpg",
    price: "$11.99",
    description:
      "The Science and Art of Self-Assurance—What Women Should Know.",
  },
  {
    title: "Boundaries",
    author: "Dr. Henry Cloud & Dr. John Townsend",
    publisher: "Zondervan",
    rating: 4.7,
    image: "https://images.example.com/boundaries.jpg",
    price: "$13.49",
    description: "When to Say Yes, How to Say No to Take Control of Your Life.",
  },
  {
    title: "Think Like a Monk",
    author: "Jay Shetty",
    publisher: "Simon & Schuster",
    rating: 4.6,
    image: "https://images.example.com/think-like-a-monk.jpg",
    price: "$14.99",
    description: "Train your mind for peace and purpose every day.",
  },
  {
    title: "Get Out of Your Head",
    author: "Jennie Allen",
    publisher: "WaterBrook",
    rating: 4.7,
    image: "https://images.example.com/get-out-of-your-head.jpg",
    price: "$12.99",
    description: "Stopping the spiral of toxic thoughts.",
  },
  {
    title: "Outliers",
    author: "Malcolm Gladwell",
    publisher: "Little, Brown and Company",
    rating: 4.5,
    image: "https://images.example.com/outliers.jpg",
    price: "$13.49",
    description: "The Story of Success.",
  },
  {
    title: "Switch",
    author: "Chip Heath & Dan Heath",
    publisher: "Crown Business",
    rating: 4.5,
    image: "https://images.example.com/switch.jpg",
    price: "$14.49",
    description: "How to Change Things When Change Is Hard.",
  },
  {
    title: "A New Earth",
    author: "Eckhart Tolle",
    publisher: "Plume",
    rating: 4.6,
    image: "https://images.example.com/a-new-earth.jpg",
    price: "$10.99",
    description: "Awakening to Your Life’s Purpose.",
  },
];

const page = () => {
  const { popularBooks, loading } = usePopularBooksQuery({
    limit: 20,
    page: 1,
  });

  const { newBooks, loading: newLoading } = useNewBooksQuery({
    limit: 20,
    page: 1,
  });

  const { popularCategories, loading: catLoading } = usePopularCategoryQuery({
    limit: 20,
    page: 1,
  });

  return (
    <div>
      <BookReviewHero />

      <div className="container mx-auto mt-10">
        <BookCarousel
          isLoading={loading}
          title="Popular Books"
          products={popularBooks}
          error={undefined}
        />

        <BookCarousel
          isLoading={newLoading}
          title="New Arrival Books"
          products={newBooks}
          error={undefined}
        />

        <CategoryCarousel
          isLoading={catLoading}
          title="Popular Genres"
          products={popularCategories}
          error={undefined}
          errorText="Genres Not Found!"
        />

        {/* <BookCarousel
          isLoading={false}
          title="Popular Genres"
          products={[]}
          error={undefined}
        /> */}

        <CategoryCarousel
          isLoading={false}
          title="Join a Reading Club"
          products={[]}
          error={undefined}
          errorText="Reading Club Not Found!"
        />

        {/* <BookCarousel
          isLoading={false}
          title="What Readers Are Saying"
          products={[]}
          error={undefined}
        /> */}
        <WhatReadersAreSaying />

        <NewsletterSignup />
      </div>
    </div>
  );
};

export default page;
