import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiArrowSmRight, HiChartPie, HiDocument, HiDocumentText, HiUser } from 'react-icons/hi'
import { RiMiniProgramFill } from "react-icons/ri";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { CgAssign } from "react-icons/cg";
import { GiProgression } from "react-icons/gi";
import { useSelector } from 'react-redux'
import { MdAddHomeWork } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { FaBarsProgress } from "react-icons/fa6";
import { RiSchoolLine } from "react-icons/ri";
import { MdSignpost } from "react-icons/md";
import { FcApprove } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";
import { SiGreatlearning } from "react-icons/si";
import { VscGraphLine } from "react-icons/vsc";
import { RiProgress5Line } from "react-icons/ri";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { SiGoogleanalytics } from "react-icons/si";
import { TbWorldSearch } from "react-icons/tb";
import { LuNotebookPen } from "react-icons/lu";
import { GrAnalytics } from "react-icons/gr";
import { LuNotebookText } from "react-icons/lu";
import { GrUserManager } from "react-icons/gr";
import { FaUserCheck } from "react-icons/fa6";
import { BsFillBookmarkCheckFill } from "react-icons/bs";


const DashSidebasr = () => {
      const {currentUser}=useSelector((state)=>state.user);
      const Location=useLocation();
      const [tab, setTab]=useState("")
      useEffect(()=>{
            const UrlParams=new URLSearchParams(Location.search);
            const paramsvalue=UrlParams.get("tab")
            setTab(paramsvalue)
            
      },[Location.search])
      
  return (
    <Sidebar className='w-full md:w-50 rounded-lg '> 
      <SidebarItems>
<SidebarItemGroup className='flex flex-col gap-3'>
{currentUser?.roles==="Admin" && <span className='font-bold flex flex-col gap-2'>
      <Link to="/Dashboard?tab=dash"><SidebarItem active={tab==="dash"} icon={HiChartPie} as="div" className=' font-serif'>Dashboard</SidebarItem></Link>
      <Link to="/Dashboard?tab=profile"><SidebarItem active={tab==="profile"} icon={HiUser} as="div" className=' font-serif' label={currentUser.roles}>profile</SidebarItem></Link>
      <Link to="/Dashboard?tab=program"><SidebarItem active={tab==="program"} icon={RiMiniProgramFill} as="div" className=' font-serif'>ProgramsManagment</SidebarItem></Link>
      <Link to="/Dashboard?tab=assign"><SidebarItem active={tab==="assign"} icon={CgAssign } as="div" className=' font-serif'>Assign Advisor  & Approvement</SidebarItem></Link>
      <Link to="/Dashboard?tab=report"><SidebarItem active={tab==="report"} icon={GiProgression } as="div" className=' font-serif'>Reports & Analytics</SidebarItem></Link>
      <Link to="/Dashboard?tab=ApprovedFacality"><SidebarItem active={tab==="ApprovedFacality"} icon={MdOutlineMapsHomeWork  } as="div" className=' font-serif'>Approved Fcality</SidebarItem></Link>
      <Link to="/Dashboard?tab=ApprovedAdvisor"><SidebarItem active={tab==="ApprovedAdvisor"} icon={GrUserManager  } as="div" className=' font-serif'>Approved Advisors</SidebarItem></Link>
      <Link to="/Dashboard?tab=ApprovedNormalUser"><SidebarItem active={tab==="ApprovedNormalUser"} icon={FaUserCheck  } as="div" className=' font-serif'>Approved User</SidebarItem></Link>
      </span>}

      {currentUser.roles==="User" && <span className='flex flex-col gap-2'>
           
      <Link to="/DashboardUser?tab=UserDashboard"><SidebarItem active={tab==="UserDashboard"} icon={HiChartPie} as="div" className=' font-serif'>UserDashboard</SidebarItem></Link>
      <Link to="/DashboardUser?tab=profile"><SidebarItem active={tab==="profile"} icon={HiUser} as="div" label={currentUser.roles} className=' font-serif'>profile</SidebarItem></Link>
      <Link to="/DashboardUser?tab=search"><SidebarItem active={tab==="search"} icon={TbWorldSearch } as="div" className=' font-serif'>SearchOppPosted</SidebarItem></Link>
      {currentUser.roles==="User" && currentUser.applicationStatus==="approved" &&(<>
      <Link to="/DashboardUser?tab=progress"><SidebarItem active={tab==="progress"} icon={FaBarsProgress } as="div" className=' font-serif'>ProgressTracking</SidebarItem></Link>
      <Link to="/DashboardUser?tab=attendance"><SidebarItem active={tab==="attendance"} icon={LuNotebookPen  } as="div" className=' font-serif'>AttendanceReport</SidebarItem></Link>
      <Link to="/DashboardUser?tab=UserattendanceApp"><SidebarItem active={tab==="UserattendanceApp"} icon={BsFillBookmarkCheckFill } as="div" className=' font-serif'>Approved Attendance</SidebarItem></Link>
      <Link to="/DashboardUser?tab=gread"><SidebarItem active={tab==="gread"} icon={GrAnalytics } as="div" className=' font-serif'>GreadReport</SidebarItem></Link>
      </>)}
      </span>}


      {currentUser.roles==="Advisor" &&<span className='font-bold flex flex-col gap-2'>
      <Link to="/DashboardAdvisor?tab=AdvisorDashboard"><SidebarItem active={tab==="AdvisorDashboard"} icon={HiChartPie} as="div" className=' font-serif' >AdvisorDashboard</SidebarItem></Link>
      <Link to="/DashboardAdvisor?tab=profile"><SidebarItem active={tab==="profile"} icon={HiUser} as="div" className=' font-serif' label={currentUser.roles}>profile</SidebarItem></Link>
      <Link to="/DashboardAdvisor?tab=Monitoring"><SidebarItem active={tab==="Monitoring"} icon={RiProgress5Line } as="div" className=' font-serif'>Progress Monitoring </SidebarItem></Link>
      <Link to="/DashboardAdvisor?tab=Communication"><SidebarItem active={tab==="Communication"} icon={RiCalendarScheduleFill } as="div" className=' font-serif'>Communication & Scheduling</SidebarItem></Link>
      <Link to="/DashboardAdvisor?tab=Reporting"><SidebarItem active={tab==="Reporting"} icon={SiGoogleanalytics } as="div" className=' font-serif'>Reporting & Analytics</SidebarItem></Link>
      </span>}

      {currentUser.roles==="Faculty" && <span className='flex flex-col gap-3'>
      <Link to="/DashboardFaculty?tab=FacultyDashboard"><SidebarItem active={tab==="FacultyDashboard"} icon={RiSchoolLine} as="div" className=' font-serif'>FacultyDashboard</SidebarItem></Link>
      <Link to="/DashboardFaculty?tab=profile"><SidebarItem active={tab==="profile"} icon={HiUser} as="div" className=' font-serif' label={currentUser.roles}>profile</SidebarItem></Link>
      <Link to="/DashboardFaculty?tab=InternshepPost"><SidebarItem active={tab==="InternshepPost"} icon={MdSignpost } as="div" className=' font-serif'>InternshepPost </SidebarItem></Link>
      <Link to="/DashboardFaculty?tab=ApprovalProcess"><SidebarItem active={tab==="ApprovalProcess"} icon={FcApprove } as="div" className=' font-serif'>ApprovalProcess</SidebarItem></Link>
      <Link to="/DashboardFaculty?tab=Attenadpproval"><SidebarItem active={tab==="Attenadpproval"} icon={LuNotebookText } as="div" className=' font-serif'>Attendance Approval</SidebarItem></Link>
      <Link to="/DashboardFaculty?tab=GreadingActivity"><SidebarItem active={tab==="GreadingActivity"} icon={SiGreatlearning } as="div" className=' font-serif'>Greading & Activity</SidebarItem></Link>
      <Link to="/DashboardFaculty?tab=GeneretReport"><SidebarItem active={tab==="GeneretReport"} icon={VscGraphLine } as="div" className=' font-serif'>GeneretReport</SidebarItem></Link>
      </span>}

</SidebarItemGroup>

      </SidebarItems>
    </Sidebar>
  )
}

export default DashSidebasr