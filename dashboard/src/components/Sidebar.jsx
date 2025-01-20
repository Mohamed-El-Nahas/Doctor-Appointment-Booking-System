import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

    const {aToken} = useContext(AdminContext)

    const {docToken} = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-white border-r'>
        {
            aToken && <ul className='text-[#515151] mt-5'>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-cyan-600' : ''}`} to={'/admin-dashboard'}>
                    <img className='min-w-5' src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-cyan-600' : ''}`} to={'/all-appointments'}>
                    <img className='min-w-5' src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-cyan-600' : ''}`} to={'/add-doctor'}>
                    <img className='min-w-5' src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>Add Doctor</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-cyan-600' : ''}`} to={'/doctors-list'}>
                    <img className='min-w-5' src={assets.people_icon} alt="" />
                    <p className='hidden md:block'>Doctors List</p>
                </NavLink>
            </ul>
        }

        {
            docToken && <ul className='text-[#515151] mt-5'>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-cyan-600' : ''}`} to={'/doctor-dashboard'}>
                    <img className='min-w-5' src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-cyan-600' : ''}`} to={'/doctor-appointments'}>
                    <img className='min-w-5' src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-cyan-600' : ''}`} to={'/doctor-profile'}>
                    <img className='min-w-5' src={assets.people_icon} alt="" />
                    <p className='hidden md:block'>Profile</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar