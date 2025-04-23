import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from 'react-icons/ai'


const OAuth = () => {
  return (
    
      <Button className="px-4 py-0.5 flex items-center" gradientDuoTone="purpleToPink" outline>
        <AiFillGoogleCircle size={28} className="mr-3"/> <span className="mt-1 font-serif text-zinc-700 font-bold dark:text-slate-200">Contnue with Google</span>
      </Button>
    
  );
};

export default OAuth;
