import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {

  return (
    <div>
      <div className='text-center text-2xl pt-10 text-cyan-600'>
        <p>CONTACT <span className='text-cyan-800 font-semibold'>US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-cyan-800'>Our OFFICE</p>
          <p className='text-gray-500'>0000 Street St <br /> St 0000, Cairo Egypt</p>
          <p className='text-gray-500'>Tel: (20) 000-000 <br /> Email: loremipsum@gmail.com</p>
          <p className='font-semibold text-lg text-cyan-800'>Careers at PRESCRIPTO</p>
          <p className='text-gray-600'>Learn more about our teams and job openings</p>
          <button className='border border-cyan-800 text-cyan-800 px-8 py-4 text-sm hover:bg-cyan-800 hover:text-white transition-all duration-300'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact