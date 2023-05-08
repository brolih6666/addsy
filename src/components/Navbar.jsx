import React, { useState, useEffect, useRef } from 'react'
import logo from '../../src/assets/logo.png'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import addPost from '../assets/addPostIcon.svg'

import favourite from '../assets/favouriteIcon.svg'
import mail from '../assets/mailIcon.svg'
import account from '../assets/accountIcon.svg'
import home from '../assets/homeIcon.svg'
import favouriteBar from '../assets/favouriteIconBar.svg'
import mailBar from '../assets/mailIconBar.svg'
import accountBar from '../assets/accountIconBar.svg'
import useScrollDirection from '../hooks/useScrollDirection'
export default function Navbar() {
	const { user, logout } = UserAuth()
	const navigate = useNavigate()

	const mobileBar = useRef()

	const scrollDirection = useScrollDirection()

	return (
		<>
			<div className='z-40 hidden  md:flex items-center h-[70px] justify-center bg-teal-950 w-full   '>
				<div className='flex-row md:flex items-center justify-between container h-full md:max-w-[1250px]'>
					{' '}
					<img src={logo} className=' md:max-h-[40px]' alt='' />
					{user && (
						<div className='space-x-4  text-white flex flex-row justify-center items-center h-full'>
							<Link to='/chat' className='flex flex-col items-center justify-center px-3 hover:bg-teal-500 h-full'>
								<img src={mail} alt='' className='w-6' />
								<p className=' '>Messages</p>
							</Link>
							<Link
								to='/favourites'
								className='flex flex-col items-center justify-center px-3 hover:bg-teal-500 h-full'>
								<img src={favourite} alt='' className='w-6' />
								<p className=' '>Favourites</p>
							</Link>
							<Link to='/account' className='flex flex-col items-center justify-center px-3 hover:bg-teal-500 h-full'>
								<img src={account} alt='' className='w-6' />
								<p className=' '>Your account</p>
							</Link>
							<Link to='/addListing' className=' pl-4 font-semibold '>
								<button className='bg-white text-teal-950 px-6 py-3 hover:text-white transition-all hover:bg-teal-700 rounded'>
									Add listing
								</button>
							</Link>
						</div>
					)}
					{/* {user && (
						<div className='space-x-4  text-emerald-100 font-semibold text-xl xl:flex justify-center items-center'>
							<Link onClick={handleLogout} className='hover:text-emerald-300 ' to='/'>
								Log out
							</Link>
						</div>
					)} */}
				</div>
			</div>
			<div
				onScroll={e => console.log(e.target)}
				ref={mobileBar}
				className={`${
					scrollDirection === 'down' ? 'translate-y-[100%]' : 'translate-y-[0%]'
				}  text-black bg-slate-50 duration-500 text-xs  flex md:hidden z-[66] fixed transition-all bottom-0 w-full h-[50px] flex-row first:border-t-2 first:border-black `}>
				<Link to='/' className='grow flex flex-col justify-center items-center space-y-1'>
					<img className='w-6' src={home} alt='' />
					<p>Search</p>
				</Link>
				<Link to='/favourites' className='grow flex flex-col justify-center items-center space-y-1'>
					<img className='w-6' src={favouriteBar} alt='' />
					<p>Favourites</p>
				</Link>
				<Link to='/addListing' className='grow flex flex-col justify-center items-center space-y-1'>
					<img className='w-6' src={addPost} alt='' />
					<p>Add</p>
				</Link>
				<Link className='grow flex flex-col justify-center items-center space-y-1'>
					<img className='w-6' src={mailBar} alt='' />
					<p>Messages</p>
				</Link>
				<Link to='/account' className='grow flex flex-col justify-center items-center space-y-1'>
					<img className='w-6' src={accountBar} alt='' />
					<p>Account</p>
				</Link>
			</div>
		</>
	)
}
