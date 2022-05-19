import React from 'react'
import { AiOutlineTwitter } from 'react-icons/ai'
import {animated, useSpring} from "react-spring";


function Notification({
    name,
    color,
    message,
    icon,
    display
} : {
    name: String;
    color: String;
    message: String;
    icon: JSX.Element;
    display: boolean
}) {
    const animation = useSpring({
        from: {marginTop: display ? "-70px" : "0px"},
        to: {marginTop: display ? "0px" : "-70px"},
    })


    return (   
        <animated.div style={animation} className='bg-gray-900  bg-opacity-90 text-white w-full p-2 rounded-md z-50 '>
            <div className='w-full flex flex-row justify-between items-center '>
                <div className='flex flex-row items-center gap-1'>
                    <div className={`${color} flex text-xs items-center p-1 rounded-sm`}>{icon}</div>
                    <p className='uppercase font-medium opacity-70'>{name}</p>
                </div>
                <p className='text-sm font-medium opacity-70'>şimdi</p>
            </div>
            <p className='text-ellipsis w-11/12 overflow-hidden whitespace-nowrap'>{message}</p>
        </animated.div>       
    )
}

export default Notification
