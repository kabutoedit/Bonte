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
	const [loading, setLoading] = useState(true)
	const [sliderData, setSliderData] = useState<Partner[]>([])

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get<Partner[]>(
					'https://back-bonte.anti-flow.com/api/v1/partner/carousel/'
				)

				const data =
					response.data?.map(partner => ({
						...partner,
						logo: partner.logo.startsWith('http')
							? partner.logo
							: `https://${partner.logo}`,
					})) || []

				setSliderData(data)
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	console.log(sliderData)

	if (loading) {
		return (
			<section className='our-partners'>
				<div className='container'>
					<h2>Наши партнёры</h2>
					<div className='loading'>Загрузка...</div>
				</div>
			</section>
		)
	}

	if (!sliderData.length) {
		return (
			<section className='our-partners'>
				<div className='container'>
					<h2>Наши партнёры</h2>
					<div className='no-data'>Нет данных о партнерах</div>
				</div>
			</section>
		)
	}

	return (
		<section className='our-partners'>
			<div className='container'>
				<h2>Наши партнёры</h2>

				<div className='partners-track'>
					{sliderData.map(partner => (
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
			</div>
		</section>
	)
}
