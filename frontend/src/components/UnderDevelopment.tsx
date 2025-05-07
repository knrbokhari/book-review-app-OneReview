import { Construction, Wrench } from "lucide-react";
import React from "react";

const UnderDevelopment = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-gray-800">
      <div className="w-full rounded-xl border border-indigo-100 bg-white p-8 shadow-lg dark:border-dark-3 dark:bg-[#122031]">
        {/* Header */}
        <div className="mb-8 flex items-center justify-center">
          <Construction className="mr-3 text-indigo-500" size={32} />
          <h1 className="text-3xl font-bold text-indigo-700">
            Under Development
          </h1>
        </div>

        {/* Main message */}
        <div className="mb-8 text-center">
          <p className="mb-4 text-xl dark:text-white">
            We're working hard to bring you something amazing!
          </p>
          <p className="mb-6 text-gray-600 dark:text-white">
            Our team is putting the finishing touches on this page. Please check
            back soon.
          </p>

          {/* Progress bar */}
          <div className="mb-6 h-4 w-full rounded-full bg-gray-200">
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-indigo-500"></div>
          </div>
        </div>

        {/* Features coming soon */}
        <div className="mb-8">
          <h2 className="mb-4 flex w-full items-center justify-center text-xl font-semibold dark:text-white">
            <Wrench
              className="mr-2 text-indigo-500 dark:text-white"
              size={20}
            />
            Features Coming Soon
          </h2>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;
