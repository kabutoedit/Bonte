import './OurPartners.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface Partner {
	id: number
	logo: string
	name: string
	slug?: string
}

export default function OurPartners() {
	const [sliderData, setSliderData] = useState<Partner[]>([])
	const [loading, setLoading] = useState(true)

	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

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

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get(
					'https://back-bonte.anti-flow.com/api/v1/partner/carousel/'
				)

				setSliderData(response.data)
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) {
		return <div className='loading'>Загрузка партнеров...</div>
	}
	return (
		<section className='our-partners'>
			<h2>Наши партнёры</h2>

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
		</section>
	)
}
