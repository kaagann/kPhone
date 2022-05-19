import React from 'react'
import { IoIosClose } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

function BigImage({
    url,
    onClose,
    index,
    onDelete,
    canDelete
} : {
    url: string;
    onClose: () => void;
    index?: number;
    onDelete?: (index: number) => void;
    canDelete?: boolean;
}) {
  return (
    <div className='absolute w-full h-full flex items-center z-50 flex-col justify-center bg-black/70 top-0 p-2'>
        <IoIosClose onClick={onClose} className='text-white text-4xl cursor-pointer'/>
        <img className='rounded-md border p-1' src={url}/>
        {canDelete && onDelete ? <MdDelete onClick={() => onDelete(index??-1)} className='text-white text-4xl cursor-pointer'/> : ""}
    </div>
  )
}

export default BigImage