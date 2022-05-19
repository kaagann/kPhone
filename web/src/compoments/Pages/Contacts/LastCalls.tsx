import React, { useState } from 'react';
import { AiOutlinePhone, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';
import { BiMessageDetail } from 'react-icons/bi';
import { fetchNui } from '../../../utils/fetchNui';
import { ICallData, IContacts, NotificationInterface } from '../../../utils/interfaces';
import ContactsNavbar from './ContactsNavbar';
import { useHistory } from "react-router-dom";
import { getRandomNumber, REDIRECT_PATH } from '../../../utils/constants';


function LastCalls({
  lastCalls,
  contacts,
  setContacts,
  notif,
  setNotifs
} : {
  lastCalls : ICallData[],
  setContacts: React.Dispatch<React.SetStateAction<IContacts[]>>,
  contacts: IContacts[],
  notif: NotificationInterface[],
  setNotifs: React.Dispatch<React.SetStateAction<NotificationInterface[]>>,
}) {
  const history = useHistory()
  const [modal, setModal] = useState<boolean>(false);
  const [number, setNumber] = useState<string>("");


  const findContact = (number: string) => {
    let x = contacts.find(x => x.phoneNumber == parseInt(number))
    return x ? x.name : number
  }
  const pushMessages = (number: string, ) => history.push(`${REDIRECT_PATH.messages}${REDIRECT_PATH.messageDetails}?number=${number}`)
  const displayModal = () => setModal(!modal);

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

  const saveContact = () => {
    fetchNui("saveContacts", contacts)
  }

  return (
    <div className='w-full h-full bg-gray-100 absolute p-2 pt-8 text-black'>
        <div className="flex w-full justify-between items-center text-xl">
            <p>Son Aramalar</p>
        </div>
        {modal ? <Modal closeEvent={displayModal} addContact={addContact} number={number}/> : ""}
        
        <div className='h-96 overflow-y-auto'>
          {
            lastCalls.map((x) =>
              <div className='bg-white flex flex-row justify-between items-center w-full my-2 p-2 rounded-sm'>
                  <div className={`flex flex-row items-center gap-0.5`}>
                      <AiOutlineUser className={`${x.type == "gelen" ? "text-green-500" : "text-red-500"}`}/>
                      <span>{findContact(x.number)}</span>
                  </div>
                  <div className='flex flex-row items-center gap-0.5'>
                      <AiOutlinePhone onClick={() => fetchNui("callContact", x.number)} className='hover:text-green-500 transition cursor-pointer'/>
                      <BiMessageDetail onClick={() => pushMessages(x.number)} className='hover:text-green-500 transition cursor-pointer'/>
                      <AiOutlineUserAdd onClick={() => history.push(`${REDIRECT_PATH.contacts}${REDIRECT_PATH.newcontact}?number=${x.number}`)} className='hover:text-green-500 transition cursor-pointer'/>
                  </div>
              </div>
            )
          }
        </div>

        <ContactsNavbar/>
      </div>
  )
}

function Modal({
  closeEvent = () => {},
  addContact = () => {},
  number,
}: {
  closeEvent: () => void
  addContact: (name: String, phoneNumber: Number) => void,
  number: any
}) {
  return (
      <div className='w-full h-full bg-black bg-opacity-60 absolute flex items-center top-0 right-0 justify-center'>
          <div className='bg-gray-800 rounded-sm p-0.5 m-2 py-1.5'>
              <p className='text-center'>Yeni Kişi</p>

              <div className='flex flex-row border-b items-center p-0.5 gap-1 m-1'>
                  <AiOutlineUser/>
                  <input type="text" placeholder='İsim' className='boder-none outline-none bg-transparent' id="contact-name"/>
              </div>

              <div className='flex flex-row border-b items-center p-0.5 gap-1 m-1'>
                  <AiOutlinePhone/>
                  <input type="text" placeholder='Numara' className='boder-none outline-none bg-transparent' id="contact-number" value={number} />
              </div>

              <div className='flex flex-row justify-end w-full p-0.5 gap-1'>
                  <div className='cursor-pointer  p-0.5 rounded text-center transition bg-red-600' onClick={closeEvent}>İptal Et</div>
                  <div className='cursor-pointer  text-center transition p-0.5 rounded bg-green-600'
                  onClick={() => {
                      addContact(
                          (document.getElementById("contact-name") as HTMLInputElement).value,
                          parseInt((document.getElementById("contact-number") as HTMLInputElement).value),
                      )
                      closeEvent()
                  }}>Onayla</div>
              </div>
          </div>
      </div>
  )
}

export default LastCalls;
function setNotifs(arg0: any[]) {
  throw new Error('Function not implemented.');
}

