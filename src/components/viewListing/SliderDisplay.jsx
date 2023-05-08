import React, { useState } from 'react'
import back from '../../assets/arrow_back_white.svg'
import PinchAndZoom from 'react-pinch-and-zoom'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import '../../App.css'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper'

export default function SliderDisplay({ setDisplaySlider, listingImgs }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null)
	const [swiper, setSwiper] = useState(1)

	return (
		<div className='fixed bg-teal-900 w-full h-full  top-0 z-[76]'>
			<div className='p-4'>
				<img src={back} onClick={() => setDisplaySlider(false)} className='w-9 h-7' alt='' />
			</div>
			<div className='flex flex-col h-full justify-center  items-center'>
				<div className=' w-full '>
					<Swiper
						onSlideChange={swiper => setSwiper(String(swiper?.activeIndex + 1))}
						style={{
							'--swiper-navigation-color': '#fff',
							'--swiper-pagination-color': '#fff',
						}}
						spaceBetween={10}
						navigation={true}
						thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
						modules={[FreeMode, Navigation, Thumbs]}>
						{listingImgs &&
							listingImgs?.map(img => (
								<SwiperSlide className='flex justify-center'>
									<PinchAndZoom>
										<img className='w-full h-[400px] object-contain object-center mx-auto' src={img} />
									</PinchAndZoom>
								</SwiperSlide>
							))}
					</Swiper>
				</div>

				<div>
					<p className='text-slate-400 my-10 text-sm flex '>{`	${swiper} /   ${listingImgs?.length}`}</p>
				</div>
			</div>
		</div>
	)
}
