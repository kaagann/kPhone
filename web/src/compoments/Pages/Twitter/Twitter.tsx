import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiFillHome, AiFillTwitterCircle, AiOutlineHeart, AiOutlinePicture, AiOutlineSearch, AiOutlineTwitter, AiTwotoneCheckCircle } from 'react-icons/ai'
import { BiMessageRounded } from 'react-icons/bi'
import { BsArrowReturnLeft, BsCheckCircleFill, BsFillFlagFill, BsFillImageFill, BsFillReplyFill } from 'react-icons/bs'
import { FaFeatherAlt, FaUserAlt } from 'react-icons/fa'
import { fetchNui } from '../../../utils/fetchNui'
import { ITwit, phoneData } from '../../../utils/interfaces'
import { useNuiEvent } from '../../../utils/useNuiEvent'
import {useHistory} from "react-router-dom"
import { REDIRECT_PATH } from '../../../utils/constants'
import TwitModal from './TwitModal'
import UserGallery from '../../UserGallery'
import user from "../../../resources/default.png"




function Twitter({
    phoneData,
    setFooterColor,
    twits,
    setTwits
}: {
    phoneData: phoneData;
    setFooterColor: React.Dispatch<React.SetStateAction<string>>,
    twits: ITwit[],
    setTwits: React.Dispatch<React.SetStateAction<ITwit[]>>
}) {
    const history = useHistory()
    
    setFooterColor("bg-white")


    const [modalDisplay, setModalDisplay] = useState<boolean>(false);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null)

    useEffect(() => console.log(modalDisplay), [modalDisplay])
    const displayModal = () => {
        setModalDisplay(!modalDisplay)
    }

    const newTweet = (twit: String, img: any, mIndex: undefined | string, photo: string | null) => {
        setTwits([...twits, {
            username: `${phoneData.firstname}_${phoneData.lastname}`,
            twit: twit,
            date: new Date,
            img: photo,
            mentionedTwitIndex: mIndex,
            citizenid: phoneData.citizenid,
            likes: [],
        }])
        setPhotoUrl(null)
        displayModal()

        fetchNui("newTweet", {
            username: `${phoneData.firstname}_${phoneData.lastname}`,
            twit: twit,
            date: new Date,
            img: photo,
            mentionedTwitIndex: mIndex,
            citizenid: phoneData.citizenid,
            likes: [],
        })
    }

    useEffect(() => console.log(twits), [twits])
    const [mIndex, setMIndex] = useState<undefined | string>()
    const [galleryDisplay, setGalleryDisplay] = useState<boolean>(false)

    const replyTwit = (index: number) => {
        {/* @ts-ignore */ }
        setMIndex(twits[index].username)
        displayModal()
    }

    const setPhoto = (url: string) => {
        setPhotoUrl(url)
        setGalleryDisplay(!galleryDisplay)
    }



    return (
        <div className='w-full h-full bg-[#f4f8fb] absolute pt-8 text-black'>
            <div className="flex w-full justify-between items-center text-xl p-2 bg-white shadow">
                <AiOutlineTwitter className='text-[#2ba7f3] transition cursor-pointer' />
                <p className='text-base font-semibold'>Twitter</p>
                <img src={phoneData.profilePicture != undefined && phoneData.profilePicture != null ? phoneData.profilePicture :  user} className='w-8 h-8 shadow rounded-full'/>
            </div>
            {modalDisplay ? <Modal photo={photoUrl} galleryDisplay={galleryDisplay} setGalleryDisplay={setGalleryDisplay} closeEvent={displayModal} pushEvent={newTweet} mIndex={mIndex}/> : ""}
            {galleryDisplay ?  <UserGallery onSelect={setPhoto} onClose={() => setGalleryDisplay(!galleryDisplay)} phoneData={phoneData}/> : ""}

            <div className='flex flex-col-reverse items-center p-2 font-roboto'>

            {
                twits.map((twit, index) =>
                    <TwitModal phoneData={phoneData} twit={twit} index={index} reply={replyTwit} setTwits={setTwits} twits={twits}/>
                )
            }

            </div>

            <div className='w-full flex flex-row items-center justify-center absolute bottom-0 pb-9 bg-white'>
                <div className='flex flex-row items-center justify-between bg-white p-2 px-6 w-80 rounded-xl text-lg gap-5'>
                    <AiFillHome onClick={() => history.push(REDIRECT_PATH.twitter)} className='text-[#2ba7f3] cursor-pointer'/>
                    <FaFeatherAlt onClick={displayModal} className=' cursor-pointer hover:text-[#2ba7f3]'/>
                    <FaUserAlt onClick={() => history.push(`${REDIRECT_PATH.twitter}${REDIRECT_PATH.twitterprfile}`)} className=' cursor-pointer hover:text-[#2ba7f3]'/>
                </div>
            </div>

        </div>
    )
}





function Modal({
    closeEvent, 
    pushEvent = () => {},
    mIndex,
    galleryDisplay,
    setGalleryDisplay,
    photo
}: {
    closeEvent: () => void;
    pushEvent?: (twit: String, img: any, mIndex: string | undefined, photo: string | null) => void;
    mIndex?: string;
    galleryDisplay: boolean;
    setGalleryDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    photo: string | null;

}) {
    const sendTweet = () => {
        let element: String = (document.querySelector("#newTweetDesc") as HTMLInputElement).value
        // let img: String = (document.getElementById("tweet-img") as HTMLInputElement).value
        if (element == "" || element == null) return 

        pushEvent(element, null, mIndex, photo)
        closeEvent()
    }

    return (
        <div className='p-2 m-2 border bg-white rounded-lg'>
            <input id="newTweetDesc" className='bg-white rounded-lg border shadow-sm w-full p-2 outline-none' placeholder='Neler yaptığını paylaş'/>
            {photo ? <img className='w-full h-28 m-1  rounded-xl shadow mx-auto' src={photo}/> : "" }
            <div className='flex justify-between items-center w-full p-1'>
                <p onClick={sendTweet} className='bg-[#2ba7f3] p-1 rounded-full text-white text-sm'>Tweetle</p>
                <AiOutlinePicture onClick={() => setGalleryDisplay(!galleryDisplay)} className="text-[#2ba7f3] text-2xl"/>
            </div>
        </div>        
    )
}

type twit = {
    username: String,
    twit: String;
    date: Date;
    img: any
}

function Twit({username, twit, date, img}: twit) {
    return (
        <div className='flex flex-col-reverse gap-2 p-1 '>
            <div className="w-full bg-blue-700 rounded-sm p-1">
                <p className='font-semibold'>@{username}</p>
                <p>{twit}</p>
                <img className='rounded' src={img}/>
                <div className='flex justify-between items-center w-full text-xs m-1'>
                    <div className='flex flex-row gap-x-1'>
                        <BsArrowReturnLeft/>
                        <BsFillFlagFill/>
                    </div>
                    <p className='mx-1'>{moment(date).fromNow()}</p>
                </div>
            </div>   
        </div>
    )
}

export default Twitter
