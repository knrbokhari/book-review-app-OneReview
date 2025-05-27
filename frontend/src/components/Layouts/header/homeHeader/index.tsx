import React, { useState } from "react";
import { ThemeToggleSwitch } from "../theme-toggle";
import { UserInfo } from "../user-info";
import { Menu, X, Book, BookOpen, Users, Star, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";

const HomeHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: "Home", icon: <Home size={20} />, href: "/" },
    { name: "Browse Books", icon: <Book size={20} />, href: "/" },
    { name: "Club", icon: <Book size={20} />, href: "/" },
    // { name: "Reviews", icon: <Star size={20} />, href: "/" },
    // { name: "Authors", icon: <Users size={20} />, href: "/" },
    // { name: "Reading Lists", icon: <BookOpen size={20} />, href: "/" },
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-4 py-3 shadow-md dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
      {/* Logo - Left Side */}
      <div className="flex items-center">
        {/* <div className="flex items-center gap-2 text-xl font-bold">
          <Book className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="hidden sm:inline-block">BookReview</span>
        </div> */}
        <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
          <Image
            src={"/images/logo/logo.png"}
            width={200}
            height={40}
            alt=""
            role="presentation"
          />
        </Link>
      </div>

      {/* Right side items */}
      <div className="flex items-center justify-end gap-2 min-[375px]:gap-4">
        {/* Navigation - Center (desktop only) */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href="#"
                  className="flex items-center gap-1 font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* <ThemeToggleSwitch /> */}
        <div className="shrink-0">
          {Cookies.get("auth_token") ? (
            <UserInfo />
          ) : (
            <Link
              href={"/auth/sign-in"}
              className="flex items-center gap-1 font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="ml-2 lg:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile sidebar drawer */}
      <div
        className={`fixed right-0 top-0 z-40 h-full w-64 bg-white p-5 shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-dark ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button onClick={toggleMobileMenu} aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className="flex items-center gap-3 py-2 font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  {item.icon}
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={toggleMobileMenu}
        />
      )}
    </header>
  );
};

export default HomeHeader;
