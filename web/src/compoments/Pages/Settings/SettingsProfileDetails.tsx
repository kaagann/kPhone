import React, { useState } from 'react'
import { RiArrowDropLeftLine } from 'react-icons/ri'
import { REDIRECT_PATH } from '../../../utils/constants'
import { phoneData } from '../../../utils/interfaces'
import {useHistory} from "react-router-dom"
import user from "../../../resources/default.png"
import UserGallery from '../../UserGallery'
import { fetchNui } from '../../../utils/fetchNui'


function SettingsProfileDetails({
    phoneData,
    setPhoneData
}: {
    phoneData: phoneData,
    setPhoneData: React.Dispatch<React.SetStateAction<phoneData | undefined>>

}) {
    const history = useHistory()
    const [galleryDisplay, setGalleryDisplay] = useState<boolean>(false)

    const changeProfilePic = (url: string) => {
        setPhoneData({...phoneData, profilePicture: url})
        
        fetchNui("setProfilePic", url)
    }

    return (
        <div className='w-full h-full bg-[#f0f0f0] text-black absolute pt-8  overflow-y-auto font-roboto'>
            <div className='flex flex-row items-center'>
                <RiArrowDropLeftLine className='hover:text-blue-500 text-lg transition-all cursor-pointer' onClick={() => history.push(REDIRECT_PATH.settings)}/>
                <p className='text-lg font-bold'>Profil</p>
            </div>

            {galleryDisplay ?  <UserGallery onSelect={changeProfilePic} onClose={() => setGalleryDisplay(!galleryDisplay)} phoneData={phoneData}/> : ""}


            <div className='w-full mt-1'>
                <img onClick={() => setGalleryDisplay(!galleryDisplay)} className='w-24 h-24 cursor-pointer mx-auto rounded-full' src={phoneData.profilePicture??user}/>
                <p className='text-center font-semibold text-xl mt-1'>{phoneData.firstname} {phoneData.lastname}</p>
                <p className='text-xs opacity-70 text-gray-700 text-center lowercase'>{phoneData.firstname}@kmail.com</p>
            </div>

            <div className='mt-5 w-full'>

                <div className='settings-items my-0 border-b border-gray-200'>
                    <div className='flex flex-row items-center gap-1'>
                        <div className="bg-indigo-400 p-0.5 w-5 h-5 rounded  text-white">
                            
                        </div>

                        <p className='text-sm'>Numara</p>
                    </div>

                    <p>{phoneData.phoneNumber}</p>
                </div>

                <div className='settings-items my-0 border-b border-gray-200'>
                    <div className='flex flex-row items-center gap-1'>
                        <div className="bg-violet-400 p-0.5 w-5 h-5 rounded  text-white">
                            
                        </div>

                        <p className='text-sm'>IBAN</p>
                    </div>

                    <p>{phoneData.iban}</p>
                </div>


            </div>

        </div>
    )
}

export default SettingsProfileDetails