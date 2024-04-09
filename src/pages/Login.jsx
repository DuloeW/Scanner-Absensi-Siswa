import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Alert from '../components/Alert'
import success from "../assets/correct.svg"
import failed from "../assets/wrong.svg"
import loadingIcon from "../assets/loading.svg"
import smkIcon from "../assets/smk.svg"
import hideIcon from "../assets/hide.svg"
import showIcon from "../assets/show.svg"
import emailIcon from "../assets/email.svg"
import lockIcon from "../assets/lock.svg"
import background from "../assets/patternpad.svg"
import NotSuportDevice from '../components/NotSuportDevice'
import Cookies from "js-cookie";
import axios from "../axios/axios.js";
import useGlobalStore from "../store/GlobalStore.js";
import {getDeviceType} from "../util/Tools.js";

const Login = () => {

    // if (window.innerWidth >= 500) {
    //     return <NotSuportDevice/>
    // }

    const navigate = useNavigate()
    const [form, setForm] = useState({email: "", password: ""})
    const [alertProp, setAlertProp] = useState({message: "", icon: ""})
    const [openAlert, setOpenAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    const [hide, setHide] = useState(false)
    const {isSupportedDevice, setSupportedDevice} = useGlobalStore()

    const handleEmail = (e) => {
        setForm(prev => ({
            ...prev,
            email: e.target.value
        }))
    }

    const handlePassword = (e) => {
        setForm(prev => ({
            ...prev,
            password: e.target.value
        }))
    }

    const switchOpenAlert = () => {
        setOpenAlert(true);

        setTimeout(() => {
            setOpenAlert(false);
        }, 1800);
    }

    const switchHide = () => {
        setHide(prev => !prev)
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const response = await axios.post('admin-scanner/login', form)
            const responseData = response.data

            console.log(response.status)
            Cookies.set('token-scanner', responseData.token, {expires: 1})
            switchOpenAlert()
            setAlertProp(prev => ({
                ...prev,
                message: responseData.message,
                icon: success
            }))
            setTimeout(() => {
                navigate('/')
            }, 1000)

        } catch (error) {
            switchOpenAlert()
            setAlertProp(prev => ({
                ...prev,
                message: error.response.data.message,
                icon: failed
            }))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getDeviceType() === "mobile" ? setSupportedDevice(true) : setSupportedDevice(false)
    },[])

    if (isSupportedDevice) {
        return <NotSuportDevice/>
    }

    return (
        <div className='w-full h-screen relative  overflow-hidden flex flex-col justify-evenly'>
            <div className=' w-96 h-96 absolute -right-32 -top-32'
                 style={{backgroundImage: `url(${background})`}}></div>
            <div className='grid place-items-center z-10'>
                <img src={smkIcon} width={100} alt='icon'/>
                <div className='text-center text-[#1E41C8]'>
                    <h1 className='text-2xl font-extrabold'>Selamat Datang Kembali</h1>
                    <p className='opacity-30 font-semibold'>Login untuk melanjutkan</p>
                </div>
            </div>
            {openAlert && <Alert message={alertProp.message} icon={alertProp.icon}/>}
            <div className='grid place-items-center gap-10 z-10'>
                <div className='w-4/5 h-fit relative'>
                    <img className='absolute left-3 top-4 z-10 p-1'
                         src={emailIcon}
                         width={30}
                         alt='lock'
                    />
                    <span className='absolute -top-5 left-10 p-2 bg-white text-neutral-300'>EMAIL</span>
                    <input
                        className='w-full p-4 px-12  border-2 border-gray-100 outline-none rounded-xl text-neutral-500 font-semibold'
                        onChange={(e) => handleEmail(e)}
                        type='email'
                        required
                    />
                </div>
                <div className='w-4/5 h-fit relative'>
                    <img className='absolute left-3 top-4 z-10 p-1'
                         src={lockIcon}
                         width={30}
                         alt='lock'
                    />
                    <span className='absolute -top-5 left-10 p-2 bg-white text-neutral-300'>Password</span>
                    <input
                        className='w-full p-4 px-12 pr-14 border-2 border-gray-100 outline-none rounded-xl text-neutral-500 font-semibold'
                        onChange={(e) => handlePassword(e)}
                        type={hide ? 'text' : 'password'}
                        required
                    />
                    <img className='absolute right-6 top-4  z-10 p-1'
                         src={hide ? hideIcon : showIcon}
                         width={30}
                         alt='eye'
                         onClick={() => switchHide()}
                    />
                </div>
                <button
                    className='w-4/5 p-6 py-3 flex justify-center items-center bg-[#1E41C8] rounded-xl text-white font-extrabold text-2xl'
                    onClick={() => handleSubmit()}>
                    {loading ? (
                        <img className='animate-spin'
                             src={loadingIcon}
                             width={40}
                             alt='loading'
                        />
                    ) : (
                        "Login"
                    )}
                </button>
            </div>
            <div className=' w-96 h-96 absolute -left-40 -bottom-40 rotate-90 rounded-xl'
                 style={{backgroundImage: `url(${background})`}}></div>
        </div>
    )
}

export default Login