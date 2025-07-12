import React from 'react'

const PersonalIdentity = (props) => {
  return (
    <div className='flex justify-center items-center gap-x-2'>
        <div id='icon'>{props.icon}</div>
        <div>{props.name}</div>
    </div>
  )
}

export default PersonalIdentity