import React from 'react'

function Modal({
    message,
    onClick,
    onClose,
}: {
    message: string;
    onClick: () => void;
    onClose: () => void;
}) {
  return (
    <div className='absolute w-full h-full flex items-center z-50 flex-col justify-center bg-black/70 top-0 p-2'>
        <div className='bg-white rounded-md mx-4'>
            <div className='flex flex-col justify-center p-5'>
                <p className='text-center text-gray-600 text-sm'>{message}</p>
            </div>
            <div className='grid grid-cols-2 justify-center border-t border-gray-200 px-2 mt-1'>
                <div onClick={onClose} className='text-center text-blue-400 text-sm font-medium border-r border-gray-200 p-2 cursor-pointer'> Reddet </div>
                <div onClick={onClick} className='text-center text-blue-400 text-sm font-medium p-2 cursor-pointer'> Kabul Et </div>
            </div>
        </div>
    </div>
  )
}

export default Modal