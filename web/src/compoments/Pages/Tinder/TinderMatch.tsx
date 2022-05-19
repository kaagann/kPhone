import React, { useState } from 'react'
import { FaPeopleArrows, FaUserAlt } from 'react-icons/fa'
import { MdContacts } from 'react-icons/md'
import { REDIRECT_PATH } from '../../../utils/constants'
import { useHistory } from 'react-router-dom'    
import { matchedUsers, phoneData } from '../../../utils/interfaces'
function TinderMatch({
    phoneData
}: {
    phoneData: phoneData
}) {
    const history = useHistory()
    if (!phoneData.tinderAccount) history.push(`${REDIRECT_PATH.tinder}${REDIRECT_PATH.tinderRegister}`)

    return (
        <div className='w-full h-full bg-gray-100 text-black dark:bg-gray-900 pt-10'>
            <p className='mx-2 font-semibold text-lg'>Eşleştiğin Kişiler</p>
            <div className='p-2 h-[27rem] overflow-y-auto'>
                {
                    phoneData.tinderAccount?.matchUsers.map((user, index) => 
                        <MatchedUsers data={user}/>
                    )
                }
            </div>

            <div className='w-full flex flex-row items-center justify-center absolute bottom-0 mb-9'>
                <div className='flex flex-row items-center justify-between bg-white shadow-lg p-3 w-40  rounded-full text-lg gap-5'>
                    <MdContacts onClick={() => history.push(REDIRECT_PATH.tinder)} className='text-[#ff6a6a] cursor-pointer'/>
                    <FaPeopleArrows onClick={() => history.push(`${REDIRECT_PATH.tinder}${REDIRECT_PATH.tinderMatch}`)} className='text-[#ff5757] cursor-pointer'/>
                    <FaUserAlt onClick={() => history.push(`${REDIRECT_PATH.tinder}${REDIRECT_PATH.tinderProfile}`)} className='text-[#ff6a6a] cursor-pointer'/>
                </div>
            </div>
        </div>
    )
}

function MatchedUsers({
    data
}: {
    data: matchedUsers
}) {
    return (
        <div className='w-full p-2 rounded bg-white shadow flex items-center gap-2 cursor-pointer my-1'>
            <img className='w-12 h-12 rounded-full' src={data.profilePicture}/>
            <div>
                <p className='leading-3'>{data.username}</p>
                <p className='text-sm text-gray-500'>{data.bio}</p>
            </div>
        </div>
    )
}

export default TinderMatch