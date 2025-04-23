import React, { useContext, useState } from 'react';
import { FiBriefcase, FiUser, FiUsers, FiBarChart2, FiFileText, FiGlobe, FiSun, FiMoon } from 'react-icons/fi';
import { ThemContext } from '../context/ThemContext';

const Service = () => {
const { darkModehandle, darkMode } = useContext(ThemContext);

  const services = [
    {
      icon: <FiBriefcase className="w-8 h-8" />,
      title: "Internship Posting",
      description: "Companies post opportunities for students—zero fees, maximum reach.",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: <FiUser className="w-8 h-8" />,
      title: "Student Applications",
      description: "One-click applications with smart matching.",
      gradient: "from-blue-500 to-teal-400"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Adviser Matching",
      description: "AI-powered mentor assignments.",
      gradient: "from-amber-500 to-pink-500"
    },
    {
      icon: <FiBarChart2 className="w-8 h-8" />,
      title: "Progress Analytics",
      description: "Real-time dashboards for all stakeholders.",
      gradient: "from-emerald-500 to-cyan-400"
    },
    {
      icon: <FiFileText className="w-8 h-8" />,
      title: "Document Hub",
      description: "Centralized resumes, certificates, and reports.",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: <FiGlobe className="w-8 h-8" />,
      title: "Global Network",
      description: "Connect with international opportunities.",
      gradient: "from-violet-500 to-fuchsia-500"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>

      {/* Hero Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Internships</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            End-to-end internship management with zero payment barriers
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Free Services</h2>
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`rounded-xl p-8 transition-all duration-500 transform hover:-translate-y-2 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-gradient-to-r ${service.gradient} text-white`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6 font-serif">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
            
              <h3 className="text-4xl font-bold text-purple-600 mb-2">500+</h3>
              <p className="opacity-80">Companies</p>
              <div className='flex flex-col gap-1'>
              <hr className='h-2 bg-purple-600  rounded-full border-none w-[250px]'/>
              <hr className='h-2 bg-purple-600  rounded-full border-none w-[200px]'/>
               <hr className='h-2 bg-purple-600  rounded-full border-none w-[150px]'/>
               </div>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">10K+</h3>
              <p className="opacity-80">Students</p>
              <div className='flex flex-col gap-1'>
              <hr className='h-2 bg-blue-600  rounded-full border-none w-[250px]'/>
              <hr className='h-2 bg-blue-600  rounded-full border-none w-[200px]'/>
              <hr className='h-2 bg-blue-600  rounded-full border-none w-[150px]'/>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-amber-600 mb-2">95%</h3>
              <p className="opacity-80">Satisfaction</p>
              <div className='flex flex-col gap-1'>
              <hr className='h-2 bg-amber-600 rounded-full border-none w-[250px]'/>
              <hr className='h-2 bg-amber-600 rounded-full border-none w-[200px]'/>
              <hr className='h-2 bg-amber-600 rounded-full border-none w-[150px]'/>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-emerald-600 mb-2">24/7</h3>
              <p className="opacity-80">Support</p>
              <div className='flex flex-col gap-1'>
              <hr className='h-2 bg-emerald-600 rounded-full border-none w-[250px]'/>
              <hr className='h-2 bg-emerald-600 rounded-full border-none w-[200px]'/>
              <hr className='h-2 bg-emerald-600 rounded-full border-none w-[150px]'/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-6 text-center">
        <div className={`max-w-4xl mx-auto p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          <h2 className="text-3xl font-bold mb-6 font-serif">Ready to revolutionize internships?</h2>
          <p className="text-xl mb-8 opacity-90 ">
            Join thousands of companies and students in our free ecosystem
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold hover:opacity-90 transition">
              Post an Internship
            </button>
            <button className={`px-8 py-3 rounded-full font-bold border-2 ${darkMode ? 'border-purple-400 text-purple-400' : 'border-purple-600 text-purple-600'} hover:bg-purple-50/10 transition`}>
              Student Application
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;