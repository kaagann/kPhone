import React from 'react'
import { IModalInputData } from "../utils/interfaces"


function ModalInput({
    inputs,
    onClick,
    onClose
}: {
    inputs: IModalInputData[],
    onClick: (values: any) => void,
    onClose: () => void
}) {
    const sendValues = () => {
        let values: any = {}

        inputs.map((x) => {
            let elem = document.getElementById(x.id) as HTMLInputElement
            values[x.id] = elem.value
        })

        onClick(values)
    }

    return (
        <div className='absolute w-full h-full flex items-center z-50 flex-col justify-center bg-black/70 top-0 p-2'>
            <div className='bg-white rounded-md mx-4'>
                <div className='flex flex-col justify-center p-4'>
                    {
                        inputs.map((data) =>
                            <div className='w-full p-0.5'>
                                <p className='text-left text-sm font-medium ml-0.5'>{data.name}:</p>
                                <input className='bg-[#f2f2f6] outline-none rounded-md p-1 pl-2' id={data.id} />
                            </div>
                        )
                    }
                </div>
                <div className='grid grid-cols-2 justify-center border-t border-gray-200 px-2 mt-1'>
                    <div onClick={onClose} className='text-center text-blue-400 text-sm font-medium border-r border-gray-200 p-1 py-2 cursor-pointer'> Reddet </div>
                    <div onClick={sendValues} className='text-center text-blue-400 text-sm font-medium p-1 py-2 cursor-pointer'> Kabul Et </div>
                </div>
            </div>
        </div>
    )
}

export default ModalInput