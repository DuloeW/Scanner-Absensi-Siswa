import React from 'react'

const Alert = ({ icon, message }) => {
    return (
        <div className={`w-4/5 h-fit p-9 flex flex-col justify-center items-center bg-white shadow-2xl shadow-neutral-300 absolute left-2/4 -translate-x-2/4 z-50 rounded-xl`}>
            <img src={icon} width={100} />
            <p className='font-semibold'>
                {message}
            </p>
        </div>
    )
}

export default Alert