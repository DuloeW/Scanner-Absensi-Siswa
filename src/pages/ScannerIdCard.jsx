import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import NotSuportDevice from '../components/NotSuportDevice'

const ScannerIdCard = () => {

    //check device
    if (window.innerWidth >= 500) {
        return <NotSuportDevice/>
    }

    const navigate = useNavigate()

    const [data, setData] = useState({data: null})
    const [dateNow, setDateNow] = useState({
        date: "",
        month: "",
        year: ""
    })

    useEffect(() => {
        startDetection2()
        convertDate()
        console.log(data.data)
    }, [])


    const startDetection2 = async () => {
        console.log("Starting detection");

        let video = document.getElementById('barcode-detection-video');
        video.srcObject = await navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}});
        await video.play();

        let barcodeDetector = new BarcodeDetector({formats: ["qr_code"]});

        let canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        let context = canvas.getContext('2d');

        let intervalId = null;

        let checkForQrCode = async function () {
            console.log("Checking for QR code");

            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            let barcodes = await barcodeDetector.detect(canvas);

            if (barcodes.length > 0) {
                clearInterval(intervalId)
                let barcodeData = barcodes[0].rawValue;
                setData(prev => ({...prev, data: barcodeData}))
                const jsonStr = "{" + barcodeData.slice(1, -1) + "}";
                const data = JSON.parse(jsonStr);
                const student = data["nisn"];
                navigate("/absen/" + student)
                // fetchDataAndSetData(student)
            }
        };

        // Check again in 10ms
        intervalId = setInterval(() => requestAnimationFrame(checkForQrCode), 100);

        await checkForQrCode();
    }

    const convertDate = () => {
        const dateNow = new Date()
        setDateNow(prev => ({
            ...prev,
            date: dateNow.getDate(),
            month: dateNow.getMonth() + 1,
            year: dateNow.getFullYear()
        }))
    }


    return (
        <div className='w-full h-screen overflow-hidden relative p-10 flex flex-col items-center gap-20'>
            <div className='w-44 h-44 rounded-full bg-blue-950 absolute -top-20 -right-20 -z-10'></div>
            <div className='mt-[10%]'>
                <h1 className='text-[40px] font-extrabold text-blue-950'>Absensi Barcode</h1>
                <p className='text-center font-extrabold text-blue-950 tracking-widest'>{dateNow.date} - {dateNow.month} - {dateNow.year}</p>
            </div>
            <video className='w-auto rounded-xl'
                   id='barcode-detection-video'></video>
            <div className='w-44 h-44 rounded-full bg-blue-950 absolute -bottom-20 -left-20 -z-10'></div>
        </div>
    )
}

export default ScannerIdCard