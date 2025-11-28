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
					'https://back-bonte.anti-flow.com/api/v1/partner/carousel/'
				)

				console.log(response.data)
				setPartners(response.data)
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return (
		<section className='QualityPartners'>
			<div className='container'>
				<h2>Наши партнёры</h2>
				<div className='partners-track'>
					{partners.map(partner => (
						<div key={partner.id} className='partner-logo'>
							<img src={partner.logo} alt={partner.name} />
						</div>
					))}
					{partners.map(partner => (
						<div key={`duplicate-${partner.id}`} className='partner-logo'>
							<img src={partner.logo} alt={partner.name} />
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
