import {Menu} from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
const Navbar = () =>{
    const [visible,setVisible]=useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    useEffect(() => {
        if (visible) {
            setShouldRender(true);
        } else {
            const timeoutId = setTimeout(() => {
                setShouldRender(false);
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [visible]);
    return(
        <>
            <div className={`${visible ? 'h-96 max-h-fit': 'h-16'} flex w-[95%] p-2 transition-all rounded-3xl flex-col duration-500 bg-white text-black absolute top-8`}>
                <div className='flex justify-between w-full'>
                    <div onClick={()=>{setVisible(!visible)}}
                        className="ml-5 rounded-full flex-col w-12 items-center h-12 transition-all hover:bg-black hover:text-white justify-center flex">
                        <Menu className='size-10'></Menu>
                    </div>
                    <div className="font-mono text-5xl">
                        League Lobster
                    </div>
                    <div className="">
                        <NavLink to='/sign-in-page'>
                            <button>SignIn</button>
                        </NavLink>
                        <NavLink to='/sign-up-page'>
                            <button>SignUp</button>
                        </NavLink>
                    </div>
                </div>
                <br></br>
                <div className='ml-5 transition-all duration-500 overflow-hidden'>
                    {
                        shouldRender &&(
                            <div
                            className={`transition-all duration-500 ${
                            shouldRender?'min-h-64 opacity-100' : 'h-0 opacity-0'
                            } flex w-full justify-evenly flex-col `}
                            >
                                <div className="w-[30%] px-3 py-1 flex-wrap rounded-3xl hover:text-black hover:bg-white border-4 border-black transition-all text-white text-3xl justify-center items-center flex bg-black">
                                    Leagues
                                </div>
                                <div className="w-[30%] px-3 py-1 flex-wrap rounded-3xl hover:text-black hover:bg-white border-4 border-black transition-all text-white text-3xl justify-center items-center flex bg-black">
                                    Community Events
                                </div>
                                <div className="w-[30%] px-3 py-1 flex-wrap rounded-3xl  hover:text-black hover:bg-white border-4 border-black transition-all text-white text-3xl justify-center items-center flex bg-black">
                                    About Us
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
        )
}
export default Navbar;
