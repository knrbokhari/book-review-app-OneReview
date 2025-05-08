// components/Footer.tsx
import { Facebook, Instagram, Twitter, Github } from "lucide-react";
import Button from "./button";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white dark:border-gray-7 dark:bg-[#192336]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Newsletter */}
          <div>
            <Image
              className=""
              src={"/images/logo/logo.png"}
              alt="Logo"
              width={200}
              height={40}
            />
            <p className="mb-4 text-gray-600 dark:text-[#cacfd8]">
              Get reviews, reading tips, and book recommendations in your inbox.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h3 className="mb-3 font-semibold dark:text-white">Discover</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:text-[#99a1af] dark:hover:text-white"
                >
                  Top Reviews
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:text-[#99a1af] dark:hover:text-white"
                >
                  New Releases
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:text-[#99a1af] dark:hover:text-white"
                >
                  Trending Books
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-3 font-semibold dark:text-white">Community</h3>
            <ul className="space-y-2 text-gray-600 dark:text-[#99a1af] dark:hover:text-white">
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:text-[#99a1af] dark:hover:text-white"
                >
                  Discussions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:text-[#99a1af] dark:hover:text-white"
                >
                  Reading Clubs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:text-[#99a1af] dark:hover:text-white"
                >
                  Write a Review
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 font-semibold dark:text-white">Support</h3>
            <ul className="space-y-2 text-gray-600 dark:text-[#99a1af] dark:hover:text-white">
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:text-[#99a1af] dark:hover:text-white"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:text-[#99a1af] dark:hover:text-white"
                >
                  Sign up
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:text-[#99a1af] dark:hover:text-white"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 font-semibold dark:text-white">Legal</h3>
            <ul className="space-y-2 text-gray-600 dark:text-[#99a1af] dark:hover:text-white">
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:text-[#99a1af] dark:hover:text-white"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:text-[#99a1af] dark:hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:text-[#99a1af] dark:hover:text-white"
                >
                  Licensing
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between border-t pt-4 text-sm text-gray-500 dark:border-gray-7 sm:flex-row">
          <p className="dark:text-white">
            © 2025 oneReview, Inc. All rights reserved.
          </p>
          <div className="mt-2 flex space-x-4 sm:mt-0">
            <a href="#" className="dark:text-white" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="#" className="dark:text-white" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="dark:text-white" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" className="dark:text-white" aria-label="GitHub">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
