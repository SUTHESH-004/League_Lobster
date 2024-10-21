import {Menu} from 'lucide-react'
import { useState } from 'react'
const Navbar = () =>{
    const [visible,setVisible]=useState(false);
    const [isVisible,setVisible1]=useState(visible);
    const handleToggle = () => {
                setVisible1(!visible);
      };
    return(
        <>
            {
                // visible &&(
                //     <>
                //         <div className='w-full h-full bg-white'></div>
                //     </>
                // )
            }
            <div className={`${visible ? 'h-80 ': 'h-16'} flex w-[95%] p-2 rounded-3xl flex-col transition-all duration-500 bg-white text-black absolute top-8`}>
                <div className='flex justify-between w-full'>
                    <div onClick={()=>{handleToggle();setVisible(!visible)}}
                        className="ml-5 rounded-full flex-col w-12 items-center transition-all h-12 hover:bg-black hover:text-white justify-center flex">
                        <Menu className='size-10'></Menu>
                    </div>
                    <div className="font-mono text-5xl">
                        League Lobster
                    </div>
                    <div className="">
                    </div>
                </div>
                <br></br>
                <div className='ml-5'>
                {
                    <div
                    className={`${
                      isVisible ? 'h-full opacity-100' : 'max-h-0 opacity-0'
                    } flex gap-4 w-full flex-col duration-700 overflow-hidden`}
                    >
                        <div className="w-[30%] px-6 py-3 flex-wrap rounded-3xl text-white text-3xl justify-center items-center flex bg-black">
                            Leagues
                        </div>
                        <div className="w-[30%] px-6 py-3 flex-wrap rounded-3xl text-white text-3xl justify-center items-center flex bg-black">
                            Community Events
                        </div>
                        <div className="w-[30%] px-6 py-3 flex-wrap rounded-3xl text-white text-3xl justify-center items-center flex bg-black">
                            About Us
                        </div>
                    </div>
                }
                </div>
            </div>
        </>
        )
}
export default Navbar;
