import React, { useState } from 'react'
import { RiArrowDropLeftLine } from 'react-icons/ri'
import {useHistory} from "react-router-dom";
import { REDIRECT_PATH } from '../../../utils/constants';


function SettingsBackgrounds() {
    const history = useHistory();
    const [backgrounds, setBackgrounds] = useState([
        "https://media.discordapp.net/attachments/936398395306803250/942330032691511336/7.jpg",
        "https://media.discordapp.net/attachments/936398395306803250/942330030611136532/8.jpg",
        "https://media.discordapp.net/attachments/936398395306803250/942330030837604383/9.jpg",
        "https://media.discordapp.net/attachments/936398395306803250/942330031026352168/10.jpg",
        "https://media.discordapp.net/attachments/936398395306803250/942330031236079616/1.jpg",
        "https://media.discordapp.net/attachments/936398395306803250/942330031470968842/2.jpg",
        "https://media.discordapp.net/attachments/936398395306803250/942330031701639208/3.jpg",
        "https://media.discordapp.net/attachments/936398395306803250/942330031940710420/4.jpg",
        "https://media.discordapp.net/attachments/936398395306803250/942330032217550858/5.jpg",
        "https://media.discordapp.net/attachments/936398395306803250/942330032452407356/6.jpg",
    ])

    const changeBG = (url: string) => {
        let element = document.getElementsByClassName('phone-background') as HTMLCollectionOf<HTMLElement>;

        element[0].style.backgroundImage = `url(${url})`

    }

    return (
        <div className='w-full h-full bg-[#f0f0f0] text-black absolute pt-8  overflow-y-auto font-roboto'>
            <div className='flex flex-row items-center'>
                <RiArrowDropLeftLine className='hover:text-blue-500 text-lg transition-all cursor-pointer' onClick={() => history.push(REDIRECT_PATH.settings)}/>
                <p className='text-lg font-bold'>Arkaplan</p>
            </div>

            <div className='grid grid-cols-2 gap-1 p-1'>
                {backgrounds.map((background, index) =>
                    <img onClick={() => changeBG(background)} className='h-44 w-44 rounded-lg cursor-pointer' src={background}></img>
                )}
            </div>
        </div>
    )
}

export default SettingsBackgrounds