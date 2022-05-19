import React, { useEffect, useState } from 'react'
import { AiOutlinePhone, AiOutlinePlus, AiOutlineUser } from 'react-icons/ai'
import { BiMessageDetail } from 'react-icons/bi'
import { HiPencil } from 'react-icons/hi'
import { displayNotification, getRandomNumber, keys, REDIRECT_PATH } from '../../../utils/constants'
import { fetchNui } from '../../../utils/fetchNui'
import { ICallData, IContacts, IMessages, NotificationInterface, phoneData } from '../../../utils/interfaces'
import { useHistory } from "react-router-dom";
import ContactsNavbar from './ContactsNavbar'

interface IPhoneKey {
    key: string;
    persons: IContacts[];
}

function Contacts({
    notif,
    setNotifs,
    contacts,
    setContacts,
}: {
    notif: NotificationInterface[],
    setNotifs: React.Dispatch<React.SetStateAction<NotificationInterface[]>>,
    contacts: IContacts[],
    setContacts: React.Dispatch<React.SetStateAction<IContacts[]>>,
}) {
    const history = useHistory()

    const addContact = (name: String, phoneNumber: Number) => {
        if (name == "" || phoneNumber == null) {
            const id = getRandomNumber()
            setNotifs([...notif, {    
                color: "bg-green-500",    
                date: new Date(),   
                display: true,    
                icon: <AiOutlineUser/>,    
                message: "Boş alan bırakamazsınız.",    
                name: "Rehber",
                id
            }])
            return
        }
        contacts.push({name, phoneNumber, profilePicture: null})
        setContacts(contacts)
        saveContact()
    };

    const pushMessages = (number: number, ) => history.push(`${REDIRECT_PATH.messages}${REDIRECT_PATH.messageDetails}?number=${number}`)

    
    const saveContact = () => {
        fetchNui("saveContacts", contacts)
    }

    
    const phoneKeys: IPhoneKey[] = keys.map(key => {
        
        return { key: key, persons : contacts.filter(x => x.name.toLowerCase().startsWith(key.toLocaleLowerCase())) } as IPhoneKey;
    });


    const persons = phoneKeys.map((arda) =>
        <div className='my-1'>
            {
                arda.persons.length ? 
                    <div>
                        <div className="bg-white shadow-sm p-0.5 font-semibold pl-4">{arda.key}</div>
                            {arda.persons.map((a) =>
                                <div className='pl-3'>
                                    <Contact data={a} messageEvent={pushMessages}/>
                                </div>
                            )}
                    </div>
                : ""
            }
        </div>
    )

    return (
        <div className='w-full h-full bg-gray-100 absolute pt-8 text-black'>
            <div className="flex w-full justify-between items-center text-xl px-4">
                <p className='text-2xl font-semibold'>Rehber</p>
                <AiOutlinePlus className='hover:text-green-500 transition cursor-pointer' onClick={() => history.push(`${REDIRECT_PATH.contacts}${REDIRECT_PATH.newcontact}`) }/>
            </div>


            
            
            <div>
                {
                    persons
                }
            </div>
            
            <ContactsNavbar/>
        </div>
    )
}

function Contact({
    data
}: {
    data: IContacts
    messageEvent: (number: number) => void
}) {
    const history = useHistory()

    return (
        <div onClick={() => history.push(`${REDIRECT_PATH.contacts}${REDIRECT_PATH.contactProfile}?number=${data.phoneNumber}`) } className='ml-1 cursor-pointer'>
            <span>{data.name}</span>
        </div>
    )
}


export default Contacts
