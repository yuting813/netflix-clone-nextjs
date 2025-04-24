import { InformationCircleIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { modalState, movieState } from '@/atoms/modalAtom';
import { baseUrl } from '@/constants/movie';
import { Movie } from '@/typings';

interface Props {
	netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
	const [movie, setMovie] = useState<Movie | null>(null);
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
	const [isLoading, setIsLoading] = useState(true);
	const [imageError, setImageError] = useState(false);

	useEffect(() => {
		setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
	}, [netflixOriginals]);

	const imagePath = movie?.poster_path || movie?.backdrop_path;

	return movie == null ? null : (
		<div className='flex flex-col space-y-5 md:space-y-4 h-[65vh] lg:h-[75vh] justify-end lg:pb-12 lg:pl-16 pl-7'>
			<div className='absolute top-0 left-0 -z-10 h-[100vh] w-[99.4vw]'>
				<Image
					src={imageError || !imagePath ? '/fallback-image.webp' : `${baseUrl}${imagePath}`}
					alt={movie?.title || movie?.name || 'Movie banner'}
					className={`object-cover transition-opacity duration-300 ${
						isLoading ? 'opacity-0' : 'opacity-100'
					}`}
					fill={true}
					sizes='100vw'
					priority={true}
					onError={() => setImageError(true)}
					onLoadingComplete={() => setIsLoading(false)}
				/>
			</div>
			<div className=' '>
				<h1 className='max-w-[40vw] text-[clamp(1.8rem,7vw,4rem)] '>
					{movie?.title || movie?.name || movie?.original_name}
				</h1>
				<p className='line-clamp-2 max-w-[40vw] lg:max-w-[20vw]  text-xs text-shadow-md mt-3 md:mt-4 lg:mt-5 md:max-w-lg md:text-lg lg:text-xl '>
					{movie?.overview}
				</p>
				<div className='flex space-x-3 mt-3 md:mt-4 lg:mt-5 '>
					<button className='bannerButton bg-white text-black '>
						<FaPlay className='h-4 w-4 text-black md:h-7 md:w-7' />
						Play{' '}
					</button>
					<button
						className='bannerButton bg-[gray]/70'
						onClick={() => {
							setCurrentMovie(movie);
							setShowModal(true);
						}}
					>
						<InformationCircleIcon className='h-5 w-5 md:h-8 md:w-8' />
						More Info
					</button>
				</div>
			</div>
		</div>
	);
}

export default Banner;
