import React, { useContext } from 'react';
import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation } from 'react-router-dom';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { ThemContext } from '../context/ThemContext';
import { useSelector } from 'react-redux';
import { FaUniversity, FaUserEdit } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { FaUser } from "react-icons/fa";
import { motion } from 'framer-motion';


const Header = () => {
  const path = useLocation().pathname;
  const { darkModehandle, darkMode } = useContext(ThemContext);
  const { currentUser } = useSelector((state) => state.user);
  const defaultProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  console.log("user", currentUser);
  console.log("Profile URL:", currentUser?.profile);

  return (
    <Navbar className='border-b-2 z-40 relative overflow-visible'>
<Link to="/" className="flex items-center gap-2 text-xl font-serif font-semibold">
      <FaUniversity className="text-4xl text-gray-400 drop-shadow-md" />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-500 text-4xl font-extrabold tracking-wide font-sans">
        IEM
      </span>
  
    </Link>
      <form>
        <TextInput type='text' placeholder='Search...' rightIcon={AiOutlineSearch} className='hidden lg:block' />
        <Button color='gray' pill className='lg:hidden'>
          <AiOutlineSearch />
        </Button>
      </form>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link  as="div" active={path === '/'}><Link to="/" className="font-serif text-lg">Home</Link></Navbar.Link>
        <Navbar.Link as="div" active={path === '/About'}><Link to="/About" className="font-serif text-lg">About</Link></Navbar.Link>
        <Navbar.Link as="div" active={path === '/Service'}><Link to="/Service" className="font-serif text-lg">Service</Link></Navbar.Link>
        <Navbar.Link as="div" active={path === '#'}>{ currentUser && currentUser.applicationStatus==="approved" && (<span className="font-serif text-lg bg-green-200 p-1 rounded-lg border text-blue-900">verifed </span>)}</Navbar.Link>
   
      </Navbar.Collapse>
      <div className='hidden md:block' onClick={darkModehandle}>
        {darkMode ? <MdLightMode size={27} /> : <MdDarkMode size={27} />}
      </div>
      {currentUser ? (
  <Dropdown
    arrowIcon={false}
    inline
      className="z-50"
    label={
      currentUser?.profile === defaultProfileImage ? (
        <div className="flex items-center justify-center h-14 w-14 bg-gray-400 text-white text-xl font-bold rounded-full border-2 border-t-pink-700  border-l-pink-700  border-r-pink-700  border-b-pink-700 border-dotted">
          <span className=' text-pink-700 font-serif text-2xl'>{currentUser?.userName?.[0]}</span>
        </div>
      ) : (
        <Avatar
          img={`http://localhost:3000${currentUser?.profile}`}
          rounded
          bordered
         
        />
      )
    }
    alt="hello"
  >

<Dropdown.Header
  className="w-64 m-3 flex flex-col items-center gap-2 p-4 border-t-4 border-b rounded-lg  border-pink-200 rounded-t-xl shadow-md bg-gradient-to-r from-pink-50 to-purple-100 dark:from-gray-800 dark:to-gray-900"
>
  {currentUser?.profile === defaultProfileImage ? (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      className="flex items-center justify-center h-16 w-16 bg-white text-pink-700 text-2xl font-bold rounded-full border-4 border-pink-600 shadow-lg"
    >
      {currentUser?.userName?.[0]}
    </motion.div>
  ) : (
    <motion.div
      initial={{ rotateY: 90 }}
      animate={{ rotateY: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Avatar
        img={`http://localhost:3000${currentUser?.profile}`}
        rounded
        bordered
       
      />
    </motion.div>
  )}

  <motion.span
    className="font-bold font-serif text-lg text-gray-800 dark:text-white text-center"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    {currentUser.userName}
  </motion.span>

  <motion.span
    className="font-serif font-medium text-sm flex items-center gap-2 text-gray-600 dark:text-gray-300"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    <MdAttachEmail className="text-pink-700 text-xl" />
    {currentUser.email}
  </motion.span>
</Dropdown.Header>

<Dropdown.Item
  as={Link}
  to={
    currentUser?.roles === "Admin" ? "/Dashboard?tab=profile" :
    currentUser?.roles === "Advisor" ? "/DashboardAdvisor?tab=profile" :
    currentUser?.roles === "User" ? "/DashboardUser?tab=profile" :
    "/DashboardFaculty?tab=profile"
  }
>
  {currentUser?.roles === "User" ? (
    <CgProfile className='text-2xl text-pink-700' />
  ) : (
    <FaUser className='text-2xl text-pink-700' />
  )}
  <span className='ml-2 font-serif'>Profile</span>
</Dropdown.Item>


          <DropdownDivider />
          <DropdownItem><LiaSignOutAltSolid className='text-2xl text-pink-700'/><span className='ml-2 font-serif'>SignOut</span></DropdownItem>
        </Dropdown>
      ) : ( 
        <Button gradientDuoTone="purpleToBlue" outline className='font-bold font-serif hidden md:inline'>
          <Link to="/SignIn">Sign In</Link>
        </Button>
      )}
    </Navbar>
  );
};

export default Header;
