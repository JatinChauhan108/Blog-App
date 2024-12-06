import React, { useId } from 'react'

// below we have used optional mapping i.e., map function would be applied on the options array only when the options array is not empty 

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {

    const id = useId();

  return (
    <div className='w-full'>
        {label && (
            <label htmlFor={id}>
                {label}
            </label>)}
        <select
            {...props}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            id = {id}
            ref = {ref}>
            {options?.map((option) => (
                <option key = {option} value = {option}> 
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)                                         // another way of using forwardRef on a component