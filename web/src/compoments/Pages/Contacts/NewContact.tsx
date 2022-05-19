import React, { useState } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { REDIRECT_PATH } from '../../../utils/constants'
import { useHistory, useLocation } from 'react-router-dom'
import user from "../../../resources/default.png"
import UserGallery from '../../UserGallery'
import { IContacts, phoneData } from '../../../utils/interfaces'

function NewContact({
    phoneData,
    contacts,
    setContacts,
}: {
    phoneData: phoneData
    contacts: IContacts[],
    setContacts: React.Dispatch<React.SetStateAction<IContacts[]>>,
}) {
    const history = useHistory()
    const query =  new URLSearchParams(useLocation().search);
    const phoneNumber  = query.get("number");
    const [picture, setPicture] = useState<string | null>(null)
    const [gallery, setGallery] = useState(false)
    const [val, setVal] = useState(phoneNumber??"")

    const handleVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVal(e.target.value)
    }

    const selectPicture = (url: string) => {
        setPicture(url)
        setGallery(!gallery)
    }

    const saveContact = () => {
        let name = (document.getElementById("contacts-name") as HTMLInputElement).value
        let number = (document.getElementById("contacts-number") as HTMLInputElement).value

        if (name == "" || number == "") return console.log("bütün alanları doldurun");

        let newContact: IContacts = {
            name: name,
            phoneNumber: parseInt(number),
            profilePicture: picture ? picture : null
        }
        setContacts([...contacts, newContact])
        history.push(REDIRECT_PATH.contacts)
    }


    return (
        <div className='w-full h-full bg-gray-100 text-black pt-8'>
            <div className='flex flex-row items-center justify-between w-full p-1 px-2'>
                <BsArrowLeftShort className='text-lg font-extrabold' onClick={() => { history.push(REDIRECT_PATH.contacts) }}/>
                <p onClick={saveContact} className='hover:text-blue-500 cursor-pointer'>Kaydet</p>
            </div>
            
            {gallery ? <UserGallery phoneData={phoneData} onSelect={selectPicture} onClose={() => setGallery(!gallery)}/> : "" }
            <div className='w-full '>
                <img onClick={() => setGallery(!gallery)} className='w-28 h-28 cursor-pointer rounded-full mx-auto shadow' src={picture??user}></img>
            </div>

            <div className='my-5 w-full gap-1'>
                <input id="contacts-name" placeholder='İsim' className='w-full p-1 pl-2 z-1 outline-none' />
                <input value={val} onChange={handleVal} id="contacts-number" placeholder='Telefon Numarası' className='w-full p-1 pl-2 z-1 outline-none border-t border-t-gray-100 ' />
            </div>

        </div>
    )
}

export default NewContact