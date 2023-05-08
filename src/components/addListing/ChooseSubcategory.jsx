import React from 'react'
import back from '../../assets/arrow_back.svg'
import arrow from '../../assets/arrowListType.svg'
export default function ChooseSubcategory({
	category,
	setShowCategories,
	setSubcategory,
	showSubcategory,
	setShowSubcategory,
	subCategory,
}) {
	return (
		<div className='absolute top-0 left-0 w-full text-black bg-slate-100 h-full px-6 py-4  overflow-hidden'>
			<div className='flex w-full -translate-y-[0px]  justify-between md:max-w-[1300px]'>
				<img
					onClick={() => {
						console.log('red')
						setShowSubcategory(false)
					}}
					src={back}
					className='w-7 '
					alt=''
				/>

				<p onClick={() => setShowSubcategory(false)} className='font-semibold'>
					Cancel
				</p>
			</div>
			<h2 className='text-3xl mt-4 mb-2 font-semibold text-left pt-4'>Choose category</h2>

			<div className='w-full h-full  flex justify-start items-center flex-col pt-8 overflow-scroll'>
				<div className='bg-teal-800 text-yellow-50 w-full  py-4 rounded-t-lg flex flex-row items-center'>
					<img src={category.img} className='bg-yellow-50 w-12 mx-4 p-2 rounded-full' alt='' />
					<p className='text-2xl font-bold '>{category?.categoryName}</p>
				</div>
				<ul className='text-yellow-50 w-full space-y-4 rounded-b-lg list-[] font-semibold text-xl text-left px-8  p-6 border-t-2 bg-teal-800'>
					{category.subCollections.map(name => (
						<div
							className='flex flex-row items-center space-x-4'
							onClick={() => {
								setSubcategory(name)
								setShowSubcategory(false)
								setShowCategories(false)
							}}>
							<img src={arrow} className='rotate-180 h-6' alt='' />
							<p className=' py-2'>{name}</p>
						</div>
					))}
				</ul>
			</div>
		</div>
	)
}
