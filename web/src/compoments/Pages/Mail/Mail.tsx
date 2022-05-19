import moment from 'moment';
import React from 'react';
import { IMailData } from '../../../utils/interfaces';
import { useHistory } from 'react-router-dom';
import { REDIRECT_PATH } from '../../../utils/constants';
import {phoneData} from "../../../utils/interfaces"


function Mail({
    mails,
    phoneData
}: {
    mails: IMailData[],
    phoneData: phoneData
}) {
    const history = useHistory();

    return (
        <div className='w-full h-full bg-[#f4f8fb] absolute px-2 pt-8 text-black overflow-y-auto'>

            <div className="flex w-full justify-between items-center text-xl">
                <p>Mail</p>
                <p className='text-xs'>{phoneData.firstname}@kmail.com</p>
            </div>

            <div className='flex flex-col-reverse items-center'>

                {mails.map((x, index) => 
                    <div onClick={() => history.push(`${REDIRECT_PATH.mail}${REDIRECT_PATH.mailDetails}?index=${index}`)}  className='bg-blue-500 p-2 rounded-sm w-full hover:bg-blue-600 transition-all cursor-pointer m-1'>
                        <div className='flex flex-row justify-between items-center w-full'>
                            <p className='font-bold'>{x.title}</p>
                            <p className='text-xs'>{x.sender}</p>
                        </div>
                        <span className='max-2-row text-xs'>
                            {x.message}
                        </span>
                    </div>
                )}


                

            </div>

        </div>
    );
}

export default Mail;
