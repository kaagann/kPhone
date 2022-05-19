import React, { useState } from 'react'
import { AiFillCode, AiOutlineSearch, AiOutlineTool, AiOutlineUser } from 'react-icons/ai'
import { BsBoxSeam } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { FiDollarSign, FiLogIn, FiUsers } from 'react-icons/fi'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import logo from "../../../resources/workstation.png"
import user from "../../../resources/workstationuser.png"
import { phoneData } from '../../../utils/interfaces'
import ModalInput from '../../ModalInput'

function WorkStation({
    phoneData
}: {
    phoneData: phoneData
}) {
    const [jobs, setJobs] = useState([
        {
            icon: <AiOutlineTool/>,
            name: "Mechanic",
            companys: [
                {
                    name: "Sparrow",
                    users: []
                }
            ],
            gain: 5,
        },
        {
            icon: <BsBoxSeam/>,
            name: "Kargocu",
            companys: [
                {
                    name: "Sparrow",
                    users: [],
                    owner: "31"
                },
                {
                    name: "sad",
                    users: [],
                    owner: "62"
                }
            ],
            gain: 3,
        }
    ])
    const [selectedJob, setJob] = useState<null |number >(null)
    const [modal, setModal] = useState(false)

    const handleClick = (index: number) => {
        

        const element = document.getElementsByClassName(`jobs-${index.toString()}`) as HTMLCollectionOf<HTMLElement>;
        console.log(index, element)

        
        let lastElement = element[0].lastElementChild as HTMLElement;

        if (lastElement.style.display === "none") {
            lastElement.style.display = "block";
        } else {
            lastElement.style.display = "none";
        }
    }

    const inputs = [
        {
            name: "Grup Adı",
            id: "groupName",
        },
    ]

    const createNewGroup = (values: any) => {
        if (selectedJob == null) return;
        let groupName = values["groupName"]
        let g = jobs[selectedJob]
        g.companys.push({
            name: groupName,
            users: [],
            owner: phoneData.citizenid,
        })

        setJobs([...jobs.slice(0, selectedJob), g, ...jobs.slice(selectedJob+1)])
        setModal(!modal)
    }

    return (
        <div className='w-full h-full bg-[#f2f2f6] text-black absolute pt-8 overflow-y-auto overflow-x-hidden'>
            <div className='px-3 mt-2 flex justify-between items-center text-lg'>
                <p className='text-xl'>İş Merkezi</p>
                <AiOutlineSearch/>
            </div>

            {modal ?  <ModalInput inputs={inputs} onClick={createNewGroup} onClose={() => setModal(!modal)} /> : ""}

            <div className='px-3 mt-2'>
                {jobs.map((x, i) =>
                    <div className={`jobs-${i} bg-white my-2 px-2 py-3 rounded-lg shadow-md transition-all`}>
                        <div className={`flex flex-row justify-between items-center`}>

                            <div className='flex items-start gap-1 text-[#b858e3]'>
                                <AiOutlineTool/>
                                <div>
                                    <p className='text-sm font-medium text-black'>{x.name}</p>
                                    <div className='flex flex-row items-center text-xs'>
                                        <FiDollarSign className={`${x.gain >= 1 ? "opacity-100" : "opacity-50"}`}/>
                                        <FiDollarSign className={`${x.gain >= 2 ? "opacity-100" : "opacity-50"}`}/>
                                        <FiDollarSign className={`${x.gain >= 3 ? "opacity-100" : "opacity-50"}`}/>
                                        <FiDollarSign className={`${x.gain >= 4 ? "opacity-100" : "opacity-50"}`}/>
                                        <FiDollarSign className={`${x.gain >= 5 ? "opacity-100" : "opacity-50"}`}/>
                                    </div>
                                </div>
                            </div>


                            <div className='flex flex-row items-center gap-1'>
                                <div className='bg-[#b858e3]/10 text-[#b858e3] rounded-md flex items-center p-1 px-2 text-xs gap-1'>
                                    <span>0</span>
                                    <AiOutlineUser/>
                                </div>
                                <div className='bg-[#b858e3]/10 text-[#b858e3] rounded-md flex items-center p-1 px-2 text-xs gap-1'>
                                    <span>{x.companys.length}</span>
                                    <FiUsers/>
                                </div>
                                <MdOutlineKeyboardArrowDown onClick={() => handleClick(i)} className='text-xs cursor-pointer'/>
                            </div>

                        </div>
                        <div className='mx-3 mt-2 hidden'>

                            <div className='flex items-center justify-center w-full gap-1 px-1'>
                            <div onClick={() => {setJob(i); setModal(!modal)}} className='bg-white shadow-lg p-1 text-xs my-2 rounded-lg cursor-pointer'>Grup Oluştur</div>
                                <div className='bg-white shadow-lg p-1 text-xs my-2 rounded-lg cursor-pointer'>Konumu işaretle</div>
                            </div>

                            {x.companys.map((x) => 
                                <div className='flex w-full items-center justify-between text-xs text-[#b858e3] bg-[#b858e3]/10 p-1 rounded my-1'>
                                    <p>{x.name}</p>
                                    <FiLogIn className='cursor-pointer'/>
                                </div>
                            )}
                        </div>
                    </div>
                )}


            </div>
        </div>
    )
}

export default WorkStation