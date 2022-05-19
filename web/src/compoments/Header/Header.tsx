import React from 'react';
import { BsBatteryFull } from 'react-icons/bs';
import { MdOutlineSignalCellularAlt } from 'react-icons/md';

import "./style.css";

function Header({
    footerColor
}: {
    footerColor: string
}) {
    return (
        <div className={`${footerColor} absolute top-0 flex flex-row justify-between items-center z-40 w-full text-white  px-4 pt-2 gap-1`}>
            <div>08:05</div>
            <div className="phone-icons flex flex-row">
                <MdOutlineSignalCellularAlt/>
                <BsBatteryFull/>
            </div>
        </div>
    )
}



export default Header
