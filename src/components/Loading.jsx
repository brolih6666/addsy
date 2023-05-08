import React, { useRef } from 'react'
import loadingIcon from '../assets/loading.svg'

export default function Loading() {
	return (
		<div className='bg-slate-100  fixed z-[65] w-full h-[80%] flex justify-center items-center'>
			<img src={loadingIcon} className=' w-1/2 ' alt='' />
		</div>
	)
}
