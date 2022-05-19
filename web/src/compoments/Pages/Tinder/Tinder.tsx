import React, { useState } from 'react'
import { AiFillHeart, AiOutlineClose, AiTwotoneStar } from 'react-icons/ai'
import binder from "../../../resources/binder.png"
import dayi from "../../../resources/maxresdefault.jpg"
import { FaPeopleArrows, FaUserAlt, FaUserFriends } from 'react-icons/fa'
import { MdContacts } from 'react-icons/md'
import {useHistory} from "react-router-dom"
import { REDIRECT_PATH } from '../../../utils/constants'
import { matchedUsers, phoneData } from '../../../utils/interfaces'

function Tinder({
    phoneData,
    setPhoneData
}: {
    phoneData: phoneData,
    setPhoneData: React.Dispatch<React.SetStateAction<phoneData | undefined>>
}) {
    const history = useHistory()
    if (!phoneData.tinderAccount) history.push(`${REDIRECT_PATH.tinder}${REDIRECT_PATH.tinderRegister}`);


    const [tinderUsers, setTinderUsers] = useState<matchedUsers[]>([
        {
            bio: "Salvatore Galeri Sahibi",
            phoneNumber: 21,
            profilePicture: "https://media.discordapp.net/attachments/936398395306803250/942426321701732412/unknown.png",
            username: "Vito Salvatore"
        },
        {
            bio: "Salvatore Galeri Sahibi",
            phoneNumber: 21,
            profilePicture: "https://media.discordapp.net/attachments/936398395306803250/942426321701732412/unknown.png",
            username: "Kagan Fullstek"
        },
        {
            bio: "Salvatore Galeri Sahibi",
            phoneNumber: 21,
            profilePicture: "https://media.discordapp.net/attachments/936398395306803250/942426321701732412/unknown.png",
            username: "Kocadede"
        },
    ])
    
    let random = 0 
    let showedUser: matchedUsers | null = null
    let showedUserCount = 0

    const getRandomUser = () : matchedUsers | null => {

        random = Math.floor(Math.random() * tinderUsers.length);
        var user: matchedUsers | null = tinderUsers[random]
        let tinderAccountShowedUserCount = phoneData.tinderAccount?.showedUsers.length

        console.log(showedUserCount + (tinderAccountShowedUserCount??0), tinderUsers.length)
        if ( 1 + (tinderAccountShowedUserCount??0) >= tinderUsers.length) {
            console.log("null döndürcem")
            return null
        }

        const isShowed = phoneData.tinderAccount?.showedUsers.find(x => x == user?.phoneNumber)
        if (isShowed) {
            return getRandomUser()
        } else {
            showedUser = user
            return user
        }


        // return user ? user : null
    }


    
    getRandomUser()

    

    const refuseUser = () => {
        showedUserCount++
        let newTinderAccount = phoneData.tinderAccount
        newTinderAccount?.showedUsers.push(tinderUsers[random].phoneNumber)
        setPhoneData({...phoneData, tinderAccount: newTinderAccount})
        getRandomUser()
    }

    const likeUser = () => {
        showedUserCount++
        let newTinderAccount = phoneData.tinderAccount
        newTinderAccount?.matchUsers.push(tinderUsers[random])
        newTinderAccount?.showedUsers.push(tinderUsers[random].phoneNumber)
        setPhoneData({...phoneData, tinderAccount: newTinderAccount})
        getRandomUser()
    }



    return (
        <div className='w-full h-full bg-gray-100 text-black dark:bg-gray-900 pt-10'>
            <div className='w-full flex items-center justify-center my-2 '>
                <img className='w-24' src={binder}/>
            </div>

            {
                <UserModal data={showedUser}/>
            }

            <div className='flex flex-row items-center gap-2 p-2  justify-center w-full'>
                <div className='bg-white shadow-sm cursor-pointer rounded-full w-14 h-14 flex items-center justify-center text-2xl'>
                    <AiFillHeart className='text-green-500' />
                </div>
                <div className='bg-white shadow-sm cursor-pointer rounded-full w-14 h-14 flex items-center justify-center text-2xl'>
                    <AiOutlineClose className='text-red-500'/>
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


function UserModal({
    data
}: {
    data: matchedUsers | null
}) {
    console.log(data)
    return (
        <div>
            {data?.phoneNumber != null ?
                <div className='w-full bg-white p-1 px-2'>
                    <img className='rounded h-56 w-full' src={data?.profilePicture}/>
                    <p className='text-xl font-bold '>{data?.username}</p>
                    <p className='text-slate-500 text-sm'>{data?.bio}</p>
                </div>
            :
            <div className='w-full bg-white p-1 px-2'>
                <img className='rounded h-56 w-full' src={dayi}/>
                <p className='text-xl font-bold '>Herkesi gezdin öküz</p>
                <p className='text-slate-500 text-sm'>senden hızlısı mezarda biladerim</p>
            </div>
            }
        </div>

    )
}

export default Tinder