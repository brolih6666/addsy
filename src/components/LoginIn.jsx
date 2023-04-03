import React, { useState } from 'react'
import logo from '../../src/assets/logo.png'

import { Link } from 'react-router-dom'
export default function LoginIn() {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	return (
		<div
			className=' flex bg-violet-950 h-full flex-col justify-center w-full items-center
     text-left space-y-2 relative'>
			<img src={logo} className='w-1/2 absolute top-20 max-w-[300px]' alt='' />
			<div className='flex flex-col space-y-4 p-4'>
				<h1 className='font-semibold text-2xl '>Sign in to your account</h1>
				<div className='flex flex-col space-y-4 py-4'>
					<div className='relative group '>
						<p className={`auth-input-text ${email ? '-top-[25%]' : 'top-[25%]'}`}>Email</p>
						<input onChange={e => setEmail(e.target.value)} className='auth-input h-14' type='email¬' />
					</div>
					<div className='relative group '>
						<p className={`auth-input-text ${password ? '-top-[25%]' : 'top-[25%]'}`}>Password</p>
						<input onChange={e => setPassword(e.target.value)} className='auth-input h-14' type='password' />
					</div>
				</div>
				<p>
					Don't have an account yet ?
					<Link className='ml-4 font-semibold  text-cyan-500 hover:text-violet-500' to='/signup'>
						Sign Up
					</Link>
				</p>{' '}
			</div>
		</div>
	)
}
