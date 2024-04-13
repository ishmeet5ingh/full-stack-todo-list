import React from 'react'

const Input = React.forwardRef(({
    label,
    type="text",
    className='',
    ...props
}, ref)=>{
    return(
        <>
            {label && <label>{label}</label>}
            <input
                type={type}
                className={`className="border p-2 w-2/3 rounded-md" ${className}`}
                ref={ref}
                {...props}
            />
        </>
    )

})

export default Input