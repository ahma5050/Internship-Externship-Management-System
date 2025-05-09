import React from 'react';

import TeamMember from '../components/TeamMember'; // adjust path accordingly

import { Star, Users, Calendar } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      imgSrc: "https://i.pravatar.cc/300?img=5",
    },
    {
      name: "David Chen",
      role: "CTO",
      imgSrc: "https://i.pravatar.cc/300?img=12",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      imgSrc: "https://i.pravatar.cc/300?img=9",
    },
    {
      name: "Michael Smith",
      role: "Lead Developer",
      imgSrc: "https://i.pravatar.cc/300?img=19",
    },
  ];

  const USPs = [
    {
      title: "Industry Excellence",
      description: "Our platform is designed by industry experts with years of experience in education and recruitment.",
      icon: Star,
    },
    {
      title: "Personalized Approach",
      description: "We understand that every student and company has unique needs, and our platform adapts accordingly.",
      icon: Users,
    },
    {
      title: "Continuous Innovation",
      description: "We constantly improve our platform based on feedback and the latest trends in education and employment.",
      icon: Calendar,
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="heading-lg mb-6">About InternXcel</h1>
              <p className="text-xl mb-6 opacity-90">
                We're on a mission to revolutionize how students and companies connect for internships and externships.
              </p>
              <div className="bg-white/20 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                <p className="opacity-90">
                  We bridge the gap between talent and opportunity, creating a seamless pathway for students to gain meaningful professional experience and for companies to discover their future leaders.
                </p>
              </div>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="aspect-video bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] rounded-lg bg-cover bg-center shadow-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="heading-lg text-center mb-16">Our Journey</h2>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-primary/20"></div>
            <div className="space-y-16">
              {/* 2019 */}
              <div className="flex flex-col md:flex-row md:items-center animate-fade-in">
                <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                  <h3 className="text-xl font-bold text-primary mb-2">2019</h3>
                  <p className="text-gray-700">Founded with a vision to revolutionize the internship experience for both students and companies.</p>
                </div>
                <div className="relative flex items-center md:justify-center mb-4 md:mb-0 order-1 md:order-2 md:w-1/2">
                  <div className="w-8 h-8 bg-primary rounded-full z-10"></div>
                </div>
              </div>
              {/* 2021 */}
              <div className="flex flex-col md:flex-row md:items-center animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="relative flex items-center md:justify-center mb-4 md:mb-0 order-1 md:w-1/2">
                  <div className="w-8 h-8 bg-primary rounded-full z-10"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 order-2">
                  <h3 className="text-xl font-bold text-primary mb-2">2021</h3>
                  <p className="text-gray-700">Launched our AI-powered matching algorithm, connecting thousands of students with their ideal internships.</p>
                </div>
              </div>
              {/* 2023 */}
              <div className="flex flex-col md:flex-row md:items-center animate-fade-in" style={{ animationDelay: '400ms' }}>
                <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                  <h3 className="text-xl font-bold text-primary mb-2">2023</h3>
                  <p className="text-gray-700">Expanded to over 200 partner companies and 50 universities nationwide, with a 95% satisfaction rate.</p>
                </div>
                <div className="relative flex items-center md:justify-center mb-4 md:mb-0 order-1 md:order-2 md:w-1/2">
                  <div className="w-8 h-8 bg-primary rounded-full z-10"></div>
                </div>
              </div>
              {/* Today */}
              <div className="flex flex-col md:flex-row md:items-center animate-fade-in" style={{ animationDelay: '600ms' }}>
                <div className="relative flex items-center md:justify-center mb-4 md:mb-0 order-1 md:w-1/2">
                  <div className="w-8 h-8 bg-primary rounded-full z-10"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 order-2">
                  <h3 className="text-xl font-bold text-primary mb-2">Today</h3>
                  <p className="text-gray-700">Continuing to innovate and expand our platform, with exciting new features and global partnerships on the horizon.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="heading-lg text-center mb-16">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                imgSrc={member.imgSrc}
                delay={index * 150}
              />
            ))}
          </div>
        </div>
      </section>

      {/* USPs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="heading-lg text-center mb-6">Why Choose InternXcel?</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            We're committed to excellence in every aspect of our service, providing unparalleled value to both students and companies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {USPs.map((usp, index) => {
              const Icon = usp.icon;
              return (
                <div key={index} className="text-center p-6 border border-gray-100 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{usp.title}</h3>
                  <p className="text-gray-600">{usp.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

  
    </div>
  );
};

export default About;
