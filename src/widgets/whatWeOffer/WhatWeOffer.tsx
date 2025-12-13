import { useQuery } from '@tanstack/react-query'
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

const fetchOffers = async (): Promise<OfferBlock[]> => {
	const response = await axios.get(
		'https://back-bonte.anti-flow.com/api/v1/landing/info/'
	)
	return response.data.grid_category || []
}

export default function WhatWeOffer() {
	const { data: offers = [], isLoading } = useQuery({
		queryKey: ['offers'],
		queryFn: fetchOffers,
		staleTime: 10 * 60 * 1000,
	})

	if (isLoading) {
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
