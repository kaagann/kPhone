import React from 'react';
import { AiFillClockCircle, AiFillStar } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { RiKeyboardFill } from 'react-icons/ri';
import {useHistory} from "react-router-dom"
import { REDIRECT_PATH } from '../../../utils/constants';

function ContactsNavbar() {
    const history = useHistory()
    return (
        <div className='grid grid-cols-4 w-full right-0 absolute bottom-0 mb-8 p-2 gap-1 ' >
            
            <div onClick={() => history.push(`${REDIRECT_PATH.contacts}${REDIRECT_PATH.lastcalls}`)} className='bg-white shadow-sm hover:text-blue-500 p-1 flex flex-col items-center bg-opacity-50 hover:bg-opacity-100 transition-all cursor-pointer'>
                <AiFillStar className='text-2xl'/>
                <p className='text-xs '>Önerilen</p>
            </div>

            <div onClick={() => history.push(`${REDIRECT_PATH.contacts}${REDIRECT_PATH.lastcalls}`)} className='bg-white shadow-sm  hover:text-blue-500 p-1 flex flex-col items-center bg-opacity-50 hover:bg-opacity-100 transition-all cursor-pointer'>
                <AiFillClockCircle className='text-2xl'/>
                <p className='text-xs '>Aramalar</p>
            </div>

            <div onClick={() => history.push(REDIRECT_PATH.contacts)} className='p-1 flex flex-col items-center bg-white shadow-sm hover:text-blue-500 bg-opacity-50 hover:bg-opacity-100 transition-all cursor-pointer'>
                <FaUserFriends className='text-2xl'/>
                <p className='text-xs'>Rehber</p>
            </div>

            <div onClick={() => history.push(`${REDIRECT_PATH.contacts}${REDIRECT_PATH.contactKeyboard}`)} className='bg-white shadow-sm hover:text-blue-500 p-1 flex flex-col items-center bg-opacity-50 hover:bg-opacity-100 transition-all cursor-pointer'>
                <RiKeyboardFill className='text-2xl'/>
                <p className='text-xs'>Tuşlar</p>
            </div>
            
        </div>
    )
}

export default ContactsNavbar;
