import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-row items-center justify-center mt-[-25px] ml-[-50px]'>

      <div className=' flex flex-col items-center ml-56  gap-9 ml-[60px]' >
      <h1 className='font-extrabold text-[60px] text-center mt-16'>Discover Your Next Adventure</h1>
      <p className='font-bold text-xl text-center text-[#00796b] mx-11'>Explore breathtaking destinations, create unforgettable memories, and embark on the journey of a lifetime</p>
      <Link to='/create-trip'>
      <Button>Start Exploring</Button>
      </Link>
    </div>
      <div className='flex-shrink-0 '>

        <img src='/hero.png' className='' /> 
    </div>
    </div>
  )
}

export default Hero
