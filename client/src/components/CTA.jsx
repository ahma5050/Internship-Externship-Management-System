import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA = ({ 
  title = "Ready to Get Started?", 
  description = "Join thousands of happy users today.",
  primaryButton = "Sign Up Now",
  secondaryButton = "Learn More"
}) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">{title}</h2>
          <p className="text-xl mb-8 opacity-90">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center">
              {primaryButton} <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
              {secondaryButton}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;