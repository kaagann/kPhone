import React, { useState } from 'react'
import { INews } from '../../../utils/interfaces'
import { useHistory, useLocation } from 'react-router-dom';
import BigImage from '../../BigImage';
import { BsArrowLeftShort } from 'react-icons/bs';
import { REDIRECT_PATH } from '../../../utils/constants';


function NewsDetails({
    news
}: {
    news: INews[]
}) {
    const query =  new URLSearchParams(useLocation().search);
    const id = query.get("id")
    const currentNew = news[id ? parseInt(id) : 0];
    const history = useHistory();

    const [bigImage, setBigImage] = useState<boolean>(false)

    return (
        <div className='w-full h-full bg-news absolute pt-8 text-black'>
            {bigImage ? <BigImage url={currentNew.img} onClose={() => setBigImage(!bigImage)} /> : ""}
            <div className='flex flex-row items-center' onClick={() => { history.push(REDIRECT_PATH.news) }}>
                <BsArrowLeftShort className='text-lg font-extrabold'/>
                <p>Geri</p>
            </div>
            <div className='flex max-h-[30rem] overflow-y-auto flex-col bg-gray-100 text-black rounded justify-start items-start p-2 m-2 border-2 border-white'>
                <p className='text-center font-bold text-xl '>{currentNew.title}</p>
                <img onClick={() => setBigImage(!bigImage)} className='rounded p-1 border w-full h-40' src={currentNew.img}/>
                <p>{currentNew.description}</p>
            </div>
        </div>
    )
}

export default NewsDetails