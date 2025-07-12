import React from 'react'

const InterestComponent = (props) => {
  return (
    <div>
        <div className='inline px-8 py-1 text-sm font-medium text-gray-700 border-2 border-gray-400 rounded-full '>
            {props.name}
        </div>
    </div>
  )
}

export default InterestComponent