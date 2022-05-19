import { useHistory } from 'react-router-dom'; 
import { REDIRECT_PATH } from '../../../utils/constants';
import { FiUser } from "react-icons/fi";
import binder from "../../../resources/binder.png"
import { phoneData } from '../../../utils/interfaces';


function TinderRegister({
    phoneData,
    setPhoneData
}: {
    phoneData: phoneData;
    setPhoneData: React.Dispatch<React.SetStateAction<phoneData | undefined>>
}) {
    const history = useHistory();

    const createAccount = () => {
        const username = (document.getElementById("tinder-username") as HTMLInputElement).value
        const job = (document.getElementById("tinder-job") as HTMLInputElement).value
        const bio = (document.getElementById("tinder-hakkimda") as HTMLInputElement).value
        const profilePicture = (document.getElementById("tinder-pp") as HTMLInputElement).value

        if (!username || !job || !bio) return console.log("boş alan bırakamazsın");

        setPhoneData({...phoneData, tinderAccount: {
            username,
            profilePicture,
            phoneNumber: phoneData.phoneNumber,
            bio,
            likedUserCount: 0,
            matchUsers: [],
            showedUsers: []
        }})
        history.push(REDIRECT_PATH.tinder)
    }


    return (
        <div className='w-full h-full bg-gray-100 text-black dark:bg-gray-900 pt-10'>

            <div className='w-full flex items-center justify-center my-2 '>
                <img className='w-48' src={binder}/>
            </div>
        
            <div className='mt-5'>
                <div className='flex flex-row items-center bg-white shadow m-2 p-2 gap-1 rounded'>
                    <FiUser/>
                    <input type="text" id="tinder-username" className='outline-none' placeholder='Kullanıcı Adı'/>
                </div>
                <div className='flex flex-row items-center bg-white shadow m-2 p-2 gap-1 rounded'>
                    <FiUser/>
                    <input type="text" id="tinder-job" className='outline-none' placeholder='Meslek'/>
                </div>
                <div className='flex flex-row items-center bg-white shadow m-2 p-2 gap-1 rounded'>
                    <FiUser/>
                    <input type="text" id="tinder-pp" className='outline-none' placeholder='Profil Fotoğrafı'/>
                </div>
                <div className='flex flex-row items-center bg-white shadow m-2 p-2 gap-1 rounded'>
                    <FiUser/>
                    <input type="text" id="tinder-hakkimda" className='outline-none' placeholder='Hakkımda'/>
                </div>
            </div>

            <div onClick={createAccount} className='flex flex-row items-center bg-pink-600 hover:bg-pink-700 transition cursor-pointer text-white justify-center shadow-xl m-2 p-2 py-4 gap-1 rounded'>
                <p className='text-2xl'>Kayıt Ol</p>
            </div>
        </div>
    )
}

export default TinderRegister