import React, { Children } from 'react'

function Button({
    type="button",
    children,
    bgColor="bg-red-600",
    className='',
    ...props
}){
    return (
        <button 
        type={type} 
        className={`${bgColor} p-2 text-white ml-2 rounded-md ${className}`}

        {...props}>
            {children}
        </button>
    )
}
export default Button