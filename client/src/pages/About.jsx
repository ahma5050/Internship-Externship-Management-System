import React from 'react';
import TeamMember from '../components/TeamMember';
import { Star, Users, Calendar, ArrowRight, Award, Globe, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemContext } from '../context/ThemContext';

const About = () => {
  const { darkMode } = useContext(ThemContext);

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      imgSrc: "https://i.pravatar.cc/300?img=5",
      bio: "Education technology visionary with 15+ years in the industry."
    },
    {
      name: "David Chen",
      role: "CTO",
      imgSrc: "https://i.pravatar.cc/300?img=12",
      bio: "AI and platform architecture expert passionate about scalable solutions."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      imgSrc: "https://i.pravatar.cc/300?img=9",
      bio: "Operations specialist focused on creating seamless user experiences."
    },
    {
      name: "Michael Smith",
      role: "Lead Developer",
      imgSrc: "https://i.pravatar.cc/300?img=19",
      bio: "Full-stack developer dedicated to building intuitive interfaces."
    },
  ];

  const stats = [
    { value: "10,000+", label: "Students Placed" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "200+", label: "Partner Companies" },
    { value: "50+", label: "University Partners" }
  ];

  const USPs = [
    {
      title: "Industry Excellence",
      description: "Our platform is designed by industry experts with years of experience in education and recruitment.",
      icon: Star,
      color: "text-amber-500"
    },
    {
      title: "Personalized Approach",
      description: "We understand that every student and company has unique needs, and our platform adapts accordingly.",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Continuous Innovation",
      description: "We constantly improve our platform based on feedback and the latest trends in education and employment.",
      icon: Calendar,
      color: "text-emerald-500"
    },
  ];

  const values = [
    {
      title: "Integrity",
      description: "We operate with transparency and honesty in all our relationships.",
      icon: HeartHandshake,
      color: "bg-pink-100 text-pink-600 dark:bg-pink-900/50 dark:text-pink-300"
    },
    {
      title: "Excellence",
      description: "We strive for the highest standards in everything we do.",
      icon: Award,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300"
    },
    {
      title: "Global Impact",
      description: "We're building solutions that transcend borders and create worldwide opportunities.",
      icon: Globe,
      color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-300"
    },
  ];

  return (
    <div className={`min-h-screen pt-16 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${darkMode ? 'bg-gray-900 ' : 'bg-white-600'} py-24 text-white overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Bridging <span className="text-yellow-400">Talent</span> with <span className="text-yellow-400">Opportunity</span>
              </h1>
              <p className="text-xl mb-8 opacity-90 max-w-lg">
                We're revolutionizing how students and companies connect for internships and externships through innovative technology.
              </p>
              <div className={`${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/20 border-white/30'} backdrop-blur-md p-6 rounded-xl border shadow-lg`}>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                  Our Mission
                </h3>
                <p className="opacity-90">
                  Creating seamless pathways for students to gain meaningful professional experience while helping companies discover their future leaders.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] rounded-2xl bg-cover bg-center shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-xl -z-10 opacity-80"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-400 rounded-full -z-10 opacity-80"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className={`text-center p-6 rounded-xl shadow-sm hover:shadow-md transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'}`}>
                <p className={`text-3xl font-bold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{stat.value}</p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Our Journey</h2>
            <p className={`text-center mb-16 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              From humble beginnings to industry leadership, our story continues to unfold.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-yellow-400"></div>
            <div className="space-y-16">
              {/* 2019 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row md:items-center"
              >
                <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>2019 - Foundation</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Founded with a vision to revolutionize the internship experience for both students and companies.</p>
                </div>
                <div className="relative flex items-center md:justify-center mb-4 md:mb-0 order-1 md:order-2 md:w-1/2">
                  <div className={`w-8 h-8 rounded-full z-10 flex items-center justify-center border-4 ${darkMode ? 'border-gray-300' : 'border-blue-500'} shadow-md ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}>
                    <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-100' : 'bg-white'}`}></div>
                  </div>
                </div>
              </motion.div>
              
              {/* 2021 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col md:flex-row md:items-center"
              >
                <div className="relative flex items-center md:justify-center mb-4 md:mb-0 order-1 md:w-1/2">
                  <div className={`w-8 h-8 rounded-full z-10 flex items-center justify-center border-4 ${darkMode ? 'border-gray-300' : 'border-blue-500'} shadow-md ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}>
                    <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-100' : 'bg-white'}`}></div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 order-2">
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`}>2021 - Innovation</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Launched our AI-powered matching algorithm, connecting thousands of students with their ideal internships.</p>
                </div>
              </motion.div>
              
              {/* 2023 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col md:flex-row md:items-center"
              >
                <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>2023 - Expansion</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Grew to 200+ partner companies and 50 universities nationwide, with a 95% satisfaction rate.</p>
                </div>
                <div className="relative flex items-center md:justify-center mb-4 md:mb-0 order-1 md:order-2 md:w-1/2">
                  <div className={`w-8 h-8 rounded-full z-10 flex items-center justify-center border-4 ${darkMode ? 'border-gray-300' : 'border-blue-500'} shadow-md ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}>
                    <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-100' : 'bg-white'}`}></div>
                  </div>
                </div>
              </motion.div>
              
              {/* Today */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col md:flex-row md:items-center"
              >
                <div className="relative flex items-center md:justify-center mb-4 md:mb-0 order-1 md:w-1/2">
                  <div className={`w-8 h-8 rounded-full z-10 flex items-center justify-center border-4 ${darkMode ? 'border-gray-300' : 'border-blue-500'} shadow-md ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}>
                    <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-100' : 'bg-white'}`}></div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 order-2">
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Today & Beyond</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Pioneering new features and global partnerships to transform career development worldwide.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Our Core Values</h2>
            <p className={`text-center mb-16 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              These principles guide every decision we make and every relationship we build.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-8 rounded-xl shadow-sm hover:shadow-md transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'}`}
                >
                  <div className={`${value.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6`}>
                    <Icon size={24} />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value.title}</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Meet Our Team</h2>
            <p className={`text-center mb-16 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Passionate professionals dedicated to transforming career opportunities.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TeamMember
                  name={member.name}
                  role={member.role}
                  imgSrc={member.imgSrc}
                  bio={member.bio}
                  darkMode={darkMode}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USPs Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Why Choose InternXcel?</h2>
            <p className={`text-center mb-16 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              We're committed to excellence in every aspect of our service, providing unparalleled value.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {USPs.map((usp, index) => {
              const Icon = usp.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-8 rounded-xl shadow-sm hover:shadow-lg transition-all ${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-200 hover:bg-gray-50'} border`}
                >
                  <div className={`${usp.color} mb-6`}>
                    <Icon size={32} />
                  </div>
                  <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{usp.title}</h3>
                  <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{usp.description}</p>
                  <button className="flex items-center font-medium group">
                    <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Learn more</span>
                    <ArrowRight className={`ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${darkMode ? 'bg-blue-900' : 'bg-blue-600'} text-white`}>
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Career Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students and companies already benefiting from our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                For Students
              </button>
              <button className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-lg">
                For Companies
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;