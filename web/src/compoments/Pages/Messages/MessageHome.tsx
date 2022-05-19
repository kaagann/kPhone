import React, { useState, useEffect } from 'react';
import { AiFillCamera, AiFillPhone, AiOutlineSearch } from 'react-icons/ai';
import { BsArrowLeftShort } from 'react-icons/bs';
import { FaMapMarkerAlt, FaUserCircle } from 'react-icons/fa';
import { fetchNui } from '../../../utils/fetchNui';
import { IContacts, IMessages, IMessagesData, phoneData } from '../../../utils/interfaces';
import { useHistory } from 'react-router-dom';
import { REDIRECT_PATH } from '../../../utils/constants';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import user from "../../../resources/default.png"


function MessageHome({
    contacts, 
    messages,
    phoneData,
    setFooterColor
} : {
    contacts: IContacts[],
    messages: IMessages[],
    phoneData: phoneData,
    setFooterColor: React.Dispatch<React.SetStateAction<string>>
    
}) {
    const history = useHistory()
    setFooterColor("bg-[#005047]")

    const getContactName = (number: number) => {
        const user = contacts.find(x => x.phoneNumber == number)
        return user?.name??number
    }

    const getContactPP = (number: number) => {
        const user = contacts.find(x => x.phoneNumber == number)
        return user?.profilePicture??undefined
    }


    const getLastMessageDeatils = (message: IMessagesData[]) => {
        let lastMessage = message[message.length - 1];
        console.log(lastMessage)
        if (lastMessage.receiver == phoneData.phoneNumber) return `Ben: ${lastMessage.message}`;

        return `${getContactName(lastMessage.receiver)}: ${lastMessage.message}`;
    }

    return (
        <div className='w-full h-full bg-[#d0d0d0] absolute  pt-8 text-black'>
            <div className='flex justify-center flex-col items-center'>
                <MessagesNav/>
                { messages != undefined && messages != [] ? messages.map((m) => 

                        <div className='w-full m-0.5 p-1 px-2  flex flex-row gap-1 items-center shadow-sm rounded-sm transition-all cursor-pointer' onClick={() => history.push(`${REDIRECT_PATH.messages}${REDIRECT_PATH.messageDetails}?number=${m.contactNumber}`)}>
                            <img className='w-9 h-9 rounded-full' src={getContactPP(m.contactNumber)??user} alt='contact'/>
                            <div className='w-full'>
                                <div className="flex flex-row"> 
                                    <p className='leading-[0.9rem] m-0 font-semibold'>{getContactName(m.contactNumber) ? getContactName(m.contactNumber) : m.contactNumber}</p>
                                </div>
                                <p className='leading-0 text-gray-700 m-0 text-xs w-10/12 whitespace-nowrap text-ellipsis overflow-hidden'>{getLastMessageDeatils(m.messages)}</p>
                            </div>
                        </div>
                        
                ) : ""}
            </div>
        </div>
    )
}

function MessagesNav() {
    return (
        <div className='w-full bg-[#006156] p-1 px-2 rouned'>
            <div className='w-full flex flex-row items-center justify-between'>
                <p className='text-gray-300 font-bold'>Whatsapp</p>
                <div className='flex flex-row text-white items-center'>
                    <AiOutlineSearch/>
                    <BiDotsVerticalRounded/>
                </div>
            </div>
            <div className='w-full flex flex-row justify-between items-center'>
                <p className='text-gray-300 text-sm cursor-pointer'>Sohbetler</p>
                <p className='text-gray-300 text-sm cursor-pointer'>Aramalar</p>
                <p className='text-gray-300 text-sm cursor-pointer'>Durumlar</p>
            </div>
        </div>
    )
}


export default MessageHome;
