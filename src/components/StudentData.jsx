import React from "react";

const StudentData = ({ title, value }) => {
    return (
        <div className='flex flex-col gap-3'>
            <h1 className='font-extrabold text-blue-950'>{title}</h1>
            <p className='border-b-2 pb-1 font-semibold text-blue-950 opacity-45'>{value}</p>
        </div>
    )
}

export default  StudentData