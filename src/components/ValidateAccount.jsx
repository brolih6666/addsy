import React, { useState } from 'react'
import back from '../assets/arrow_back.svg'
import { useNavigate } from 'react-router-dom'
import LoginIn from './LoginIn'
import SignUp from './SignUp'
const ValidateAccount = () => {
	const navigate = useNavigate()
	const [login, setLogin] = useState(true)
	const [signing, setSigning] = useState(false)
	return (
		<div className=' text-black flex-col w-full flex text-left md:w-[1300px] '>
			<div className='flex flex-col p-4'>
				<img
					onClick={() => {
						navigate('/')
					}}
					src={back}
					className='w-9 h-7 pl-2 cursor-pointer  '
					alt=''
				/>
				<h2 className='text-4xl my-8 mb-2  font-semibold'>Welcome to Addsy!</h2>
			</div>
			<div className='w-full '>
				<button
					onClick={() => {
						setLogin(true)
						setSigning(false)
						console.log('s')
					}}
					className={`w-1/2 border-b-2  py-4 ${login ? 'border-black font-bold' : 'border-gray-400'}`}>
					Log in
				</button>
				<button
					onClick={() => {
						setLogin(false)
						setSigning(true)
						console.log('a')
					}}
					className={`w-1/2 border-b-2  py-4 ${signing ? 'border-black font-bold' : 'border-gray-400'}`}>
					Create account
				</button>
			</div>
			<div className='text-yellow-50'>
				{login && <LoginIn />}
				{signing && <SignUp />}
			</div>
		</div>
	)
}

export default ValidateAccount
