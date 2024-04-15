import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import NotSuportDevice from '../components/NotSuportDevice'
import Buble from '../components/Buble'
import reload from '../assets/reload.svg'
import Alert from '../components/Alert'
import success from "../assets/correct.svg"
import failed from "../assets/wrong.svg"
import loadingIcon from "../assets/loading.svg"
import noteIcon from "../assets/note.svg"
import background from "../assets/patternpad.svg"
import axios from "../axios/axios";
import ImageWaves from "../components/ImageWaves.jsx";
import StudentData from "../components/StudentData.jsx";
import TextAbsensi from "../components/TextAbsensi.jsx";
import {getDeviceType, goToLoginPage} from "../util/Tools.js";
import useGlobalStore from "../store/GlobalStore.js";

const AbsenIdCard = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({student: null})
    const [colAbs, setColAbs] = useState({color: "green", absenType: 0})
    const [openAlert, setOpenAlert] = useState(false)
    const [alertProp, setAlertProp] = useState({icon: "", message: ""})
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const {isSupportedDevice, setSupportedDevice} = useGlobalStore()

    const studentAbsen = async () => {
        try {
            setLoading(true);

            const student = {
                student: data.student.nisn,
                status: colAbs.absenType
            };

            if (data.student.status === "NON_ACTIVE") {
                switchOpenAlert();
                setAlertProp(prev => ({
                    ...prev,
                    message: "Siswa Tidak Aktif",
                    icon: failed
                }));
                return;
            }
            const response = await axios.post("/absensi/create", student);
            const responseData = response.data.data;

            switchOpenAlert();
            setAlertProp(prev => ({
                ...prev,
                message: "Berhasil Absensi",
                icon: success
            }));
        } catch (error) {
            switchOpenAlert();
            const errorMessage = error.response ? error.response.data.message || "Gagal Absensi" : "Gagal Absensi";
            setAlertProp(prev => ({
                ...prev,
                message: errorMessage,
                icon: failed
            }));
        } finally {
            setLoading(false);
        }
    };

    const switchOpenAlert = () => {
        setOpenAlert(true);

        setTimeout(() => {
            setOpenAlert(false);
        }, 1800);
    }

    const switchShow = () => {
        setShow(prev => !prev)
    }

    const gotToScanner = () => {
        navigate("/")
    }

    const handleChildData = (data) => {
        setColAbs(data)
    }

    const removeSymbol = (string) => {
        return string?.replace(/_/g, ' ')
    }

    useEffect(() => {
        const fetchDataAndSetData = async () => {
            try {
                const nisn = window.location.href.split('/').pop();
                const response = await axios.get(`/students/get/nisn/${nisn}`)
                const student = await response.data.data;
                console.log(student)
                setData(prev => ({...prev, student}));
            } catch (error) {
                console.error("Error fetching image:", error.message);
                if (error.code === "ERR_BAD_REQUEST") {
                    goToLoginPage()
                }
            }
        };

        if (getDeviceType() === "mobile") {
            setSupportedDevice(true)
            fetchDataAndSetData();
        } else {
            setSupportedDevice(false)
        }

    }, [])

    return (
        !isSupportedDevice ? <NotSuportDevice/> :
            <div className='w-full h-screen relative p-10 overflow-hidden'>
                <div className=' w-96 h-96 absolute -right-32 -top-32'
                     style={{backgroundImage: `url(${background})`}}></div>
                <div className='w-full h-full flex flex-col justify-around items-center'>
                    <div className='w-[280px] h-52 rounded-xl flex justify-center items-center relative bg-gray-400'
                         style={{
                             backgroundImage: `url(data:image/png;base64,${data?.student?.image?.file})`,
                             backgroundRepeat: "no-repeat",
                             rotate: "-90deg",
                             backgroundSize: "cover",
                             backgroundPosition: "center"
                         }}>
                        {data.student == null && <p className='rotate-90'>NOT FOUND</p>}
                    </div>

                    <div className='w-full h-fit relative flex flex-col justify-evenly gap-5'>

                        {openAlert && <Alert message={alertProp.message} icon={alertProp.icon}/>}

                        <StudentData title={"NISN"} value={data.student?.nisn}/>
                        <StudentData title={"Nama"} value={data.student?.name}/>
                        <StudentData title={"Kelas"} value={data.student?.classGrade.grade}/>
                        <StudentData title={"Jurusan"} value={removeSymbol(data.student?.classGrade.major)}/>
                    </div>

                    <div>
                        {show && (
                            <div className='flex justify-center gap-3 mb-2' onClick={() => switchShow()}>
                                <Buble color={"green"} title={"Hadir"} onSendData={handleChildData}/>
                                <Buble color={"red"} title={"Alpa"} onSendData={handleChildData}/>
                                <Buble color={"orange"} title={"Sakit"} onSendData={handleChildData}/>
                                <Buble color={"blue"} title={"Izin"} onSendData={handleChildData}/>
                            </div>
                        )}
                        <div className='w-full flex gap-5 justify-between items-center'>
                            <div className='w-16 h-16 flex justify-center items-center shadow-xl rounded-2xl'>
                                <button onClick={() => switchShow()}>
                                    <img className=''
                                         src={noteIcon}
                                         width={40}
                                         alt='note'
                                    />
                                </button>
                            </div>
                            <button
                                className='w-48 py-4 flex justify-center items-center rounded-3xl bg-green-800  text-white font-extrabold text-2xl'
                                style={{backgroundColor: colAbs.color}}
                                onClick={() => studentAbsen()}>
                                {loading ? (
                                        <img className='animate-spin'
                                             src={loadingIcon}
                                             width={40}
                                             alt='loading'
                                        />
                                    ) :
                                    <TextAbsensi type={colAbs.absenType}/>
                                }
                            </button>
                            <div className='w-16 h-16 flex justify-center items-center shadow-xl rounded-2xl'>
                                <button onClick={() => gotToScanner()}>
                                    <img className=''
                                         src={reload}
                                         width={40}
                                         alt='loading'
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ImageWaves rotate={true} topOrBot={false}/>
            </div>
    )
}

export default AbsenIdCard