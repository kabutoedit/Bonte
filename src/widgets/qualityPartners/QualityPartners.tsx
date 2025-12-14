import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import './QualityPartners.scss'

interface Partner {
	id: number
	url: string
	name: string
	logo: string
}

const fetchQualityPartners = async (): Promise<Partner[]> => {
	const response = await axios.get(
		'https://back-bonte.anti-flow.com/api/v1/client/carousel/'
	)
	if (!response.data) {
		throw new Error('Ошибка при загрузке партнеров')
	}
	return response.data
}

export default function QualityPartners() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

	const {
		data: partners = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ['qualityPartners'],
		queryFn: fetchQualityPartners,
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

	const dataToShow = windowWidth > 1400 ? [...partners, ...partners] : partners

	if (isLoading) {
		return <div className='loading'>Загрузка партнеров...</div>
	}

	if (error) {
		return <div className='loading'>Ошибка загрузки данных</div>
	}

	return (
		<section className='QualityPartners'>
			<div className='container'>
				<h2>Поставляем сырье для компаний, которым важно качество</h2>

				<span className='top-border'></span>

				<div className='partners-track'>
					{dataToShow.map((partner, index) => (
						<div
							key={`${partner.id}-${index}`}
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
			</div>
		</section>
	)
}
