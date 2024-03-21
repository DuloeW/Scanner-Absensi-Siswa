import waves from "../assets/waves.svg";
import React from "react";

const Image = ({ rotate = false, topOrBot = true }) => {
    return <img className={`w-full ${rotate ? 'rotate-180' : ''} absolute ${topOrBot ? 'top-0 left-0' : 'bottom-0 left-0'} `}
                src={waves} />
}

export default Image