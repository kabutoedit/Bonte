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

	const firstRow = offers.slice(0, 2)
	const secondRow = offers.slice(2, 4)
	const thirdRow = offers.slice(4)

	return (
		<section id='catalog' className='what-we-offer'>
			<div className='container'>
				<h2>Что мы вам предлагаем?</h2>
				<div className='content'>
					<div className='up-block'>
						{firstRow[0] && (
							<Link
								to={`/catalog/${firstRow[0].slug}`}
								className='medium-offer-block'
								style={{
									backgroundImage: `url(https://back-bonte.anti-flow.com${firstRow[0].image})`,
								}}
							>
								<div className='blur'></div>
								<h5>{firstRow[0].title}</h5>
								<p>{firstRow[0].description}</p>
							</Link>
						)}

						<div className='two-little-blocks'>
							{secondRow.map(block => (
								<Link
									key={block.id}
									to={`/catalog/${block.slug}`}
									className='little-offer-block'
									style={{
										backgroundImage: `url(https://back-bonte.anti-flow.com${block.image})`,
									}}
								>
									<div className='blur'></div>
									<h5>{block.title}</h5>
									<p>{block.description}</p>
								</Link>
							))}
						</div>

						{firstRow[1] && (
							<Link
								to={`/catalog/${firstRow[1].slug}`}
								className='medium-offer-block'
								style={{
									backgroundImage: `url(https://back-bonte.anti-flow.com${firstRow[1].image})`,
								}}
							>
								<div className='blur'></div>
								<h5>{firstRow[1].title}</h5>
								<p>{firstRow[1].description}</p>
							</Link>
						)}
					</div>

					<div className='down-block'>
						{thirdRow.map(block => {
							const isBig = thirdRow.length <= 2

							return (
								<Link
									key={block.id}
									to={`/catalog/${block.slug}`}
									className={isBig ? 'big-offer-block' : 'medium-offer-block'}
									style={{
										backgroundImage: `url(https://back-bonte.anti-flow.com${block.image})`,
									}}
								>
									<div className='blur'></div>
									<h5>{block.title}</h5>
									<p>{block.description}</p>
								</Link>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
