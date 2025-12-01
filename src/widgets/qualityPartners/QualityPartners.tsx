import { useEffect, useState } from 'react'
import './QualityPartners.scss'
import axios from 'axios'

interface Partner {
	id: number
	url: string
	name: string
	logo: string
}

export default function QualityPartners() {
	const [partners, setPartners] = useState<Partner[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get(
					'https://back-bonte.anti-flow.com/api/v1/client/carousel/'
				)

				setPartners(response.data)
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
			<div className='container'>
				<h2>Поставляем сырье для компаний ,которым не все равно на качество</h2>

				<div className='partners-track'>
					{partners.map(partner => (
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
			</div>
		</section>
	)
}
