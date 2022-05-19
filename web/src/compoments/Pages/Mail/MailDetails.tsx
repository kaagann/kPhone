import React from 'react';
import { IMailData } from '../../../utils/interfaces';
import { useHistory, useLocation } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import { REDIRECT_PATH } from '../../../utils/constants';


function MailDetails({
    mails
}: {
    mails: IMailData[]
}) {
  const history = useHistory();
  const query =  new URLSearchParams(useLocation().search);

  const findMail = () => {
    let index = query.get("index")
    if (index == null) return
    return mails[parseInt(index)]
  }

  const mail = findMail()

  return (
    <div className='w-full h-full bg-[#f4f8fb] absolute px-2 pt-8 text-black overflow-y-auto'>

        <div className="flex w-full justify-between items-center text-xl ">
          <BsArrowLeftShort onClick={() => { history.push(REDIRECT_PATH.mail) }}/>
          <p>{mail?.title}</p>
        </div>

        {/* <div className='mt-14'> */}
          <div className='border-b-2 border-gray-400 p-1 my-2'>
              <p className='text-sm'><b>Gönderen:</b> {mail?.sender}@kmail.com</p>
          </div>

          <div>
            {mail?.img ? <img className='w-full rounded-lg' src={mail?.img} alt='mail'/> : ""}
            <p className='p-1'>{mail?.message}</p>
          </div>
        {/* </div> */}

      </div>
  )
}

export default MailDetails;
