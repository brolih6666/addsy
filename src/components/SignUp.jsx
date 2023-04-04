import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
export default function SignUp() {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [repeatPassword, setRepeatPassword] = useState()
	const [error, setError] = useState()
	const { createUser } = UserAuth()
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()

		// Email auth req
		if (!email.includes('@')) {
			setError('Wrong email address')
			return
		}
		//  Passwords check
		if (password != repeatPassword) {
			setError(`Passwords don't match`)
			return
		}

		try {
			await createUser(email, password)
		} catch (e) {
			setError(e.message)
		}

		navigate('/account')
	}

	return (
		<>
			<div
				className=' flex -mt-[50px] flex-col justify-center z-10 w-full h-full items-center
     text-left drop-shadow-2xl '>
				<div className='flex flex-col justify-center items-center  p-4 bg-gradient-to-b from-emerald-400 to-teal-800 backdrop-blur-lg rounded-lg  w-[500px] h-[500px]  '>
					<h1 className='font-semibold text-4xl h-1/5 flex  items-center '>Create new account</h1>
					<div className='flex flex-col  justify-end items-center  px-12 w-full  z-40  h-3/5 '>
						<form className='space-y-4 w-full' onSubmit={handleSubmit}>
							{' '}
							<div className='relative group flex justify-center items-center w-full '>
								<p
									className={`auth-input-text ${
										email ? '-top-[25%] text-white backdrop-blur-md' : 'top-[25%] text-gray-200 '
									}`}>
									Email
								</p>
								<input
									onChange={e => setEmail(e.target.value)}
									required
									className='auth-input h-14 w-full'
									type='email¬'
									value={email}
								/>
							</div>
							<div className='relative group flex justify-center items-center w-full '>
								<p
									className={`auth-input-text  ${
										password ? '-top-[25%] text-white backdrop-blur-md' : 'top-[25%] text-gray-200  '
									}`}>
									Password
								</p>
								<input
									onChange={e => setPassword(e.target.value)}
									required
									className='auth-input h-14 w-full'
									type='password'
									value={password}
								/>
							</div>
							<div className='relative group flex justify-center items-center w-full '>
								<p
									className={`auth-input-text  ${
										repeatPassword ? '-top-[25%] text-white backdrop-blur-md' : 'top-[25%] text-gray-200  '
									}`}>
									Repeat password
								</p>
								<input
									required
									onChange={e => setRepeatPassword(e.target.value)}
									className='auth-input h-14 w-full'
									type='password'
									value={repeatPassword}
								/>
							</div>
							<div className='flex w-full justify-center z-40  '>
								<button className='hover:bg-gray-200 bg-gray-300 text-emerald-600 px-8 py-2 rounded-lg text-lg font-semibold transition-all'>
									Create account
								</button>
							</div>
						</form>
					</div>

					<div className=' h-1/5 flex flex-col items-center justify-between  pb-2 '>
						<p className='pt-4 text-slate-950 font-bold text-xl'>{error}</p>
						<p>
							Already have an account?
							<Link className='ml-4 font-semibold  text-emerald-00 hover:text-emerald-300' to='/'>
								Log in
							</Link>
						</p>
					</div>
				</div>
			</div>
			<div className='Login-bg h-screen absolute z-0 w-screen top-0'></div>
		</>
	)
}
