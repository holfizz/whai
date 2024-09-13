'use client'

import { Player } from '@lottiefiles/react-lottie-player'
import { useState } from 'react'
import animationData from './ExportedDashboard.json'

const Video = () => {
	const [isPlaying, setIsPlaying] = useState(true)

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying)
	}

	return (
		<div className='relative w-screen h-screen flex items-center justify-center flex-col font-semibold gap-5'>
			<h1 className='text-4xl'>
				Как работает <span className='text-decor-2'>Whai</span>
			</h1>
			<Player
				autoplay={isPlaying}
				loop
				src={animationData}
				style={{ width: '80%', height: 'auto' }}
			/>
		</div>
	)
}

export default Video
