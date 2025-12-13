import './OurPartners.scss'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface Partner {
	id: number
	logo: string
	name: string
	slug?: string
}

const fetchPartners = async (): Promise<Partner[]> => {
	const response = await fetch(
		'https://back-bonte.anti-flow.com/api/v1/partner/carousel/'
	)
	if (!response.ok) {
		throw new Error('Ошибка при загрузке партнеров')
	}
	return response.json()
}

export default function OurPartners() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

	const {
		data: sliderData = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ['partners'],
		queryFn: fetchPartners,
		staleTime: 10 * 60 * 1000,
	})

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const dataToShow =
		windowWidth > 1400 ? [...sliderData, ...sliderData] : sliderData

	if (isLoading) {
		return <div className='loading'>Загрузка партнеров...</div>
	}

	if (error) {
		return <div className='error'>Ошибка загрузки данных</div>
	}

	return (
		<section className='our-partners'>
			<h2>Наши партнёры</h2>
			<span className='top-border'></span>

			<div className='partners-track'>
				{dataToShow.map(partner => (
					<div
						key={partner.id}
						style={{
							flexShrink: 0,
							width: '200px',
							height: '100px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						className='logo'
					>
						<img
							src={partner.logo}
							alt={partner.name}
							style={{ maxWidth: '100%', maxHeight: '100%' }}
							onError={e => {
								e.currentTarget.src = 'https://via.placeholder.com/150x100'
								e.currentTarget.alt = 'Логотип не найден'
							}}
						/>
					</div>
				))}
			</div>
			<span className='bottom-border'></span>
		</section>
	)
}
