import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import useFirestore from '../hooks/useFirestore'
import google from '../assets/googleLogo.png'

export default function LoginIn(setActiveUser) {
	const {} = useFirestore('users')
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()

	const [error, setError] = useState()
	const { signIn, googleSignIn } = UserAuth()
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()

		// Email auth req
		if (!email.includes('@')) {
			setError('Wrong email address')
			return
		}

		try {
			await signIn(email, password)
		} catch (e) {
			setError(e.message)
		}

		navigate('/')
	}

	return (
		<div
			className=' flex flex-col justify-center    w-full  items-center
     text-left d '>
			<div className='flex flex-col justify-center items-center w-full  p-4  rounded-lg  md:w-[500px] max-h-[420px]  '>
				<div className='flex flex-col justify-end items-center  md:px-12 w-full    md:h-3/5 '>
					<form className='w-full ' onSubmit={handleSubmit}>
						{' '}
						<div className='relative group flex flex-col justify-start items-start w-full my-4 '>
							<p className={`auth-input-text `}>Email</p>
							<input
								onChange={e => setEmail(e.target.value)}
								required
								className='auth-input h-12 w-full '
								type='email'
								value={email}
							/>
						</div>
						<div className='relative group flex flex-col justify-center items-start w-full my-4'>
							<p className={`auth-input-text  `}>Password</p>
							<input
								onChange={e => setPassword(e.target.value)}
								required
								className='auth-input h-12 w-full '
								type='password'
								value={password}
							/>
						</div>
						<div className='flex w-full justify-center   my-4 pt-3'>
							<button className='hover:bg-gray-200 w-full bg-teal-950 text-white   py-3 rounded text-lg font-bold transition-all'>
								Log in
							</button>
						</div>
					</form>
				</div>
				<div
					onClick={googleSignIn}
					className='bg-red-600 cursor-pointer font-semibold text-lg w-full flex justify-center items-center py-3 rounded text-white'>
					<img src={google} className='w-7 mr-4' alt='' />
					<p>Sign in with Google</p>
				</div>

				<div className=' text-black  flex flex-col items-center justify-between  pb-2 '>
					<p className='pt-4 text-slate-950 font-bold text-xl'>{error}</p>
					<p>
						Don't have an account?
						<Link
							className='ml-4 font-bold 
						'
							to='/signup'>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
