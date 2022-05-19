import React from 'react'
import { FaPeopleArrows, FaUserAlt } from 'react-icons/fa'
import { MdContacts } from 'react-icons/md'
import { REDIRECT_PATH } from '../../../utils/constants'
import {useHistory} from "react-router-dom"
import { phoneData } from '../../../utils/interfaces'
import { AiFillPlusCircle, AiOutlineWhatsApp } from 'react-icons/ai'
import { HiUserRemove } from 'react-icons/hi'
import { IoMdRemoveCircle } from 'react-icons/io'

function TinderProfile({
    phoneData
}: {
    phoneData: phoneData
}) {
    const history = useHistory()

    if (!phoneData.tinderAccount) history.push(`${REDIRECT_PATH.tinder}${REDIRECT_PATH.tinderRegister}`)

    return (
        <div className='w-full h-full bg-gray-100 text-black dark:bg-gray-900 pt-10'>
            <div className='p-2'>
                <p>Profil</p>

                <div className='flex flex-row items-center m-2 gap-1 bg-white shadow p-2 rounded-md'>
                    <img className='w-12 h-12 rounded-full' src={phoneData.tinderAccount?.profilePicture}/>
                    <div >
                        <p className='leading-[15px] font-semibold'>{phoneData.tinderAccount?.username}</p>
                        <p className='text-xs text-gray-400'>{phoneData.tinderAccount?.bio}</p>
                    </div>
                </div>

                <div className='flex flex-row items-center m-2 gap-2'>
                    <div className='bg-purple-500 shadow-xl text-white rounded p-2 px-2 h-14  w-1/2'>
                        <p className='text-xs'>Beğendiklerin</p>
                        <p className='font-medium text-xl'>{phoneData.tinderAccount?.likedUserCount}</p>
                    </div>
                    <div className='bg-pink-500 shadow-xl  text-white rounded p-2 px-2 h-14 w-1/2'>
                        <p className='text-xs'>Eşleştiklerim</p>
                        <p className='font-medium text-xl'>{phoneData.tinderAccount?.matchUsers.length}</p>
                    </div>
                </div>

                <div className='mt-7'>
                <div className='bg-white shadow rounded m-2 p-4 flex flex-row items-center gap-1'>
                        <AiOutlineWhatsApp className='text-2xl'/>
                        <div>
                            <p className='leading-[15px]'>Whatsapp Numaran</p>
                            <p className='text-xs text-gray-500'>{phoneData.phoneNumber}</p>
                        </div>
                    </div> 

                    <div className='bg-white shadow rounded m-2 p-4 flex flex-row items-center gap-1 cursor-pointer'>
                        <IoMdRemoveCircle className='text-2xl'/>
                        <div>
                            <p className='leading-[15px]'>Hesabını Kapat</p>
                            <p className='text-xs text-gray-500'>Hesabınızı siler</p>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className='w-full flex flex-row items-center justify-center absolute bottom-0 mb-9'>
                <div className='flex flex-row items-center justify-between bg-white shadow-lg p-3 w-40  rounded-full text-lg gap-5'>
                    <MdContacts onClick={() => history.push(REDIRECT_PATH.tinder)} className='text-[#ff6a6a] cursor-pointer'/>
                    <FaPeopleArrows onClick={() => history.push(`${REDIRECT_PATH.tinder}${REDIRECT_PATH.tinderMatch}`)} className='text-[#ff6a6a] cursor-pointer'/>
                    <FaUserAlt onClick={() => history.push(`${REDIRECT_PATH.tinder}${REDIRECT_PATH.tinderProfile}`)} className='text-[#ff5757] cursor-pointer'/>
                </div>
            </div>

        </div>
    )
}

export default TinderProfile