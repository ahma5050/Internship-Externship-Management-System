import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "This platform transformed our internship program. The quality of candidates improved dramatically while saving us countless hours.",
    name: "Sarah Johnson",
    role: "HR Director at TechCorp",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    quote: "As a student, I found my dream internship through this platform. The matching algorithm is incredibly accurate.",
    name: "Michael Chen",
    role: "Computer Science Student",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    quote: "Our university's placement rates increased by 40% after implementing this system. The analytics are invaluable.",
    name: "Dr. Emily Rodriguez",
    role: "Career Services Director",
    avatar: "https://i.pravatar.cc/150?img=9"
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">What Our Users Say</h2>
        
        <div className="max-w-3xl mx-auto relative">
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img 
                src={testimonials[currentIndex].avatar} 
                alt={testimonials[currentIndex].name}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
              />
              <div className="text-center md:text-left">
                <p className="text-lg italic mb-4 dark:text-gray-300">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div>
                  <p className="font-bold text-blue-600 dark:text-blue-400">{testimonials[currentIndex].name}</p>
                  <p className="text-gray-600 dark:text-gray-400">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 p-2 rounded-full bg-white dark:bg-gray-600 shadow-md hover:bg-gray-100 dark:hover:bg-gray-500"
          >
            <ChevronLeft className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 p-2 rounded-full bg-white dark:bg-gray-600 shadow-md hover:bg-gray-100 dark:hover:bg-gray-500"
          >
            <ChevronRight className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;