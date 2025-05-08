import { useState } from "react";
import { Send, BookOpen, Mail, User, Check } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [preferences, setPreferences] = useState({
    newReleases: false,
    weeklyReviews: false,
    authorInterviews: false,
    readingChallenges: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Here you would normally handle the submission to your backend
    console.log({ name, email, preferences });
    setSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setEmail("");
      setName("");
      setPreferences({
        newReleases: false,
        weeklyReviews: false,
        authorInterviews: false,
        readingChallenges: false,
      });
      setSubmitted(false);
    }, 3000);
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key],
    });
  };

  return (
    <div className="min-h-screen">
      <div
        className="bg-slate-900/70 py-16 text-white"
        style={{
          backgroundImage: "url('/images/home/home8.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <BookOpen
            size={48}
            className="mx-auto mb-4"
            style={{ color: "#13abfd" }}
          />
          <h1 className="mb-2 text-4xl font-bold">
            Stay Updated with Book Lovers
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-300">
            Sign up for our newsletter and never miss the latest book reviews,
            reading challenges, and literary events.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-xl bg-white shadow-lg dark:bg-dark-2">
          <div className="flex flex-col md:flex-row">
            {/* Signup Form */}
            <div className="w-full p-8">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="bg-green-100- mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <Check size={32} className="text-green-600" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">
                    Thank You for Subscribing!
                  </h3>
                  <p className="mb-4 text-slate-600">
                    We've sent a confirmation email to your inbox. Please
                    confirm your subscription to start receiving our newsletter.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="mb-6 text-2xl font-bold dark:text-white">
                    Join Our Newsletter
                  </h2>
                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1 block text-sm font-medium text-slate-700 dark:text-gray-4"
                      >
                        Your Name
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <User size={18} className="text-slate-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          placeholder="John Doe"
                          className="w-full rounded-lg border border-slate-300 px-4 py-3 pl-10 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-gray-7"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-slate-700 dark:text-gray-4"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Mail size={18} className="text-slate-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          placeholder="your.email@example.com"
                          className="w-full rounded-lg border border-slate-300 px-4 py-3 pl-10 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-gray-7"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Content Preferences */}
                    <div>
                      <p className="mb-3 block text-sm font-medium text-slate-700 dark:text-gray-4">
                        I'm interested in (select all that apply):
                      </p>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="newReleases"
                            className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400 dark:border-gray-7"
                            checked={preferences.newReleases}
                            onChange={() =>
                              handlePreferenceChange("newReleases")
                            }
                          />
                          <label
                            htmlFor="newReleases"
                            className="ml-2 text-sm text-slate-700 dark:text-gray-4"
                          >
                            New Book Releases
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="weeklyReviews"
                            className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400 dark:border-gray-7"
                            checked={preferences.weeklyReviews}
                            onChange={() =>
                              handlePreferenceChange("weeklyReviews")
                            }
                          />
                          <label
                            htmlFor="weeklyReviews"
                            className="ml-2 text-sm text-slate-700 dark:text-gray-4"
                          >
                            Weekly Book Reviews
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="authorInterviews"
                            className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400 dark:border-gray-7"
                            checked={preferences.authorInterviews}
                            onChange={() =>
                              handlePreferenceChange("authorInterviews")
                            }
                          />
                          <label
                            htmlFor="authorInterviews"
                            className="ml-2 text-sm text-slate-700 dark:text-gray-4"
                          >
                            Track My Progress
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="readingChallenges"
                            className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400 dark:border-gray-7"
                            checked={preferences.readingChallenges}
                            onChange={() =>
                              handlePreferenceChange("readingChallenges")
                            }
                          />
                          <label
                            htmlFor="readingChallenges"
                            className="ml-2 text-sm text-slate-700 dark:text-gray-4"
                          >
                            Reading Challenges
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        onClick={handleSubmit}
                        className="flex w-full items-center justify-center rounded-lg px-6 py-3 font-medium text-white transition-colors"
                        style={{ backgroundColor: "#13abfd" }}
                      >
                        Subscribe to Newsletter
                        <Send size={18} className="ml-2" />
                      </button>
                    </div>

                    <p className="mt-4 text-center text-xs text-slate-500">
                      By subscribing, you agree to our Terms of Service and
                      Privacy Policy. We'll never spam you or sell your
                      information.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
