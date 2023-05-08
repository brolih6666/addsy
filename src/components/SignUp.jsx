import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { uuidv4 } from '@firebase/util'
import useFirestore from '../hooks/useFirestore'
import defaultAvatar from '../assets/defaultAvatar.png'
export default function SignUp() {
	const { addDocument, activeUser } = useFirestore('users')
	const [email, setEmail] = useState()
	const [displayName, setDisplayName] = useState()
	const [password, setPassword] = useState()
	const [repeatPassword, setRepeatPassword] = useState()
	const [error, setError] = useState()
	const { createUser, signIn, user } = UserAuth()
	const navigate = useNavigate()
	const id = uuidv4()
	const userObj = {
		id,
		email,
		displayName,
		favourites: [],
		listings: [],
		chats: [],
		avatarUrl: defaultAvatar,
		joined: new Date(),
	}

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
		await addDocument(userObj, 'users')
		await signIn(email, password)
		navigate('/')
	}

	return (
		<div
			className=' flex  flex-col justify-center  w-full  items-center
     text-left '>
			<div className='flex flex-col justify-center items-center w-full p-4 rounded-lg  md:w-[500px] md:max-h-[500px]  '>
				<div className='flex flex-col  md:px-12 w-full     '>
					<form className=' w-full  ' onSubmit={handleSubmit}>
						{' '}
						<div className='relative group flex flex-col justify-start items-start w-full my-4 '>
							<p className={`auth-input-text `}>Email</p>
							<input
								onChange={e => setEmail(e.target.value)}
								required
								className='auth-input h-12 w-full'
								type='email¬'
								value={email || ''}
							/>
						</div>
						<div className='relative group flex flex-col justify-start items-start w-full my-4 '>
							<p className={`auth-input-text `}>Display Name</p>
							<input
								onChange={e => setDisplayName(e.target.value)}
								required
								className='auth-input h-12 w-full'
								type='email¬'
								value={displayName || ''}
							/>
						</div>
						<div className='relative group flex flex-col justify-start items-start w-full my-4 '>
							<p className={`auth-input-text  `}>Password</p>
							<input
								onChange={e => setPassword(e.target.value)}
								required
								className='auth-input h-12 w-full'
								type='password'
								value={password || ''}
							/>
						</div>
						<div className='relative group flex flex-col justify-start items-start w-full my-4'>
							<p className={`auth-input-text  `}>Repeat password</p>
							<input
								required
								onChange={e => setRepeatPassword(e.target.value)}
								className='auth-input h-12 w-full'
								type='password'
								value={repeatPassword || ''}
							/>
						</div>
						<div className='flex w-full justify-center   mt-8 '>
							<button className='hover:bg-teal-800 w-full bg-teal-900 text-white px-8 py-3 rounded text-lg font-bold transition-all'>
								Create account
							</button>
						</div>
					</form>
				</div>

				<div className=' flex flex-col items-center justify-end   mt-auto '>
					<p className='pt-4 text-slate-950 font-bold text-xl'>{error}</p>
					<p>
						Already have an account?
						<Link className='ml-4 font-bold  text-emerald-00 hover:text-emerald-300' to='/login'>
							Log in
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
