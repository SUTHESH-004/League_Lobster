import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from 'react-router-dom';

const Weblayout = () => {
	return (
		<>
			<div className='h-screen w-screen overflow-x-hidden bg-black'>
				<div className=''>
					<Navbar />
				</div>

				<div className='h-full w-full flex justify-center items-center flex-wrap'>
					<Outlet />
				</div>
			</div>
		</>
	)
}

export default Weblayout;