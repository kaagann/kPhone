import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import App from '../../Apps/Apps'
import { AiFillCamera, AiOutlineTwitter, AiOutlineWhatsApp, AiTwotoneBank } from 'react-icons/ai';
import { SiGooglemessages, SiTinder } from 'react-icons/si';
import { FaCog, FaHackerNews, FaMoneyCheck } from 'react-icons/fa';
import { REDIRECT_PATH } from '../../../utils/constants';
import { IoMdMail } from 'react-icons/io';
import { FcPhone, FcSettings, FcBriefcase } from 'react-icons/fc';
import { BsTelephoneFill } from 'react-icons/bs';
import { IoLayersSharp } from 'react-icons/io5';
import { GrGallery } from 'react-icons/gr';
import { MdInsertPhoto, MdPhotoSizeSelectActual, MdWork } from 'react-icons/md';
import { BiPhotoAlbum } from 'react-icons/bi';
import { ImNewspaper } from 'react-icons/im';
import { fetchNui } from '../../../utils/fetchNui';
import { phoneData } from '../../../utils/interfaces';

function Home({
    phoneData,
    setPhoneData
}: {
    phoneData: phoneData;
    setPhoneData: React.Dispatch<React.SetStateAction<phoneData>>
}) {
    const history = useHistory();
    const [apps, setApps] = useState([
        {
            icon: <BsTelephoneFill/>,
            path: REDIRECT_PATH.contacts,
            color: "bg-gradient-to-t from-green-600 to-green-700",
            name: "Rehber",
            bottom: true
        },

        {
            icon: <AiOutlineWhatsApp/>,
            path: REDIRECT_PATH.messages,
            color: "bg-green-600 text-2xl",
            name: "Mesajlar",
            bottom: true
        },

        {
            icon: <AiOutlineTwitter/>,
            path: REDIRECT_PATH.twitter,
            color: "bg-gradient-to-t from-blue-400 to-blue-600",
            name: "Twitter",
            bottom: true
        },

        {
            icon: <IoLayersSharp/>,
            path: REDIRECT_PATH.yellowPage,
            color: "bg-violet-500",
            name: "İlanlar",
            bottom: false
        },

        {
            icon: <AiTwotoneBank/>,
            path: REDIRECT_PATH.bank,
            color: "bg-[#1b1a21]",
            name: "Banka",
            bottom: false
        },

        {
            icon: <FaCog/>,
            path: REDIRECT_PATH.settings,
            color: "bg-gradient-to-t from-gray-600 to-gray-700",
            name: "Ayarlar",
            bottom: true

        },

        {
            icon: <IoMdMail/>,
            path: REDIRECT_PATH.mail,
            color: "bg-gradient-to-t from-blue-600 to-blue-700",
            name: "Mail",
            bottom: false
        },

        // {
        //     icon: <SiTinder/>,
        //     path: REDIRECT_PATH.tinder,
        //     color: "bg-gradient-to-t from-red-600 to-red-700",
        //     name: "Binder",
        //     bottom: false
        // },

        {
            icon: <MdPhotoSizeSelectActual/>,
            path: REDIRECT_PATH.gallery,
            color: "bg-orange-500 ",
            name: "Galeri",
            bottom: false
        },

        {
            icon: <AiFillCamera/>,
            path: REDIRECT_PATH.gallery,
            color: "bg-gradient-to-t from-gray-500 to-gray-600 ",
            name: "Kamera",
            bottom: false
        },



        {
            icon: <ImNewspaper/>,
            path: REDIRECT_PATH.news,
            color: "bg-gradient-to-t from-red-500 to-red-600 ",
            name: "Haberler",
            bottom: false
        },

        {
            icon: <MdWork/>,
            path: REDIRECT_PATH.workstation,
            color: "bg-[#b858e3]",
            name: "İş Merkezi",
            bottom: false
        },

        
    ])

    const takePhoto = () => {
        let element = document.getElementsByClassName('container') as HTMLCollectionOf<HTMLElement>;

        element[0].style.display = "none";

        fetchNui("takePhoto").then((data) => {
            console.log(data)
            if (data) {
                let newGallery = phoneData?.gallery
                
                newGallery?.push(data)
            
                setPhoneData({...phoneData, gallery: newGallery})
                element[0].style.display = "block";
            }
        })

    }

    // 

    return (
        <div className='w-full h-full absolute flex items-start top-0 lr-0 justify-center pt-8 px-2 '>
            <div className="grid grid-cols-4 gap-2 pt-4">
                {apps.map((x) => x.bottom == false ? 
                    <App icon={x.icon} onClick={() => x.name == "Kamera" ? takePhoto() : history.push(x.path) } color={x.color} name={x.name} bottom={x.bottom}/> : ""
                )}
            </div>
            <div className='absolute bottom-0 grid grid-cols-4 gap-2 mb-8 bg-white bg-opacity-10 p-2 rounded-lg  '>
                {apps.map((x) => x.bottom == true ? 
                    <App icon={x.icon} onClick={() => history.push(x.path) } color={x.color} name={x.name} bottom={x.bottom}/> : ""
                )}
            </div>
        </div>
    )
}

export default Home
