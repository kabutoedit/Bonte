import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './WhatWeOffer.scss'
import axios from 'axios'

interface OfferBlock {
	id: number
	title: string
	description: string
	image: string
	slug: string
}

export default function WhatWeOffer() {
	const [offers, setOffers] = useState<OfferBlock[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get(
					'https://back-bonte.anti-flow.com/api/v1/landing/info/'
				)
				setOffers(response.data.grid_category || [])
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	if (loading) {
		return (
			<section id='catalog' className='what-we-offer loading-state'>
				<div className='container'>
					<h2>Что мы вам предлагаем?</h2>
					<div className='content'>Загрузка предложений...</div>
				</div>
			</section>
		)
	}

	return (
		<section id='catalog' className='what-we-offer'>
			<div className='container'>
				<h2>Что мы вам предлагаем?</h2>
				<div className='content'>
					{offers.map(offer => (
						<Link
							key={offer.id}
							to={`/catalog/${offer.slug}`}
							className='offerBlock'
							style={{
								backgroundImage: `url(https://back-bonte.anti-flow.com${offer.image})`,
							}}
						>
							<div className='blur'></div>
							<h5>{offer.title}</h5>
							<p>{offer.description}</p>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}
