import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const LoadinMountComponent = () => {
    return (
        <div className='w-full h-[100dvh] flex flex-col gap-5 justify-center items-center'>
            <FontAwesomeIcon icon={faSpinner} className='text-4xl text-neutral-700 animate-spin'/>
            <h1 className='text-4xl text-neutral-700 font-bold animate-pulse'>Loading...</h1>
        </div>
    );
}

export default LoadinMountComponent;