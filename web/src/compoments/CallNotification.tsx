import React, { useEffect, useState } from 'react'
import { AiFillPhone, AiOutlineTwitter } from 'react-icons/ai'
import { IoIosCheckmark, IoIosClose } from 'react-icons/io'
import { fetchNui } from '../utils/fetchNui'

function CallNotification({
    name,
    type,
    bool
} : {
    name: any;
    type: string;
    bool: boolean
}) {
    const [time, setTime] = useState<undefined | string>()
    console.log(bool)

    const answerCall = () => {
        fetchNui("answerCall")
    }
    const cancelCall = () => {
        fetchNui("cancelCall")
    }

    const setType = () => {
        if (type == "gelen") return "Telefonun Çalıyor";
        return "Aranıyor";
    }

    let i = 0;
    let saatg=0;
    let dakika: any = 0;
    let saniye: any = 0;
    let newDakika: any = undefined

    function timer() {
        i++;
        saniye = i;
        if (saniye >59){
            i = 0;
            saniye = 0;
            dakika ++;
            if (dakika>59){
                dakika=0;
                saatg++;
            }
        }
        
        if (dakika < 10) {
            if (dakika > 0 )
                 newDakika = "0" + dakika
            else
                newDakika = "00"  
        }

        if (saniye < 10) {
            saniye = "0" + saniye
        }

        setTime(newDakika + "." + saniye) 
    }

    const setTimer = () => {
        if (bool == true)
            setInterval(timer, 1000)
        else
            return "Şimdi"
    } 


    return (   
        <div className='bg-gray-800 bg-opacity-90 text-white w-full p-2 rounded-sm z-50'>
            <div className='w-full flex flex-row justify-between items-center '>
                <div className='flex flex-row items-center gap-1'>
                    <div className={`bg-green-500 flex items-center p-0.5 rounded-sm`}><AiFillPhone/></div>
                    <p>{name}</p>
                </div>
                <p className='text-sm'>{time == undefined ? setTimer() : time}</p>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <p className='text-ellipsis w-10/12 overflow-hidden whitespace-nowrap'>{setType()}</p>

                <div className='flex flex-row items-center gap-1'>
                    {
                        type == "gelen" && bool == false ? <IoIosCheckmark className='bg-green-500 p-1 rounded-full text-black hover:cursor-pointer hover:bg-green-600 transition-all' onClick={answerCall}/> : ""
                    }
                    <IoIosClose className='bg-orange-500 p-1 rounded-full text-black' onClick={cancelCall}/>
                </div>

            </div>
        </div>       
    )
}

export default CallNotification
