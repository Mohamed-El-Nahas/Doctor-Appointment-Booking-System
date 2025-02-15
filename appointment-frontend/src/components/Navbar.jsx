import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const navigate = useNavigate();

    const {token, setToken, userData} = useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
        navigate('/')
    }

  return (
    <div className='sticky-navbar flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={() => navigate('/')} className='w-44 h-14 cursor-pointer' src={assets.logo} alt="" />
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1 hover:scale-125 transition-all duration-300'>HOME</li>
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1 hover:scale-125 transition-all duration-300'>DOCTORS</li>
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1 hover:scale-125 transition-all duration-300'>ABOUT</li>
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1 hover:scale-125 transition-all duration-300'>CONTACT</li>
            </NavLink>
        </ul>
        <div className='flex items-center gap-4 '>
            {
                token && userData
                ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-8 rounded-full' src={userData.image} alt="" />
                    <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 '>
                            <p onClick={() => navigate('user-profile')} className='hover:text-black cursor-pointer'>Profile</p>
                            <p onClick={() => navigate('user-appointments')} className='hover:text-black cursor-pointer'>Appointments</p>
                            <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div>
                :<button onClick={() => navigate('/login')} className='bg-cyan-600 text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
            }
            <img className='w-6 md:hidden' onClick={() => setShowMenu(true)} src={assets.menu_icon} alt="" />
            <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img className='w-36' src={assets.logo} alt="" />
                    <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                    <NavLink  onClick={() => setShowMenu(false)} to='/login'><p className='px-4 py-2 rounded inline-block'>CREATE ACCOUNT</p></NavLink>
                    <NavLink  onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
                    <NavLink  onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>DOCTORS</p></NavLink>
                    <NavLink  onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                    <NavLink  onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTANCT</p></NavLink>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar
