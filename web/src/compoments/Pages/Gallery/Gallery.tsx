import React, { useState } from 'react'
import { phoneData } from '../../../utils/interfaces'
import BigImage from '../../BigImage'

interface bigImage {
    url: string;
    index: number
}

function Gallery({
    phoneData,
    setPhoneData
}: {
    phoneData: phoneData;
    setPhoneData: React.Dispatch<React.SetStateAction<phoneData | undefined>>
}) {
    const [bigImage, setBigImage] = useState<bigImage >({
        url: "",
        index: -1
    })

    const openPhoto = (url: string, index: number) => {
        setBigImage({
            url,
            index
        })
    }

    const closePhoto = () => {
        setBigImage({
            url: "",
            index: -1
        })
    }

    const deletePhoto = (index: number) => {
        console.log(index)
        const newPhotos = phoneData.gallery
        newPhotos.splice(index, 1)
        setPhoneData({ ...phoneData, gallery: newPhotos })
        setBigImage({
            url: "",
            index: -1
        })
    }

    return (
        <div className='w-full h-full bg-[#f4f8fb] absolute pt-8 text-black'>

            <div className='flex flex-row items-center w-full p-2'>
                <p className='font-semibold'>Galeri</p>
            </div>

            {bigImage.index !== -1 ? <BigImage index={bigImage.index} url={bigImage.url} canDelete={true} onDelete={deletePhoto} onClose={closePhoto}/> : ""}

            <div className='grid grid-cols-2 gap-2  p-2'>
                {phoneData.gallery.map((image, index) =>
                    <img onClick={() => openPhoto(
                        image,
                        index
                    )} className='h-44 w-32 rounded shadow cursor-pointer' src={image}/>
                )}
            </div>

        </div>
    )
}

export default Gallery