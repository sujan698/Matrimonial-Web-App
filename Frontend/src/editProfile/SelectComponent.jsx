import React from 'react'

const SelectComponent = ({name}) => {
  return (
    <div className='w-full py-2 text-xl font-medium cursor-pointer hover:bg-slate-100'>
        {name}
    </div>
  )
}

export default SelectComponent