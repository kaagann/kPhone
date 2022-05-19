import React, { useState } from 'react'
import { AiFillPhone } from 'react-icons/ai'
import { IoMdBackspace } from 'react-icons/io'
import ContactsNavbar from './ContactsNavbar'

function PhoneKeyboard() {
    const keys = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "*",
    ]
    const [val, setVal] = useState("")
    const removeVal = () => {
        if (val.length === 0) return
        setVal(val.substring(0, val.length - 1))
    }

    return (
        <div className='w-full h-full pt-8 bg-gray-100'>
            <div className='flex justify-center'>
                <input placeholder='5576722' disabled value={val} className='text-center font-bold mt-10 mx-auto bg-transparent outline-none'/>

            </div>
            <div className='flex absolute w-full justify-center mt-14'>
                <div className='grid grid-cols-3 gap-2'>
                    {keys.map((key, index) => 
                        <div onClick={() => setVal(val + key)} className='bg-white hover:text-gray-600 cursor-pointer flex items-center justify-center shadow rounded-full text-center h-14 w-14'>
                            {key}
                        </div> 
                    )}
                    <div className='bg-white hover:text-green-500 cursor-pointer flex items-center justify-center shadow rounded-full text-center h-14 w-14'>
                        <AiFillPhone/>
                    </div>
                    <div onClick={removeVal} className='bg-white hover:text-red-500 cursor-pointer flex items-center justify-center shadow rounded-full text-center h-14 w-14'>
                        <IoMdBackspace/>
                    </div>

                    
                </div>

            </div>

            <ContactsNavbar/>
        </div>
    )
}

export default PhoneKeyboard