import React from 'react';

const TeamMember = ({ name, role, imgSrc, delay = 0 }) => {
  return (
    <div 
      className="flex flex-col items-center animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-primary/20">
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-800">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );
};

export default TeamMember;
