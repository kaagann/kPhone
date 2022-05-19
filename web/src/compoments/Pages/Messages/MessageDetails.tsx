import React, { useEffect, useState } from 'react';
import { AiFillCamera, AiFillPhone } from 'react-icons/ai';
import { BsArrowLeftShort, BsCheck, BsEmojiSmile, BsFillCameraVideoFill, BsFillEmojiSmileFill, BsFillMicFill } from 'react-icons/bs';
import { IContacts, IMessages, IMessagesData, phoneData } from '../../../utils/interfaces';
import { useHistory, useLocation } from 'react-router-dom';
import { REDIRECT_PATH } from '../../../utils/constants';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { fetchNui } from '../../../utils/fetchNui';
import { ImAttachment } from 'react-icons/im';
import moment from 'moment';
import UserGallery from '../../UserGallery';
import BigImage from '../../BigImage';
// import Picker from 'emoji-picker-react';
import user from "../../../resources/default.png"


function MessageDetails({
    messages, 
    setMessages,
    contacts, 
    setContacts,
    phoneData,
    setFooterColor
}: {
    messages: IMessages[],
    setMessages: React.Dispatch<React.SetStateAction<IMessages[]>>,
    contacts: IContacts[],
    setContacts: React.Dispatch<React.SetStateAction<IContacts[]>>,
    phoneData: phoneData,
    setFooterColor: React.Dispatch<React.SetStateAction<string>>
}) {
    const history = useHistory();
    console.log(messages)
    const query =  new URLSearchParams(useLocation().search);
    const phoneNumber  = query.get("number");
    const [photoUrl, setPhotoUrl] = useState<string | null>(null)
    const [galleryDisplay, setGalleryDisplay] = useState<boolean>(false)
    const [bigImage, setBigImage] = useState<string | null>()
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event: any, emojiObject: any) => {
        setChosenEmoji(emojiObject);
    };

    setFooterColor("bg-[#006a61]")
    const getName = () => {
        if (phoneNumber == null) return
        let number = parseInt(phoneNumber)
        let x = contacts.find(x => x.phoneNumber == number)
        return x ? x.name : phoneNumber
    }

    const getMessages = () => {
        if (phoneNumber == null) return
        let number = parseInt(phoneNumber)
        let y = messages.find(x => x.contactNumber == number)
        return y
    }


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            let element = (document.getElementById("messagesend") as HTMLInputElement)
            updateMessages( element.value )
            element.value = ""
        }
    }

    const updateMessages = (value: any, type?: string) => {
        if (phoneNumber == null || phoneNumber == undefined) return
        console.log(type)

        let index = messages.findIndex(x => x.contactNumber == parseInt(phoneNumber))
        let indexnil = false 

        if (index === -1) {
            indexnil = true
            messages.push({
                contactNumber: parseInt(phoneNumber),
                messages: []
            })
            index = messages.length - 1
        }

        let messageData: IMessagesData = {
            receiver: parseInt(phoneNumber),
            message: type == null || type == undefined ? value : "",
            date: new Date(),
            isRead: false,
            img: photoUrl,
            audio: type ? value : null,  
        }
        
        let g = messages[index]

        g.messages.push(messageData)
        setMessages([...messages.slice(0, index), g, ...messages.slice(index+1)])


        fetchNui("sendMessage", {messages, messageData});
    }

    const setPhoto = (url: string) => {
        setPhotoUrl(url)
        setGalleryDisplay(!galleryDisplay)
    }

    const closePhoto = () => {
        setBigImage(null)
    }

    const handleVoiceRecord = () => {
        let device = navigator.mediaDevices.getUserMedia({ audio: true });
        let items: Blob[] = []


        device.then(stream => {
            let recorder = new MediaRecorder(stream);
            recorder.ondataavailable = async (e) => { 
                items.push(e.data);
                if (recorder.state == "inactive") {
                    let blob = new Blob(items, { type: "audio/ogg; codecs=opus" });

                    let audio = document.getElementById("audio") as HTMLAudioElement;
                    let mainaudio = document.createElement("audio")

                    mainaudio.setAttribute("controls", "controls")
                    audio.appendChild(mainaudio);

                    var reader = new FileReader();

                    reader.addEventListener("load", () => {
                        console.log("reader loaded", reader.result)
                        updateMessages(reader.result, "audio");
                    }, false);

                    
                    reader.readAsDataURL(blob);
                    
                
                }
            }

            recorder.start(100);
            setTimeout(() => {
                recorder.stop();
            }, 2000)
        })
        // process.stdin.resume();
    }


    return (
        <div className='w-full h-full bg-wp bg-cover absolute pt-8 text-white'>
            <div className='w-full flex flex-row justify-between items-center px-2 p-1 bg-[#007969]'>
                <div className='flex flex-row items-center gap-1'>
                    <BsArrowLeftShort className='text-lg font-extrabold' onClick={() => { history.push(REDIRECT_PATH.messages) }}/>
                    <img className='w-8 h-8 rounded-full' src={phoneData.profilePicture != undefined && phoneData.profilePicture != null ? phoneData.profilePicture :  user}/>
                    <div>
                        <p className='font-bold leading-[14px]'>{getName()}</p>
                        <p className='text-xs'>Çevrimiçi</p>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <BsFillCameraVideoFill className='hover:text-green-500 transition-all cursor-pointer'/>
                    <AiFillPhone className='hover:text-green-500 transition-all cursor-pointer' onClick={() => fetchNui("callContact", phoneNumber)}/>
                </div>
            </div>

            {galleryDisplay ? <UserGallery onSelect={setPhoto} onClose={() => setGalleryDisplay(!galleryDisplay)} phoneData={phoneData}/> : ""}
            {bigImage ? <BigImage url={bigImage} onClose={closePhoto}/> : ""}

            {/* <div className='w-1/3'>
                <Picker onEmojiClick={onEmojiClick} />
            </div> */}

            <div className='max-h-[28.6rem] overflow-y-auto overflow-x-hidden' id="audio">
                {getMessages()?.messages.map(m => 
                    <div className={`m-1 w-full text-black  max-w-full px-2 flex ${m.receiver == phoneData.phoneNumber ? 'justify-start' : "justify-end"}`}>
                        <div className={`${m.receiver == phoneData.phoneNumber ? 'bg-white ' : "bg-[#e2ffc7]"} p-1 shadow rounded text-right`}>
                            {m.img ? <img onClick={() => setBigImage(m.img)} className='w-full h-48 cursor-pointer rounded-sm' src={m.img}/> : ""}
                            <p className='text-left'>{m.message}</p>
                            {
                                m.audio ? 
                                    <audio className='max-w-[12rem]' controls>
                                        <source src={m.audio} type="audio/ogg"/>
                                    </audio>
                                : ""
                            }
  
                            <p className='text-xs text-gray-500  text-right flex items-center'>
                                <BsCheck/>
                                {moment(m.date).format("HH:mm")}
                            </p>
                        </div>
                    </div> 
                )}
            </div>

            <div className='absolute bottom-0 right-0 left-0 p-1'>
                
                    {photoUrl ? 
                    <div className='border-b p-1'>
                        <img className='w-10 h-12 rounded' src={photoUrl} /> 
                    </div>
                    : ""}
                <div className='flex w-full justify-between items-center'>


                    <div className='w-11/12 flex flex-row items-center justify-between mb-7 bg-white rounded-full p-1  px-1.5  text-black'>
                    
                        <div className='flex flex-row items-center gap-1'>
                            <BsEmojiSmile className='text-gray-500 text-sm'/>
                            <input className='bg-transparent outline-none w-full' id="messagesend" placeholder='Mesaj Gönder...' onKeyDown={handleKeyDown}/>
                        </div>
                    
                        <div className='flex items-center gap-1'>
                            <ImAttachment  />
                            <AiFillCamera onClick={() => setGalleryDisplay(!galleryDisplay)}/>
                        </div>
                    </div>

                    <div onClick={handleVoiceRecord} className='bg-[#00796a] w-8 h-8 mb-7 mx-1 rounded-full flex items-center justify-center'>
                        <BsFillMicFill/>
                    </div>

                </div>
                
            </div>
        </div>
    );
}

export default MessageDetails;
