import React, { useState, useEffect, useRef, useContext } from "react";
import {
  ArrowRight,
  Shield,
  Rocket,
  Settings,
  Code,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ThemContext } from "../context/ThemContext";

// Stat Item Component
const StatItem = ({ number, label, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const step = Math.max(1, Math.floor(number / 50));
          let current = 0;
          const interval = duration / (number / step);

          const timer = setInterval(() => {
            current += step;
            if (current > number) {
              setCount(number);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, interval);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) observer.observe(counterRef.current);

    return () => {
      if (counterRef.current) observer.unobserve(counterRef.current);
    };
  }, [number, duration]);

  return (
    <div ref={counterRef} className="text-center">
      <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-gray-600 dark:text-gray-300">{label}</div>
    </div>
  );
};

// Stats Counter Component
const StatsCounter = ({ stats }) => (
  <section className="py-16 bg-gray-100 dark:bg-gray-900">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            number={stat.number}
            label={stat.label}
            suffix={stat.suffix}
          />
        ))}
      </div>
    </div>
  </section>
);

// Feature Card Component
const FeatureCard = ({ title, description, icon: Icon, delay = 0 }) => (
  <div
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mb-6">
      <Icon className="text-blue-600" size={30} />
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

// Testimonial Slider Component
const TestimonialSlider = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Computer Science Student",
      quote: "InternXcel helped me find my dream internship at a tech giant!",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 2,
      name: "Samantha Chen",
      role: "HR Director",
      quote:
        "We've found amazing talent that fits our company culture perfectly.",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 3,
      name: "Michael Roberts",
      role: "Engineering Intern",
      quote: "The progress tracking feature helped me showcase my growth.",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () =>
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[activeIndex];

  return (
    <div className="bg-white dark:bg-black py-16 relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-xl md:text-4xl font-bold text-center text-white mb-12">
          What People Say
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gray-100 dark:bg-gray-900 rounded-xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6 ">
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-400"
              />
              <div>
                <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-4">
                  "{currentTestimonial.quote}"
                </p>
                <p className="font-bold text-blue-600">
                  {currentTestimonial.name}
                </p>
                <p className="text-gray-500">{currentTestimonial.role}</p>
              </div>
            </div>
            <div className="absolute top-4 right-6 text-6xl text-blue-400/20 font-serif">
              "
            </div>
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? "bg-white scale-125" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Home Component
const Home = ({
  title = "Empowering Futures – Seamlessly Manage Internships & Externships!",
  subtitle = "Discover amazing features and services",
  ctaText = "Get Started",
  ctaLink = "#",
}) => {
  const { darkModehandle, darkMode } = useContext(ThemContext);

  const features = [
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security",
      delay: 100,
    },
    {
      icon: Rocket,
      title: "Fast Performance",
      description: "Lightning fast response",
      delay: 200,
    },
    {
      icon: Settings,
      title: "Easy Configuration",
      description: "Simple setup with intuitive controls",
      delay: 300,
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "Clean APIs and documentation",
      delay: 400,
    },
  ];

  const stats = [
    { number: 1000, label: "Active Students", suffix: "+" },
    { number: 200, label: "Partner Companies", suffix: "+" },
    { number: 95, label: "Success Rate", suffix: "%" },
    { number: 24, label: "Support Hours", suffix: "/7" },
  ];

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : ""}>
      {/* Hero Section */}
      <section
        className={`relative flex flex-col items-center justify-center min-h-[89vh] ${
          darkMode
            ? "bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900 text-gray-100"
            : "bg-gradient-to-br from-white via-cyan-100 to-blue-300 text-gray-900"
        }`}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[5%] w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-xl galada-regular">
            {title}
          </h1>
          <p className="text-lg md:text-2xl mb-8 orbitron-teka">{subtitle}</p>
          <a
            href={ctaLink}
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
          >
            {ctaText} <ArrowRight className="inline ml-2" size={20} />
          </a>
        </div>

        {/* 🔵 SVG WAVE */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              className="fill-white dark:fill-gray-900 "
              fillOpacity="1"
              d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,117.3C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter stats={stats} />

      {/* Testimonials */}
      <TestimonialSlider />
    </div>
  );
};

export default Home;
