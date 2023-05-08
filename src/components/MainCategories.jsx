import React, { useEffect } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import useFirestore from '../hooks/useFirestore'
export default function MainCategories() {
	const { collectionDocuments: categories } = useFirestore('categories')

	return (
		<div className='bg-white  flex w-screen md:w-full ml-auto md:mx-auto overflow-x-scroll  md:overflow-x-hidden flex-nowrap py-6 px-2 '>
			<Link
				to={`/category/all`}
				key='Everything'
				className='flex flex-col justify-center items-center  min-w-[100px]   '>
				<div className='rounded-full flex items-center justify-center bg-teal-400 h-[85px] w-[85px]'>
					<img className='h-1/2 w-1/2 rounded-full flex' src={logo} alt='' />
				</div>
				<p className='text-md break-keep text-black font-semibold pt-4'>Everything</p>
			</Link>
			{categories?.map(category => {
				return (
					<Link
						to={`/category/${category.categoryName.toLowerCase()}`}
						state={{ category: category.categoryName}}
						key={category.categoryName}
						className='flex flex-col justify-center items-center  min-w-[100px]    '>
						<div className='rounded-full flex items-center justify-center bg-teal-400 h-[85px] w-[85px]'>
							<img className='h-1/2 flex' src={category.img} alt='' />
						</div>
						<p className='text-md break-keep text-black font-semibold pt-4'>{category.categoryName}</p>
					</Link>
				)
			})}
		</div>
	)
}
