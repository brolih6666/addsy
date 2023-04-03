import React, { useState } from 'react'
import logo from '../../src/assets/logo.png'

import { Link } from 'react-router-dom'
export default function SignUp() {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
  const [repeatPassword, setRepeatPassword] = useState()
	return (
		<div
			className=' flex bg-violet-950 h-full flex-col justify-center w-full items-center
     text-left space-y-2 relative'>
			<img src={logo} className='w-1/2 absolute top-20' alt='' />
			<div className='flex flex-col space-y-4 p-4'>
				<h1 className='font-semibold text-2xl '>Create new account</h1>
				<div className='flex flex-col space-y-4 py-4'>
					<div className='relative group '>
						<p className={`auth-input-text ${email ? '-top-[25%]' : 'top-[25%]'}`}>Email</p>
						<input onChange={e => setEmail(e.target.value)} className='auth-input h-14' type='email¬' />
					</div>
					<div className='relative group '>
						<p className={`auth-input-text ${password ? '-top-[25%]' : 'top-[25%]'}`}>Password</p>
						<input onChange={e => setPassword(e.target.value)} className='auth-input h-14' type='password' />
					</div>
          <div className='relative group '>
						<p className={`auth-input-text ${repeatPassword ? '-top-[25%]' : 'top-[25%]'}`}>Repeat password</p>
						<input onChange={e => setRepeatPassword(e.target.value)} className='auth-input h-14' type='password' />
					</div>
				</div>
				<p>Sign up with Google Account</p>
			</div>
		</div>
	)
}
