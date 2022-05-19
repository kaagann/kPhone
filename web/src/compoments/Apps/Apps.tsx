import React from 'react'
import ReactTooltip from 'react-tooltip';
type BackgroundColor = any;

function Apps({
    icon,
    color,
    onClick = () => {},
    name,
    bottom
} : {
    icon: JSX.Element,
    color: String;
    onClick?: () => void;
    name: string; 
    bottom: boolean
}) {
    return (
        <div className='flex flex-col items-center'>
            <div className={`${color} bg-cover text-white flex flex-col justify-center items-center h-14 w-14 rounded-md text-2xl  cursor-pointer`} onClick={onClick}>
                <div>{icon}</div>
                {/* <ReactTooltip place="top" type="dark" effect='solid' data-padding="4px"/> */}
            </div>
            {/* {bottom == false ? <p className='text-center text-white text-xs'>{name}</p> : ""} */}
        </div>

    )
}

export default Apps
