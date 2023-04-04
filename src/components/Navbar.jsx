import React from 'react'
import logo from '../../src/assets/logo.png'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
export default function Navbar() {
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
		<div className='flex flex-row items-center justify-between pt-8 px-10 z-40 '>
			<img src={logo} className='max-w-[150px]' alt='' />
			{!user && (
				<div className='space-x-4 text-emerald-100 font-semibold text-xl'>
					<Link className='hover:text-emerald-300 ' to='/'>
						Log in
					</Link>
					<Link className='hover:text-emerald-300 ' to='/signup'>
						Sign up
					</Link>
				</div>
			)}
			{user && (
				<div className='space-x-4 text-emerald-100 font-semibold text-xl flex justify-center items-center'>
					<p className='text-xs'>{user?.email}</p>
					<Link onClick={handleLogout} className='hover:text-emerald-300 ' to='/'>
						Log out
					</Link>
				</div>
			)}
		</div>
	)
}
