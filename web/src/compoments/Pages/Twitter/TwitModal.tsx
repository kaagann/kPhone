import moment from 'moment'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BiMessageRounded } from 'react-icons/bi'
import { BsCheckCircleFill } from 'react-icons/bs'
import { ITwit, phoneData } from '../../../utils/interfaces'


function TwitModal({
    twit,
    twits,
    setTwits,
    index,
    reply,
    phoneData
}: {
    twit: ITwit,
    twits: ITwit[],
    setTwits: React.Dispatch<React.SetStateAction<ITwit[]>>,
    index: number,
    reply?: (index: number) => void;
    phoneData: phoneData
}) {

    const likeTwit = () => {
        if (twit.likes.includes(phoneData.citizenid)) return console.log("sen zaten beğendin gülüm")
        let newTwit = twit

        twit.likes.push(phoneData.citizenid);
        setTwits([...twits.slice(0, index), newTwit, ...twits.slice(index+1)])
    }


    return (
            <div className='bg-white  rounded-lg p-2 shadow m-1 min-w-[14rem]'>
                <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center gap-1'>
                        <p className='font-semibold text-base'>{twit.username}</p>
                        <BsCheckCircleFill className='text-[#2ba7f3] text-xs '/>
                    </div>
                    <p className='text-xs font-extralight'>{moment(twit.date).format("hh:mm")}</p>
                </div>

                {twit.img ? <img className='w-full h-28 rounded-lg shadow' src={twit.img} /> : ""}
                <div className='flex flex-wrap'>{twit.mentionedTwitIndex ? <p className='text-blue-500'>@{twit.mentionedTwitIndex} </p> : " "} {twit.twit}</div>

                <div className='flex flex-row items-center my-2 gap-4'>
                    <div className='flex flex-row items-center'>
                        {twit.likes.includes(phoneData.citizenid) ? <AiFillHeart className='text-red-500 cursor-pointer' /> : <AiOutlineHeart className='hover:text-red-500 cursor-pointer ' onClick={likeTwit}/>}
                        
                        {twit.likes.length}
                    </div>
                    <BiMessageRounded onClick={() => reply ? reply(index) : null} className='hover:text-[#2ba7f3] cursor-pointer'/>
                </div>
            </div>
    )
}

export default TwitModal
