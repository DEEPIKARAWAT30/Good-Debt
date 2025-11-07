import React from 'react'
import Feature from './Feature'
 


function choose() {
  return (
    <>
    <div className='w-full h-full  bg-white mb-20'>
        <div className=' flex items-center justify-center'>
           <span> <div className='bg-red-700 text-white font-bold text-lg rounded-full flex flex-col items-center justify-center  w-25 h-25 mt-12'>
          <h1 className=' '>WHY</h1>
          <h1>CHOOSE</h1>
          <h1>US</h1>
            </div>
            </span>
        </div>
        <div>
            <Feature />
        </div>
    </div>
    </>
  )
}

export default choose