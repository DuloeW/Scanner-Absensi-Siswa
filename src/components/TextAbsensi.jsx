import React from "react";

const TextAbsensi = (absenType) => {
    switch (absenType.type) {
        case 0:
            return <p>Hadir</p>
        case 1:
            return <p>Izin</p>
        case 2:
            return <p>Sakit</p>
        case 3:
            return <p>Alpa</p>
        default:
            return <p>Hadir</p>
    }
}

export default TextAbsensi