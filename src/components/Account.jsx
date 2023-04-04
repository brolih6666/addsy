import React from 'react'
import { UserAuth } from '../context/AuthContext'
export default function Account() {
	const { user } = UserAuth()
	console.log(user)
	return (
		<>
			<div className='z-40'>
				<h1>Account</h1>
				<p>User Email: {user && user.email}</p>
				<p>User ID: {user && user.uid}</p>
			</div>
			<div className='Login-bg h-screen absolute z-0 w-screen top-0'></div>
		</>
	)
}
