import React from 'react'
import logo from "../../../resources/weazef.png"
import {useHistory} from "react-router-dom";
import { REDIRECT_PATH } from '../../../utils/constants';
import { INews } from '../../../utils/interfaces';
import { AiFillPlusCircle } from 'react-icons/ai';

function News({
    news
}: {
    news: INews[]
}) {
    const history = useHistory();

    return (
        <div className='w-full h-full bg-slate-600 bg-cover absolute pt-8 text-black p-1'>
            <div className='flex justify-between items-center text-white w-full px-1'>
                <p className='font-semibold'>Haberler</p>
                <AiFillPlusCircle className='cursor-pointer'/>
            </div>

            {news.map((data, index) => 
                <div className='flex flex-col items-center p-1'>
                    <div onClick={() => history.push(`${REDIRECT_PATH.news}${REDIRECT_PATH.newsDetails}?id=${index}`)} className='bg-white p-1 rounded shadow gap-1 w-[14rem] cursor-pointer'>
                        <p className='font-semibold text-center'>{data.title}</p>
                        <img src={data.img} className='w-[13.5rem] h-[7.25rem] rounded'/>
                        <p className='max-2-row'>
                            {data.description}
                        </p>
                    </div>
                </div>    
            )}
  


        </div>
    )
}

export default News