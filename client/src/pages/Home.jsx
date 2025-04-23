import React, { useContext } from "react";
import {
  Sun,
  Moon,
  ArrowRight,
  Briefcase,
  Users,
  Award,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "flowbite-react";
import { ThemContext } from "../context/ThemContext";
import { Avatar, AvatarGroup, AvatarGroupCounter } from "flowbite-react";

const Home = () => {
  const { darkModehandle, darkMode } = useContext(ThemContext);
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription logic
  };

  const features = [
    {
      icon: <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Premium Internship Opportunities",
      description:
        "Exclusive access to elite companies and coveted positions in your field of study.",
      stats: "500+ Top Companies",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
      title: "Personalized Mentorship",
      description:
        "One-on-one guidance from industry leaders and career coaches tailored to your goals.",
      stats: "92% Satisfaction Rate",
    },
    {
      icon: <Award className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
      title: "Project Portfolio Building",
      description:
        "Work on high-impact projects that showcase your skills to future employers.",
      stats: "1000+ Completed Projects",
    },
    {
      icon: (
        <Clock className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Flexible Scheduling",
      description:
        "Internships designed to fit your academic calendar with remote and hybrid options.",
      stats: "24/7 Platform Access",
    },
    {
      icon: (
        <ShieldCheck className="w-8 h-8 text-rose-600 dark:text-rose-400" />
      ),
      title: "Career Security",
      description:
        "Our alumni network and job placement support ensures long-term career success.",
      stats: "85% Job Placement",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 overflow-hidden">
      {/* Luxury Hero Section */}
      <section className="relative py-28 md:py-36 bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-30 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-400 rounded-full filter blur-3xl opacity-30 animate-float animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-500 dark:from-blue-300 dark:to-indigo-500">
                WEL COME TO!!
              </span>{" "}
              Your INTERN Journey
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              The premier platform connecting exceptional students with
              prestigious companies through curated internship experiences.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                gradientDuoTone="purpleToBlue"
                size="xl"
                className="font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Discover Opportunities <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                outline
                gradientDuoTone="purpleToBlue"
                size="xl"
                className="font-semibold px-8 py-3.5 rounded-xl border-2 hover:shadow-lg transition-all duration-300"
              >
                University Partners
              </Button>
            </div>
          </div>

          {/* Luxury Subscription Card */}
          <div className="mt-16 mx-auto max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-70 dark:bg-opacity-70 transform transition-all duration-500 hover:scale-[1.02]">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">
                Join Our Exclusive Network
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Be the first to access premium internship positions and career
                development resources.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your professional email"
                className="flex-grow px-5 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
                required
              />
              <Button
                type="submit"
                gradientDuoTone="purpleToBlue"
                className="px-8 py-3.5 rounded-xl font-medium"
              >
                Get Early Access
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Luxury Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg text-sm font-medium mb-4 font-serif">
              Why Choose InternShep
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Unparalleled{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Professional Advantages
              </span>
            </h2>
          </div>

          <div className=" mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl transition-all duration-500 hover:shadow-xl ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-750"
                    : "bg-white hover:bg-gray-50"
                } border ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } hover:-translate-y-2`}
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`p-3 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-blue-50"
                    } mr-4`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {feature.stats}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            {features.slice(3).map((feature, index) => (
              <div
                key={index + 3}
                className={`p-8 rounded-2xl transition-all duration-500 hover:shadow-xl ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-750"
                    : "bg-white hover:bg-gray-50"
                } border ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } hover:-translate-y-2`}
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`p-3 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-blue-50"
                    } mr-4`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {feature.stats}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Testimonial Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Trusted by{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Top Talent
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Hear from students who transformed their careers through our
              platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div
              className={`p-8 rounded-2xl ${
                darkMode ? "bg-gray-800" : "bg-gray-50"
              } border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-b-red-600 border-t-violet-700 border-l-cyan-400 border-r-violet-700 ">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
                    alt="Emily Rodriguez"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Emily Rodriguez
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Computer Science, Stanford
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "InternShep connected me with a life-changing internship at a
                FAANG company. The mentorship I received was invaluable and
                directly led to my full-time offer."
              </p>
              <div className="flex flex-wrap justify-between">
                <span className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-7 h-7 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </span>
                <div className="flex items-center justify-center p-4 bg-gradient-to-br dark:from-gray-500 to-gray-800 rounded-2xl dark:shadow-2xl backdrop-blur-md dark:border dark:border-gray-700 dark:shadow-black/80 shadow-2xl shadow-white border border-slate-300">
                  <AvatarGroup>
                    <div className="relative bg-gradient-to-br from-[#1f1c2c] via-[#928DAB] to-[#1f1c2c] rounded-3xl shadow-2xl  border-yellow-300/30 backdrop-blur-xl">
                      <div className="flex -space-x-4">
                        {[
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
                          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
                          "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
                        ].map((img, idx) => (
                          <div
                            key={idx}
                            className="relative rounded-full ring-2 ring-gray-400 hover:scale-105 transform transition duration-300 shadow-[0_4px_30px_rgba(255,215,0,0.5)]"
                          >
                            <img
                              src={`${img}?auto=format&fit=crop&w=100&q=80`}
                              alt="avatar"
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
                          </div>
                        ))}
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-300 text-black font-bold text-md font-serif pb-1 ring-2 ring-gray-400 shadow-[0_4px_30px_rgba(255,215,0,0.6)] hover:scale-105 transform transition duration-300">
                          +99
                        </div>
                      </div>
                    </div>
                  </AvatarGroup>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div
              className={`p-8 rounded-2xl ${
                darkMode ? "bg-gray-800" : "bg-gray-50"
              } border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2  border-b-red-600 border-t-violet-700 border-l-cyan-400 border-r-violet-700">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
                    alt="James Chen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    James Chen
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Business Admin, Harvard
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "The quality of opportunities on InternShep is unmatched. I
                secured an internship at a top investment bank that opened doors
                I didn't know existed."
              </p>
              <div className="flex flex-wrap justify-between">
                <span className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-7 h-7 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </span>
                <div className="flex items-center justify-center p-4 bg-gradient-to-br dark:from-gray-500 to-gray-800 rounded-2xl dark:shadow-2xl backdrop-blur-md dark:border dark:border-gray-700 dark:shadow-black/80 shadow-2xl shadow-white border border-slate-300">
                  <AvatarGroup>
                    <div className="relative bg-gradient-to-br from-[#1f1c2c] via-[#928DAB] to-[#1f1c2c] rounded-3xl shadow-2xl  border-yellow-300/30 backdrop-blur-xl">
                      <div className="flex -space-x-4">
                        {[
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
                          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
                          "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
                        ].map((img, idx) => (
                          <div
                            key={idx}
                            className="relative rounded-full ring-2 ring-gray-400 hover:scale-105 transform transition duration-300 shadow-[0_4px_30px_rgba(255,215,0,0.5)]"
                          >
                            <img
                              src={`${img}?auto=format&fit=crop&w=100&q=80`}
                              alt="avatar"
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
                          </div>
                        ))}
                        <div className="flex items-center justify-center bg-gray-300 w-12 h-12 rounded-full ring-gray-400 text-black font-bold text-md ring-2 font-serif pb-1 shadow-[0_4px_30px_rgba(255,215,0,0.6)] hover:scale-105 transform transition duration-300">
                          +99
                        </div>
                      </div>
                    </div>
                  </AvatarGroup>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div
              className={`p-8 rounded-2xl ${
                darkMode ? "bg-gray-800" : "bg-gray-50"
              } border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2  border-b-red-600 border-t-violet-700 border-l-cyan-400 border-r-violet-700">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
                    alt="Sarah Johnson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Sarah Johnson
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Engineering, MIT
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "From the personalized matching to the career resources, every
                aspect of InternShep is designed for success. My internship led
                directly to a six-figure job offer."
              </p>
              <div className="flex flex-wrap justify-between">
                <span className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-7 h-7 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </span>
                <div className="flex items-center justify-center p-4 bg-gradient-to-br dark:from-gray-500 to-gray-800 rounded-2xl dark:shadow-2xl backdrop-blur-md dark:border dark:border-gray-700 dark:shadow-black/80 shadow-2xl shadow-white border border-slate-300">
                  <AvatarGroup>
                    <div className="relative bg-gradient-to-br from-[#1f1c2c] via-[#928DAB] to-[#1f1c2c] rounded-3xl shadow-2xl  border-yellow-300/30 backdrop-blur-xl">
                      <div className="flex -space-x-4">
                        {[
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
                          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
                          "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
                        ].map((img, idx) => (
                          <div
                            key={idx}
                            className="relative rounded-full ring-2 ring-gray-400 hover:scale-105 transform transition duration-300 shadow-[0_4px_30px_rgba(255,215,0,0.5)]"
                          >
                            <img
                              src={`${img}?auto=format&fit=crop&w=100&q=80`}
                              alt="avatar"
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
                          </div>
                        ))}
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-300 text-black font-bold font-serif pb-1 text-md ring-2 ring-gray-400 shadow-[0_4px_30px_rgba(255,215,0,0.6)] hover:scale-105 transform transition duration-300">
                          +99
                        </div>
                      </div>
                    </div>
                  </AvatarGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
