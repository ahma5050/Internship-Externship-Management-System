import React, { useState, useRef, useEffect } from 'react';
import { Card, Badge, Button } from 'flowbite-react';
import { Building, GraduationCap, Users, Rocket, Briefcase, BookOpen, BarChart2, FileText, MessageSquare, Calendar, Shield, ArrowRight } from 'lucide-react';
import StatsCounter from '../components/StatsCounter';
import CTA from '../components/CTA';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const stats = [
    { number: 10000, label: "Students Placed", suffix: "+" },
    { number: 95, label: "Satisfaction Rate", suffix: "%" },
    { number: 200, label: "Partner Companies", suffix: "+" },
    { number: 50, label: "University Partners", suffix: "+" }
  ];

  const services = [
    {
      id: 1,
      title: "AI Career Matching",
      description: "Smart algorithm matches your skills with ideal internships",
      icon: <Rocket className="w-8 h-8 text-blue-600" />,
      category: "students",
      badge: "Popular"
    },
    {
      id: 2,
      title: "Talent Acquisition Suite",
      description: "Complete toolkit for finding and managing interns",
      icon: <Building className="w-8 h-8 text-purple-600" />,
      category: "employers",
      badge: "New"
    },
    {
      id: 3,
      title: "Academic Integration",
      description: "Seamlessly connect internships with curriculum",
      icon: <GraduationCap className="w-8 h-8 text-green-600" />,
      category: "universities"
    },
    {
      id: 4,
      title: "Resume Optimizer",
      description: "ATS-friendly resume builder with real-time feedback",
      icon: <FileText className="w-8 h-8 text-yellow-600" />,
      category: "students"
    },
    {
      id: 5,
      title: "Performance Analytics",
      description: "Track intern progress with detailed metrics",
      icon: <BarChart2 className="w-8 h-8 text-red-600" />,
      category: "employers"
    },
    {
      id: 6,
      title: "Placement Dashboard",
      description: "University-wide tracking of student outcomes",
      icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
      category: "universities"
    },
    {
      id: 7,
      title: "Interview Prep",
      description: "Mock interviews with AI feedback",
      icon: <MessageSquare className="w-8 h-8 text-pink-600" />,
      category: "students"
    },
    {
      id: 8,
      title: "Compliance Tools",
      description: "Ensure all internship programs meet regulations",
      icon: <Shield className="w-8 h-8 text-teal-600" />,
      category: "employers"
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-blue-600 h-screen py-24 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Our <span className="text-yellow-300">Specialized Services</span>
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Discover solutions designed specifically for students, employers, and academic institutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button gradientDuoTone="purpleToBlue" size="lg">
                <Rocket className="mr-2" /> Explore Features
              </Button>
              <Button outline gradientDuoTone="purpleToBlue" size="lg">
                <Briefcase className="mr-2" /> For Employers
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={sectionRef} 
        className="py-16 md:py-24 bg-white dark:bg-gray-900"
        id="services"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              Comprehensive Service Offerings
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Select a category to explore our specialized solutions
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              color={activeCategory === 'all' ? 'purple' : 'gray'} 
              onClick={() => setActiveCategory('all')}
             
            >
              All Services
            </Button>
            <Button 
              color={activeCategory === 'students' ? 'purple' : 'gray'} 
              onClick={() => setActiveCategory('students')}
           
            >
              <Users className="mr-2 h-4 w-4" /> For Students
            </Button>
            <Button 
              color={activeCategory === 'employers' ? 'purple' : 'gray'} 
              onClick={() => setActiveCategory('employers')}
            
            >
              <Building className="mr-2 h-4 w-4" /> For Employers
            </Button>
            <Button 
              color={activeCategory === 'universities' ? 'purple' : 'gray'} 
              onClick={() => setActiveCategory('universities')}
     
            >
              <GraduationCap className="mr-2 h-4 w-4" /> For Universities
            </Button>
          </div>

          {/* Services Cards */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {filteredServices.map((service) => (
              <Card 
                key={service.id} 
                className="hover:shadow-xl transition-shadow h-full flex flex-col"
                href="#"
              >
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-gray-700">
                    {service.icon}
                  </div>
                  {service.badge && (
                    <Badge color="purple" className="ml-auto">
                      {service.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="text-xl font-bold dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 flex-grow">
                  {service.description}
                </p>
                <Button className="bg-blue-300 border">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              Why Choose Our Services?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We combine cutting-edge technology with deep industry expertise to deliver exceptional results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="mx-auto p-3 rounded-full bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center mb-4">
               
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Proven Results</h3>
              <p className="text-gray-600 dark:text-gray-400">
                95% satisfaction rate across all user groups with measurable outcomes
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="mx-auto p-3 rounded-full bg-purple-100 dark:bg-purple-900 w-12 h-12 flex items-center justify-center mb-4">
                <Briefcase className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Industry Focused</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Solutions designed by experts who understand your specific challenges
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="mx-auto p-3 rounded-full bg-green-100 dark:bg-green-900 w-12 h-12 flex items-center justify-center mb-4">
                <Rocket className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Continuous Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Regular updates with new features based on user feedback
              </p>
            </Card>
          </div>
        </div>
      </section>

   
    </div>
  );
}