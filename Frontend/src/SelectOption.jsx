import React from 'react'

const SelectOption = () => {
  return (
    <div>
        <Select
              className="w-full"
              styles={customStyles}
              placeholder="Gender"
              options={options}
            />
    </div>
  )
}

export default SelectOption