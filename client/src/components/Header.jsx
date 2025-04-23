import React, { useContext } from 'react';
import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation } from 'react-router-dom';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { ThemContext } from '../context/ThemContext';
import { useSelector } from 'react-redux';
import { FaUserEdit } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { FaUser } from "react-icons/fa";



const Header = () => {
  const path = useLocation().pathname;
  const { darkModehandle, darkMode } = useContext(ThemContext);
  const { currentUser } = useSelector((state) => state.user);
  const defaultProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  console.log("user", currentUser);
  console.log("Profile URL:", currentUser?.profile);

  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='text-xl font-semibold font-serif'>
        <span className='text-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg px-3 py-0.5 self-center font-extrabold text-black'>
          @m
        </span>'<span className='text-orange-600'>erudite</span>
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
      </Navbar.Collapse>
      <div className='hidden md:block' onClick={darkModehandle}>
        {darkMode ? <MdLightMode size={27} /> : <MdDarkMode size={27} />}
      </div>
      {currentUser ? (
  <Dropdown
    arrowIcon={false}
    inline
    label={
      currentUser?.profile === defaultProfileImage ? (
        <div className="flex items-center justify-center h-14 w-14 bg-gray-400 text-white text-xl font-bold rounded-full border-2 border-t-pink-700  border-l-pink-700  border-r-pink-700  border-b-pink-700">
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

          <Dropdown.Header className='flex flex-col'>
          <FaUserEdit size={20} className='ml-[76px] absolute top-12 h-5 w-5 rounded-full bg-gray-400 pl-1 text-pink-700' />
          
          {
      currentUser?.profile === defaultProfileImage ? (
        <div className="ml-10 flex items-center justify-center h-14 w-14 bg-gray-400 text-white text-xl font-bold rounded-full border-2 border-t-pink-700  border-l-pink-700  border-r-pink-700  border-b-pink-700">
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
            <span className='font-bold font-serif ml-14 py-3'>{currentUser.userName}</span>
            <span className='font-serif font-bold flex gap-2'><span className='text-pink-700 text-2xl'><MdAttachEmail /></span>{currentUser.email}</span>
          </Dropdown.Header>
          {currentUser?.roles !== "User" ?
          <Link to={currentUser?.roles === "Admin" ? "/Dashboard?tab=profile" : "/DashboardFaculty?tab=profile"}>
                 <Dropdown.Item><FaUser className='text-2xl  text-pink-700 '/> <span className='ml-2 font-serif'>Profile</span></Dropdown.Item>
</Link> :
<Link to={currentUser?.roles === "User" ? "/DashboardUser?tab=profile" : ""}>
  <Dropdown.Item><CgProfile className='text-2xl  text-pink-700'/><span className='ml-2 font-serif'>Profile</span></Dropdown.Item>
</Link>}


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
