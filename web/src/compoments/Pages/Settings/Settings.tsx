import React, { useEffect, useState } from 'react';
import { AiFillCamera, AiFillCreditCard, AiFillPhone, AiFillPicture, AiOutlineUser } from 'react-icons/ai';
import { CopyClipboard, REDIRECT_PATH } from '../../../utils/constants';
import { phoneData } from '../../../utils/interfaces';
import {ImFilePicture} from "react-icons/im"
import { FaExchangeAlt } from 'react-icons/fa';
import { BsCreditCard2Front, BsFillMoonFill, BsFillSunFill, BsPhone } from 'react-icons/bs';
import user from "../../../resources/default.png"
import { IoMdArrowDropright } from 'react-icons/io';
import {useHistory} from "react-router-dom";
import { RiArrowDropRightLine } from 'react-icons/ri';
import UserGallery from '../../UserGallery';
import { fetchNui } from '../../../utils/fetchNui';
import { MdKeyboardArrowRight } from 'react-icons/md';
import "./switch.css"
import Modal from '../../Modal';
import ModalInput from '../../ModalInput';

function Settings({
    phoneData,
    setPhoneData
} : {
    phoneData: phoneData,
    setPhoneData: React.Dispatch<React.SetStateAction<phoneData | undefined>>
}) {
    const [modal, setModal] = useState(false)
    const displayModal = () => setModal(!modal)
    let theme = phoneData.phoneTheme
    const history = useHistory();


    useEffect(() => {
        const root = window.document.documentElement
        console.log("naber biladerim", theme)
        root.classList.remove(theme === "dark" ? "light" : "dark")
        root.classList.add(theme)
    }, [theme])

    useEffect(() => {
        theme = phoneData.phoneTheme
    }, [phoneData])

    const setPhoneTheme = () => {
        let newTheme = theme === "dark" ? "light" : "dark";
        setPhoneData({...phoneData, phoneTheme: newTheme})
    }
    
    


    return (
        <div className='w-full h-full bg-[#f0f0f0] text-black absolute pt-8  overflow-y-auto font-roboto'>
            <p className='text-2xl m-2 ml-4 font-semibold'>Ayarlar</p>
            {modal ? <Modal onClick={() => console.log("1")} onClose={() => setModal(!modal)} message="en sevdiğim kankim kocadede" /> : ""}

            <div className='w-full bg-white p-3 px-2 flex flex-row items-center justify-between rounded'>
                <div className='flex items-center flex-row'>
                    <div>
                        <img onClick={() => setModal(!modal)} className='w-12 h-12 rounded-full settings-profilcepic' src={phoneData.profilePicture != undefined && phoneData.profilePicture != null ? phoneData.profilePicture :  user}/>
                    </div>
                    <div className='ml-2'>
                        <p className='font-bold'>{phoneData.firstname} {phoneData.lastname}</p>
                        <p className='text-xs opacity-90'>Hesap detayları</p>
                    </div>
                </div>


                <MdKeyboardArrowRight onClick={() => history.push(`${REDIRECT_PATH.settings}${REDIRECT_PATH.settingsProfileDetails}`) } className='text-xl hover:text-blue-500 transition-all cursor-pointer'/>
            </div>

            <div className='mt-5 w-full'>

                <div className='settings-items my-0 border-b border-gray-200'>
                    <div className='flex flex-row items-center gap-1'>
                        <div className="bg-[#feb053] p-0.5 w-5 h-5 rounded  text-white">
                            
                        </div>

                        <p className='text-sm'>Uçak Modu</p>
                    </div>

                    <label className="switch">
                        <input type="checkbox" onChange={() => setPhoneData({...phoneData, airplanemode: phoneData.airplanemode == true ? false : true})} checked={phoneData.airplanemode}/>
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className='settings-items  '>
                    <div className='flex flex-row items-center gap-1'>
                    <div className="bg-[#48cb3e] p-0.5 w-5 h-5 rounded text-white">
                            
                        </div>

                        <p className='text-sm'>Bildirimler</p>
                    </div>

                    <label className="switch">
                        <input type="checkbox" onChange={() => setPhoneData({...phoneData, notifications: phoneData.notifications == true ? false : true }) } checked={phoneData.notifications}/>
                        <span className="slider round"></span>
                    </label>

                </div>
                <div className='settings-items my-2'>
                    <div className='flex flex-row items-center gap-1'>
                        <div className="bg-[#5497fe] p-0.5 w-5 h-5 rounded text-white">

                        </div>

                        <p className='text-sm'>Arkaplan</p>
                    </div>
                
                    <RiArrowDropRightLine className='hover:text-blue-500 transition-all cursor-pointer' onClick={() => history.push(`${REDIRECT_PATH.settings}${REDIRECT_PATH.settingsBackgrounds}`)}/>
                </div>



            </div>

        </div>
    )
}

function Switch({
    onClick = () => {},
    checked = false,
}: {
    onClick: () => void,
    checked: boolean
}) {
    return (
        <label className="flex items-center cursor-pointer relative">
            <input type="checkbox" id="toggle-example" className="sr-only" checked={checked} onChange={onClick}/>
            <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-5 w-9 rounded-full transition-all"></div>
        </label>

    )
}


export default Settings;
