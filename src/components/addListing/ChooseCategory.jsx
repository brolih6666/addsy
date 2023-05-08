import React, { useState } from 'react'
import back from '../../assets/arrow_back.svg'
import { useNavigate } from 'react-router-dom'
import { uuidv4 } from '@firebase/util'
import useFirestore from '../../hooks/useFirestore'
import ChooseSubcategory from './ChooseSubcategory'
export default function ChooseCategory({ category, setCategory, setShowCategories, subCategory, setSubcategory }) {
	const [showSubcategory, setShowSubcategory] = useState(false)
	const { collectionDocuments: categories } = useFirestore('categories')
	console.log(categories)

	return (
		<>
			{categories && (
				<div className='absolute top-0 left-0 w-full text-black bg-slate-100 h-full px-6 py-4  overflow-hidden'>
					<div className='flex w-full justify-between md:max-w-[1300px]'>
						<img onClick={() => setShowCategories(false)} src={back} className='w-7' alt='' />

						<p onClick={() => setShowCategories(false)} className='font-semibold'>
							Cancel
						</p>
					</div>
					<h2 className='text-3xl mt-4 mb-2 font-semibold text-left pt-4'>Choose category</h2>

					<div className='w-full h-full space-y-4 flex justify-start items-center flex-col pt-8 overflow-scroll'>
						{categories.map(category => {
							return (
								!showSubcategory && (
									<div
										onClick={() => {
											setShowSubcategory(true)
											setCategory(category)
											console.log('div')
										}}
										key={category?.categoryName}
										className='bg-teal-800 text-yellow-50 w-full  py-4 rounded-lg flex flex-row items-center'>
										<img src={category.img} className='bg-yellow-50 w-12 mx-4 p-2 rounded-full' alt='' />
										<p className='text-xl font-bold r'>{category?.categoryName}</p>
									</div>
								)
							)
						})}
						{showSubcategory && category && (
							<ChooseSubcategory
								setShowCategories={setShowCategories}
								category={category}
								setSubcategory={setSubcategory}
								setShowSubcategory={setShowSubcategory}
								showSubcategory={showSubcategory}
								subCategory={subCategory}
							/>
						)}
					</div>
				</div>
			)}
		</>
	)
}
