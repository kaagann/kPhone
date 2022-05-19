import React from 'react'
import { IoIosClose } from 'react-icons/io'
import { phoneData } from '../utils/interfaces'

function UserGallery({
    phoneData,
    onSelect,
    onClose,
    showUrl,
}: {
    phoneData: phoneData,
    onSelect: (url: string) => void;
    onClose: () => void;
    showUrl?: boolean;
}) {
  return (
    <div className='absolute w-full h-full flex items-center flex-col justify-center bg-black/70 top-0 p-4 z-50'>
        <div className='bg-white shadow p-1  rounded w-full relative'>

            <div className='flex justify-between'>
                <p className='font-semibold text-black'>Fotoğraflarım</p>
                <IoIosClose onClick={onClose} className='text-black text-2xl cursor-pointer hover:text-red-500'/>
            </div>
            <div className='flex flex-wrap gap-2 justify-start max-h-[10.5rem] overflow-y-auto'>            
                {
                    phoneData.gallery.map((image, index) => 
                        <img onClick={() => onSelect(image)} className='h-20 w-16 shadow rounded cursor-pointer' src={image}/>
                    )
                }
            </div>
        </div>        
    </div>
  )
}

export default UserGallery