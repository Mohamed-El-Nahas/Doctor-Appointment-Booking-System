import React from 'react'
import Hero from '../components/Hero'
import Sepcialities from '../components/Sepcialities'
import HomeDoctors from '../components/HomeDoctors'
import HomeBanner from '../components/HomeBanner'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Sepcialities/>
      <HomeDoctors/>
      <HomeBanner/>
    </div>
  )
}

export default Home