import React from 'react'
import { AiFillHome, AiOutlineSearch, AiOutlineTwitter } from 'react-icons/ai'
import { FaFeatherAlt, FaUserAlt } from 'react-icons/fa'
import { REDIRECT_PATH } from '../../../utils/constants'
import { ITwit, phoneData } from '../../../utils/interfaces'
import {useHistory} from "react-router-dom"
import TwitModal from './TwitModal'
import user from "../../../resources/default.png"


function TwitterProfile({
    phoneData,
    twits,
    setTwits
}: {
    phoneData: phoneData,
    twits: ITwit[],
    setTwits: React.Dispatch<React.SetStateAction<ITwit[]>>
}) {
    const history = useHistory()
    return (

        <div className='w-full h-full bg-[#f4f8fb] absolute pt-8 text-black'>
            <div className="flex w-full justify-between items-center text-xl p-2 bg-white shadow">
                <AiOutlineTwitter className='text-[#2ba7f3] transition cursor-pointer' />
                <p className='text-base font-semibold'>Twitter</p>
                <img src={phoneData.profilePicture != undefined && phoneData.profilePicture != null ? phoneData.profilePicture :  user} className='w-8 h-8 shadow rounded-full'/>
            </div>

            <div className='flex flex-row items-center m-3 p-1 shadow rounded-md bg-white gap-1'>
                <img className='w-16 h-16 rounded-full border p-1' src={phoneData.profilePicture != undefined && phoneData.profilePicture != null ? phoneData.profilePicture :  user}/>
                <div>
                    <p className='font-semibold leading-4'>{phoneData.firstname} {phoneData.lastname}</p>
                    <p className='text-xs text-blue-500'>@{phoneData.firstname}_{phoneData.lastname}</p>
                </div>
            </div>
            
            <div className='flex flex-col-reverse items-center p-2 font-roboto'>

                
            {
                twits.map((twit, index) =>
                    phoneData.citizenid == twit.citizenid ? <TwitModal phoneData={phoneData} twit={twit} index={index} setTwits={setTwits} twits={twits}/> : ""
                )
            }

            </div>

            <div className='w-full flex flex-row items-center justify-center absolute bottom-0 pb-9 bg-white'>
                <div className='flex flex-row items-center justify-between bg-white p-2 px-6 w-80 rounded-xl text-lg gap-5'>
                    <AiFillHome onClick={() => history.push(REDIRECT_PATH.twitter)} className=' cursor-pointer'/>
                    <FaFeatherAlt className='cursor-pointer hover:text-[#2ba7f3]'/>
                    <FaUserAlt onClick={() => history.push(`${REDIRECT_PATH.twitter}${REDIRECT_PATH.twitterprfile}`)} className='text-[#2ba7f3] cursor-pointer hover:text-[#2ba7f3]'/>
                </div>
            </div>
        </div>
    )
}

export default TwitterProfile