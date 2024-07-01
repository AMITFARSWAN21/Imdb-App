import React from 'react'

function Banner() {
  return (
    <div   className='h-[20vh] md:h-[60vh] bg-center  flex items-end'
    style={{
      backgroundImage:`URL(https://images.unsplash.com/photo-1559108318-39ed452bb6c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1vdmllJTIwcG9zdGVyfGVufDB8fDB8fHww)`
     }}
    >
    {/* <div className='text xl md:text-3xl bg-grey-900 bg-opacity-60 p-4 text-white text-center w-full'>Movie</div> */}
    
    </div>
  )
}

export default Banner
