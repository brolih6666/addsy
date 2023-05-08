import React from 'react'
import { UserAuth } from '../context/AuthContext'
import ValidateAccount from './ValidateAccount'
import { useNavigate } from 'react-router-dom'
import defaultAvatar from '../assets/defaultAvatar.png'
export default function Account({ activeUser }) {
	const { user, logout } = UserAuth()
	const navigate = useNavigate()
	const handleLogout = async () => {
		try {
			await logout()
			navigate('/')
		} catch (e) {
			console.log(e.message)
		}
	}

	return (
		<>
			{!user && <ValidateAccount />}
			{user && activeUser && (
				<div className='w-full p-4  relative'>
					<div className='absolute -top-[105px] -right-[90px]  bg-teal-400 rounded-full w-[220px] h-[220px] flex justify-center items-center z-10'>
						<div className='bg-white rounded-full h-16 w-16'></div>
						<p className='text-xs text-teal-950   z-40 absolute  font-semibold translate-y-2 '>EDIT</p>
					</div>
					<div className=''>
						<img
							src={activeUser?.avatarUrl ? activeUser?.avatarUrl : defaultAvatar}
							className='rounded-full w-[60px]'
							alt=''
						/>
						<div className='flex flex-col justify-start items-start my-4'>
							{' '}
							<h2 className='font-bold text-teal-950 text-3xl overflow-hidden whitespace-nowrap break-keep z-30'>
								Hello, {user && user.email}
							</h2>
							<p className='text-xs text-gray-500 text-left'>ID: {user && user.uid}</p>
						</div>
					</div>
					<button className='w-full bg-teal-800 text-white font-semibold text-2xl rounded-sm py-2'>Add listing</button>
					<div></div>
					<button onClick={handleLogout} className='font-bold text-slate-950 border-b-2 py-2 border-slate-950'>
						Log out
					</button>
				</div>
			)}
		</>
	)
}
