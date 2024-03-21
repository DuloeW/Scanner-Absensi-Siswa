import React from 'react'


const Buble = ({ color, onSendData, title }) => {

    const handleSendData = () => {
        switch (color) {
            case "green":
                onSendData({ color: "#166534", absenType: 0 });
                break;
            case "blue":
                onSendData({ color: "#011359", absenType: 1 });
                break
            case "orange":
                onSendData({ color: "#914901", absenType: 2 });
                break
            case "red":
                onSendData({ color: "#a60e03", absenType: 3 });
                break
            default:
                onSendData({ color: "#a60e03", absenType: 3 });
                break
        }
    }


    return (
        <div className={`w-fit h-fit p-2 text-center text-neutral-800 rounded-lg bg-white shadow-lg `}
            onClick={handleSendData}>
            <p className='font-semibold' style={{color: color}}>{title}</p>
        </div>
    )
}

export default Buble