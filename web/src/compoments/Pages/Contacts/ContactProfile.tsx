import React from 'react'
import { BsArrowLeftShort, BsFillCameraVideoFill } from 'react-icons/bs'
import { useHistory, useLocation } from 'react-router-dom'
import { REDIRECT_PATH } from '../../../utils/constants'
import { IContacts } from '../../../utils/interfaces';
import user from "../../../resources/default.png"
import { AiFillPhone, AiOutlineWhatsApp } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';
import { fetchNui } from '../../../utils/fetchNui';


function ContactProfile({
    contacts,
    setContacts
}: {
    contacts: IContacts[],
    setContacts: React.Dispatch<React.SetStateAction<IContacts[]>>
}) {
    const query =  new URLSearchParams(useLocation().search);
    const phoneNumber  = query.get("number");

    const getUserData = () => {
        let number = parseInt(phoneNumber??"0")
        let x = contacts.find(x => x.phoneNumber == number)
        return x
    }

    const findUserIndex = () => {
        let number = parseInt(phoneNumber??"0")
        let x = contacts.findIndex(x => x.phoneNumber == number)

        return x
    }

    //make delete contact 
    const deleteContact = () => {
        let index = findUserIndex()
        let newContacts = contacts

        newContacts.splice(index, 1)
        setContacts(newContacts)
        
        fetchNui("saveContacts", newContacts)
        history.push(REDIRECT_PATH.contacts)
    }


    const history = useHistory()
    return (
        <div className='w-full h-full pt-8 bg-gray-100'>
            <div className='flex flex-row items-center justify-start w-full p-1'>
                <BsArrowLeftShort className='text-lg font-extrabold' onClick={() => { history.push(REDIRECT_PATH.contacts) }}/>
            </div>

            <div className='w-full '>
                <img className='w-28 h-28 rounded-full mx-auto shadow' src={getUserData()?.profilePicture??user}></img>
                <p className='text-center'>{getUserData()?.name}</p>
            </div>

            <div className='grid grid-cols-4 gap-1 w-full px-2 my-2'>
                <div onClick={() => {fetchNui("callContact", getUserData()?.phoneNumber)}} className='bg-white cursor-pointer flex flex-col items-center p-1 rounded text-blue-500 hover:text-blue-600'>
                    <AiFillPhone/>
                    <p>Ara</p>
                </div>
                <div className='bg-white cursor-pointer flex flex-col items-center p-1 rounded text-blue-500 hover:text-blue-600'>
                    <BsFillCameraVideoFill/>
                    <p>Video</p>
                </div>
                <div onClick={() => history.push(`${REDIRECT_PATH.messages}${REDIRECT_PATH.messageDetails}?number=${phoneNumber}`)} className='bg-white cursor-pointer flex flex-col items-center p-1 rounded text-blue-500 hover:text-blue-600'>
                    <AiOutlineWhatsApp/>
                    <p>Mesaj</p>
                </div>
                <div onClick={deleteContact} className='bg-white cursor-pointer flex flex-col items-center p-1 rounded text-blue-500 hover:text-blue-600'>
                    <IoMdTrash/>
                    <p>Sil</p>
                </div>
            </div>

            <div className='my-5 w-full gap-1'>
                <div className='w-full pl-1 bg-white'>
                    <p className='text-xs text-semibold'>Telefon Numarası:</p>
                    <p>{getUserData()?.phoneNumber}</p>
                </div>
            </div>

        </div>
    )
}

export default ContactProfile