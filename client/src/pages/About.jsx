import React from "react";
import { useContext } from "react";
import { ThemContext } from "../context/ThemContext";
// Adjust the import path as needed
import { GiLightBulb } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { VscStarEmpty } from "react-icons/vsc";
import { SiFreelancermap } from "react-icons/si";
import { IoStarSharp } from "react-icons/io5";
import bb from "../assets/bb.png";

const About = () => {
  const { darkModehandle, darkMode } = useContext(ThemContext);

  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "Visionary leader with 15+ years of industry experience driving innovation and growth.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "CTO",
      bio: "Technology expert specializing in scalable architecture and cutting-edge solutions.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Lead Designer",
      bio: "Creative director with an eye for beautiful, user-centric design solutions.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "Marketing Director",
      bio: "Brand strategist who crafts compelling narratives that resonate with audiences.",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    },
  ];

  const stats = [
    { value: "10K+", label: "Happy Clients" },
    { value: "50+", label: "Team Members" },
    { value: "15", label: "Countries Served" },
    { value: "2010", label: "Founded In" },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "We push boundaries and challenge the status quo to deliver cutting-edge solutions.",
      icon: <GiLightBulb />,
    },
    {
      title: "Integrity",
      description:
        "Honesty and transparency guide every decision we make and relationship we build.",
      icon: <FaHandsHelping />,
    },
    {
      title: "Excellence",
      description:
        "We strive for perfection in everything we do, delivering only the highest quality.",
      icon: <VscStarEmpty />,
    },
    {
      title: "Community",
      description:
        "We believe in giving back and creating positive impact beyond our business.",
      icon: <SiFreelancermap />,
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "dark bg-gray-900"
          : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className={`absolute inset-0 ${
            darkMode
              ? "bg-gray-800 opacity-90"
              : "bg-gradient-to-r from-gray-200 to-gray-400 opacity-20"
          }`}
        ></div>
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 lg:w-2/5 mb-10 md:mb-0">
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                ABOUT{" "}
                <span className="text-white dark:text-blue-400 font-serif dark:bg-slate-500 bg-slate-300 rounded-full p-2 border">
                  us
                </span>
              </h1>
              <p
                className={`text-lg mb-8 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } `}
              >
                Founded in 2010, we started as a small team with big dreams.
                Today, we're a global leader in innovative solutions, helping
                businesses transform and thrive in the digital age.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
            <div className="md:w-1/2 lg:w-3/5 flex justify-center">
              <div className="relative w-full max-w-lg">
                <div
                  className={`absolute -top-6 -left-6 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob ${
                    darkMode ? "bg-purple-900" : "bg-purple-300"
                  }`}
                ></div>
                <div
                  className={`absolute -bottom-8 -right-8 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 ${
                    darkMode ? "bg-blue-900" : "bg-blue-300"
                  }`}
                ></div>
                <div
                  className={`absolute top-20 left-20 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 ${
                    darkMode ? "bg-pink-900" : "bg-pink-300"
                  }`}
                ></div>
                <div className="relative">
                  <img src={bb} className="h-[450px] mt-5" />
                  {/* Abstract connected nodes animation */}
                  <g className="animate-float">
                    <circle
                      cx="250"
                      cy="250"
                      r="120"
                      fill={darkMode ? "#3B82F6" : "#2563EB"}
                      opacity="0.1"
                    />
                    <circle
                      cx="250"
                      cy="250"
                      r="80"
                      fill={darkMode ? "#3B82F6" : "#2563EB"}
                      opacity="0.2"
                    />

                    {/* Main nodes */}
                    <g
                      className="animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <circle
                        cx="250"
                        cy="250"
                        r="20"
                        fill={darkMode ? "#6366F1" : "#4F46E5"}
                      />
                      <circle
                        cx="350"
                        cy="200"
                        r="15"
                        fill={darkMode ? "#10B981" : "#059669"}
                      />
                      <circle
                        cx="150"
                        cy="300"
                        r="15"
                        fill={darkMode ? "#F59E0B" : "#D97706"}
                      />
                      <circle
                        cx="200"
                        cy="150"
                        r="15"
                        fill={darkMode ? "#EC4899" : "#DB2777"}
                      />
                      <circle
                        cx="300"
                        cy="350"
                        r="15"
                        fill={darkMode ? "#8B5CF6" : "#7C3AED"}
                      />
                    </g>

                    {/* Connecting lines */}
                    <line
                      x1="250"
                      y1="250"
                      x2="350"
                      y2="200"
                      stroke={darkMode ? "#A5B4FC" : "#818CF8"}
                      strokeWidth="2"
                      className="animate-draw"
                    />
                    <line
                      x1="250"
                      y1="250"
                      x2="150"
                      y2="300"
                      stroke={darkMode ? "#A5B4FC" : "#818CF8"}
                      strokeWidth="2"
                      className="animate-draw"
                      style={{ animationDelay: "0.3s" }}
                    />
                    <line
                      x1="250"
                      y1="250"
                      x2="200"
                      y2="150"
                      stroke={darkMode ? "#A5B4FC" : "#818CF8"}
                      strokeWidth="2"
                      className="animate-draw"
                      style={{ animationDelay: "0.4s" }}
                    />
                    <line
                      x1="250"
                      y1="250"
                      x2="300"
                      y2="350"
                      stroke={darkMode ? "#A5B4FC" : "#818CF8"}
                      strokeWidth="2"
                      className="animate-draw"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <line
                      x1="350"
                      y1="200"
                      x2="200"
                      y2="150"
                      stroke={darkMode ? "#A5B4FC" : "#818CF8"}
                      strokeWidth="2"
                      className="animate-draw"
                      style={{ animationDelay: "0.6s" }}
                    />
                    <line
                      x1="150"
                      y1="300"
                      x2="300"
                      y2="350"
                      stroke={darkMode ? "#A5B4FC" : "#818CF8"}
                      strokeWidth="2"
                      className="animate-draw"
                      style={{ animationDelay: "0.7s" }}
                    />

                    {/* Floating dots */}
                    <circle
                      cx="180"
                      cy="220"
                      r="5"
                      fill={darkMode ? "#EC4899" : "#DB2777"}
                      className="animate-float"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <circle
                      cx="320"
                      cy="280"
                      r="5"
                      fill={darkMode ? "#F59E0B" : "#D97706"}
                      className="animate-float"
                      style={{ animationDelay: "0.4s" }}
                    />
                    <circle
                      cx="280"
                      cy="180"
                      r="5"
                      fill={darkMode ? "#10B981" : "#059669"}
                      className="animate-float"
                      style={{ animationDelay: "0.6s" }}
                    />
                  </g>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        className={`py-16 transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-2 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Our Mission
            </h2>
            <p
              className={`p-3 text-lg max-w-3xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              To empower businesses and individuals through innovative
              technology solutions that simplify complexity, enhance
              productivity, and create meaningful connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`border border-gray-300 dark:border-none p-8 rounded-xl hover:shadow-lg transition duration-300 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-50 hover:bg-white"
                }`}
              >
                <div className="text-5xl mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3
                  className={`text-xl text-center font-semibold mb-3 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {value.title}
                </h3>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section - Redesigned */}
      <section
        className={`relative py-20 overflow-hidden transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-gradient-to-br from-white to-gray-50"
        }`}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className={`absolute inset-0 ${
              darkMode
                ? 'bg-[url("data:image/svg+xml;base64,...")]'
                : 'bg-[url("data:image/svg+xml;base64,...")]'
            }`}
          ></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 ${
                darkMode
                  ? "bg-gray-700 text-blue-400"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              Our Philosophy
            </span>
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 leading-tight ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Empowering{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                Innovation
              </span>
            </h2>

            <p
              className={`text-xl py-5 max-w-3xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              We don't just build technology - we craft experiences that
              transform businesses and elevate human potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:scale-105 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-xl hover:shadow-2xl border ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div
                  className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10"
                  style={{
                    background: darkMode
                      ? "radial-gradient(circle, #3b82f6 0%, transparent 70%)"
                      : "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
                  }}
                ></div>

                <div
                  className={`text-5xl mb-6 ${
                    darkMode ? "text-blue-400" : "text-blue-500"
                  }`}
                >
                  {value.icon}
                </div>
                <h3
                  className={`text-2xl font-bold mb-3 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {value.title}
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } mb-6`}
                >
                  {value.description}
                </p>
                <div
                  className={`w-12 h-0.5 ${
                    darkMode ? "bg-blue-400" : "bg-blue-500"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Redesigned */}
      <section
        className={`relative py-20 transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                Numerical states
              </span>
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Quantifying our impact and growth in real terms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl transition-all duration-500 hover:scale-[1.03] ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-white hover:bg-gray-100"
                } shadow-lg hover:shadow-xl border ${
                  darkMode ? "border-gray-600" : "border-gray-200"
                }`}
              >
                <div
                  className={`text-5xl font-extrabold mb-3 font-mono ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  <span className="count-up" data-target={stat.value}></span>+
                </div>
                <div
                  className={`text-lg font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
                <div className="mt-4">
                  <div
                    className={`w-full h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Redesigned */}
      {/* Team Section - Redesigned with corrected social icons */}
      <section
        className={`relative py-24 transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 ${
                darkMode
                  ? "bg-gray-800 text-blue-400"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              Creative Mind
            </span>
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                Dream Team
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              A diverse collective of visionaries, makers, and problem-solvers
              dedicated to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 ${
                  darkMode ? "bg-gray-800" : "bg-gray-50"
                } shadow-lg hover:shadow-xl`}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <p
                        className={`text-white text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-200"
                        }`}
                      >
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        className={`text-xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {member.name}
                      </h3>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-blue-400" : "text-blue-600"
                        } font-medium`}
                      >
                        {member.role}
                      </p>
                    </div>
                    <div
                      className={`text-4xl opacity-70 ${
                        darkMode ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      ,,
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-3">
                    {/* LinkedIn Icon */}
                    <a
                      href="#"
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        darkMode
                          ? "bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white"
                          : "bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                      </svg>
                    </a>

                    {/* Twitter Icon */}
                    <a
                      href="#"
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        darkMode
                          ? "bg-gray-700 hover:bg-blue-400 text-gray-300 hover:text-white"
                          : "bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-400"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                      </svg>
                    </a>

                    {/* GitHub Icon */}
                    <a
                      href="#"
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
