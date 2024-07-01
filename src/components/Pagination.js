import React from 'react'

function Pagination(props) {
  const { pageNumProp, prevPageProp, nextPageProp } = props;
  return (
    <div className='flex justify-center my-4'>
      <button
        onClick={prevPageProp}
        className='flex items-center justify-center p-3 rounded-l-xl bg-blue-500 text-white hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300'
      >
        Prev
      </button>

      <div className='flex items-center justify-center p-3 bg-blue-500 text-white'>
        {pageNumProp}
      </div>

      <button
        onClick={nextPageProp}
        className='flex items-center justify-center p-3 rounded-r-xl bg-blue-500 text-white hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300'
      >
        Next
      </button>
    </div>
  )
}

export default Pagination

