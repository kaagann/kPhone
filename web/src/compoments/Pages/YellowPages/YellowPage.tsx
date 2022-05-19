import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { AiFillCamera, AiFillDelete, AiOutlinePhone, AiOutlineTags } from 'react-icons/ai'
import { BsFillImageFill } from 'react-icons/bs'
import { fetchNui } from '../../../utils/fetchNui'
import { ads, NotificationInterface, phoneData } from '../../../utils/interfaces'
import BigImage from '../../BigImage'
import {useHistory} from "react-router-dom"
import { REDIRECT_PATH } from '../../../utils/constants'
import ModalInput from '../../ModalInput'

function YellowPage({
    phoneData
}: {
    phoneData: phoneData
}) {
    const [ads, setAds] = useState<ads[]>([])
    const [modal, setModal] = useState<boolean>(false)

    useEffect(() => {
        fetchNui("getAds").then((data) => setAds(data));
    }, [])
    
    const sendAd = (value: string, img: any) => {
        const date = new Date()
        if (value == "" || value == null || img == null || img == "") return

        setAds([...ads, {
            desc: value,
            name: `${phoneData.firstname} ${phoneData.lastname}`,
            phoneNumber: 6518,
            date,
            img
        }])

        fetchNui("newAds", {
            name: `${phoneData.firstname} ${phoneData.lastname}`,
            phoneNumber: phoneData.phoneNumber,
            date, 
            img,
            desc: value
        })

        setModal(false);
    }

    const [bigImage, setBigImage] = useState("")

    const openPhoto = (url: string) => {
        setBigImage(url)
    }

    const closePhoto = () => {
        setBigImage("")
    }

    const inputs = [
        {
            id: "desc",
            name: "Açıklama"
        },
        {
            id: "img",
            name: "Resim (URL)"
        }
    ]

    const pushAds = (values: any) => {
        let img = values["img"] as string
        let desc = values["desc"] as string

        sendAd(desc, img)
    }



    return (
        <div className='w-full h-full bg-gray-100 absolute pt-8 text-black overflow-y-auto'>
            <div className="flex w-full justify-between items-center text-xl p-2">
                <p className='font-semibold'>Mor Sayfalar</p>
                <AiOutlineTags className='hover:text-purple-500 transition cursor-pointer' onClick={() => setModal(!modal)}/>
            </div>
            
            
            
            {modal ? <ModalInput inputs={inputs} onClick={pushAds} onClose={() => setModal(!modal)}/> : "" }
            {bigImage ? <BigImage url={bigImage} onClose={closePhoto}/> : ""}
            <div className='flex flex-col-reverse overflow-y-auto'>
                {ads.map((ad) => <Ilan openPhoto={openPhoto} name={ad.name} phoneNumber={ad.phoneNumber} desc={ad.desc} date={ad.date} img={ad.img}/>)}
            </div>


            
        </div>
    )
}


function Ilan({name, phoneNumber, desc, date, img, openPhoto}: {name: String; phoneNumber: Number; desc: String; date: Date, img: any; openPhoto: (url: string) => void}) {
    const history = useHistory()
    return (
        <div className=' bg-white shadow-md p-1 text-black rounded'>
            <div className='flex items-center gap-1 '>
                <img className='w-16 h-16 rounded' onClick={() => openPhoto(img)} src={img} />

                <div className=''>
                    <p className='font-semibold leading-4 text-lg'>{name}</p>
                    <p className='text-gray-600 text-xs'>{desc}</p>
                </div>
            </div>
            <div className='w-full grid grid-cols-2 items-center text-xs gap-1 text-white my-0.5'>
                <p onClick={() => history.push(`${REDIRECT_PATH.messages}${REDIRECT_PATH.messageDetails}?number=${phoneNumber}`)} className='bg-purple-600 hover:bg-purple-700 p-2 rounded text-center cursor-pointer'>Mesaj At</p>
                <p onClick={() => fetchNui("callContact", phoneNumber) } className='bg-fuchsia-600 hover:bg-fuchsia-700 p-2 rounded text-center cursor-pointer'>Ara</p>
            </div>
        </div>
    )
}

function Modal({
    modalEvent,
    sendAd,
}: {
    modalEvent: React.Dispatch<React.SetStateAction<boolean>>;
    sendAd: (value: string, img: any) => void;
}) {
    const closeEvent = () => modalEvent(false)


    return (
        <div className='w-full h-full bg-black bg-opacity-60  absolute flex items-center top-0 right-0 justify-center'>
            <div className='bg-gray-100 shadow rounded-sm p-0.5 m-2 py-1.5 '>
                <p className='text-center'>Yeni İlan</p>

                <div className='flex flex-row border-b items-center p-0.5 gap-1 m-1'>
                    <AiOutlineTags/>
                    <input type="text" placeholder='Açıklama' className='boder-none outline-none bg-transparent' id="ads-desc"/>
                </div>

                <div className='flex flex-row border-b items-center p-0.5 gap-1 m-1'>
                    <BsFillImageFill/>
                    <input type="text" placeholder='Resim (URL)' className='boder-none outline-none bg-transparent' id="ads-img" />
                </div>

                <div className='flex flex-row justify-end w-full p-0.5 gap-1 text-white'>
                    <div className='cursor-pointer p-1 rounded text-center transition bg-red-600' onClick={closeEvent}>İptal Et</div>
                    <div className='cursor-pointer p-1 rounded text-center transition bg-green-600' onClick={() => 
                        sendAd((document.getElementById("ads-desc") as HTMLInputElement).value, (document.getElementById("ads-img")as HTMLInputElement).value)
                    }>Onayla</div>
                </div>
            </div>

        </div>
    )
    
}




export default YellowPage
