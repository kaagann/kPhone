import React, { useState } from 'react';
import { formatMoney, REDIRECT_PATH } from '../../../utils/constants';
import { IBills, phoneData } from '../../../utils/interfaces';
import { useHistory } from "react-router-dom";
import { fetchNui } from '../../../utils/fetchNui';



interface bills {
    id: number,
    name: string,
    price: number
}

function Bank({
    phoneData,
    bills,
    setBills,
}: {
    phoneData: phoneData,
    bills: IBills[],
    setBills: React.Dispatch<React.SetStateAction<IBills[]>>,
}) {
    const history = useHistory()
    const [page, setPage] = useState(1)

    let totalBills = 0
    const calculateTotalBills = () => {
        bills.map((x) => totalBills += x.amount)
    }
    calculateTotalBills()

    return (
        <div className='w-full h-full bg-[#1b1a21] absolute py-2 px-2 pt-9 text-white'>
            <p className='font-extralight text-lg'>Merhaba, <b className='font-bold text-xl'>{phoneData.firstname}</b></p>

            <div className='w-full grid grid-cols-2 gap-2 my-3 px-2'>
                <div className='bg-gradient-to-tl to-[#7a633d] from-[#7e623d] p-2 rounded-lg'>
                    <p className='text-center'>Toplam Varlık</p>
                    <p className='text-center font-bold'>{formatMoney(phoneData.bank)}</p>
                </div>
                <div className='bg-gradient-to-tl to-[#7a633d] from-[#7e623d] p-2 rounded-lg'>
                    <p className='text-center'>Ödemeler</p>
                    <p className='text-center font-bold'>{formatMoney(totalBills)}</p>
                </div>
            </div>

            <div className='w-full flex flex-row items-center justify-between p-1 px-4 gap-1 text-white'>
                <div className={`cursor-pointer font-semibold ${page == 1 ? "" : "opacity-40"}`} onClick={() => setPage(1) }>
                    Cüzdan
                </div>
                <div className={`cursor-pointer font-semibold ${page == 2 ? "" : "opacity-40"}`} onClick={() => setPage(2) } >Ödeme</div>
                <div className={`cursor-pointer font-semibold ${page == 3 ? "" : "opacity-40"}`} onClick={() => setPage(3) }>Transfer</div>
            </div>


            {page == 1 ?  <Cuzdan phoneData={phoneData}/> : ""}
            {page == 2 ?  <Odeme bills={bills} setBills={setBills}/> : ""}
            {page == 3 ?  <Transfer/> : ""}

        </div>
    );
}


function Cuzdan({
    phoneData
} : {
    phoneData: phoneData
}) {



    return (
        <div className='my-3 p-2 relative'>
            <div className='border border-1 shadow-lg shadow-[#a69074]/50 border-[#a69074] bg-[#383b46] p-2 h-36 rounded-lg'>
                <div className='flex items-center justify-between font-semibold'>
                    <p>Bireysel</p>
                    <p>{formatMoney(phoneData.bank)}</p>
                </div>
                <div className='absolute w-[15rem] flex justify-end bottom-0 pb-3 font-medium text-sm'>
                    <p className='text-right uppercase'>IBAN: {phoneData.iban}</p>
                </div>
            </div>
        </div>
    )
}

function Odeme({
    bills,
    setBills
}: {
    bills: IBills[],
    setBills: React.Dispatch<React.SetStateAction<IBills[]>>
}) {

    
    const payAllBill = () => {
        fetchNui("payallbils")
    }

    const payBill = () => {
        fetchNui("paybill", bills[bills.length - 1].billId)

        bills.splice(1, bills.length - 1)
        setBills(bills)
    }

    return (
        <div>
            <div className='my-3 p-2 relative'>
                <div className='border border-1 shadow-lg shadow-[#a69074]/50 border-[#a69074] bg-[#383b46] p-2 h-36 rounded-lg'>
                    <div className='flex items-center justify-between font-semibold'>
                        <p>{bills[bills.length - 1].society}</p>
                        <p>{formatMoney(bills[bills.length - 1].amount)}</p>
                    </div>
                    <div className='absolute  w-[15rem] flex justify-end bottom-0 pb-4 text-sm'>
                        <div onClick={payBill} className='text-right cursor-pointer font-medium p-0.5 px-3 rounded-md bg-black/30 text-white'>Öde</div>
                    </div>
                </div>
            </div>
            <div onClick={payAllBill} className='w-full absolute bottom-0 mb-10 p-3 cursor-pointer text-center bg-[#33313d]'>
                <p className='font-semibold'>Tümünü Öde</p>
            </div>
        </div>
    )
}

function Transfer() {

    const transferMoney = () => { 
        fetchNui("transferMoney", {
            amount: (document.getElementById('amount') as HTMLInputElement).value,   
            account : (document.getElementById('account') as HTMLInputElement).value,
        })
    };

    return (
        <div>
            <div className='my-3 p-2 relative'>
                <input id="account" placeholder='IBAN' className='bg-[#343340] my-1.5 rounded-md w-full outline-none p-1 pl-2' />
                <input id="amount" placeholder='Miktar' className='bg-[#343340] my-1.5 rounded-md w-full outline-none p-1 pl-2' />
            </div>
            <div className='w-full absolute bottom-0 mb-10 p-3 cursor-pointer text-center bg-[#33313d]'>
                <p onClick={transferMoney} className='font-semibold'>Transfer Et</p>
            </div>
        </div>
    )
}


export default Bank;


