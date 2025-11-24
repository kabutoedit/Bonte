import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './WhatWeOffer.scss'

interface OfferBlock {
	id: number
	title: string
	description: string
	size: 'medium' | 'little' | 'big'
	styleClass: string
}

const fetchOffersData = async (): Promise<OfferBlock[]> => {
	await new Promise(resolve => setTimeout(resolve, 300))

	return [
		{
			id: 1,
			title: 'Молочная продукция',
			description:
				'Стабилизаторы, закваски, ароматизаторы и другие ингредиенты для молочной продукции.',
			size: 'medium',
			styleClass: 'first',
		},
		{
			id: 2,
			title: 'Horeca',
			description:
				'Ингредиенты для ресторанов, кафе и отелей: качественное сырьё для стабильных блюд.',
			size: 'little',
			styleClass: 'first',
		},
		{
			id: 3,
			title: 'Пищевая химия',
			description:
				'Сорбат калия, фосфомикс и другие добавки для безопасности и стабильности продукции.',
			size: 'little',
			styleClass: 'second',
		},
		{
			id: 4,
			title: 'Кондитерские изделия',
			description:
				'Какао-продукты, наполнители, стабилизаторы и другое сырьё для кондитерского производства.',
			size: 'medium',
			styleClass: 'second',
		},
		{
			id: 5,
			title: 'Хлебобулочные продукты',
			description:
				'Улучшители, закваски, ферментные комплексы и добавки для хлебопекарной продукции.',
			size: 'big',
			styleClass: 'first',
		},
		{
			id: 6,
			title: 'Специализированные жиры',
			description:
				'Кондитерские, хлебопекарные и фритюрные жиры с отличными технологическими свойствами.',
			size: 'big',
			styleClass: 'second',
		},
	]
}

export default function WhatWeOffer() {
	const [offers, setOffers] = useState<OfferBlock[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadData = async () => {
			setLoading(true)
			const data = await fetchOffersData()
			setOffers(data)
			setLoading(false)
		}
		loadData()
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

	const mediumAndLittleBlocks = offers.filter(
		o => o.size === 'medium' || o.size === 'little'
	)
	const bigBlocks = offers.filter(o => o.size === 'big')

	const littleBlocks = mediumAndLittleBlocks.filter(o => o.size === 'little')
	const mediumBlocks = mediumAndLittleBlocks.filter(o => o.size === 'medium')

	return (
		<section id='catalog' className='what-we-offer'>
			<div className='container'>
				<h2>Что мы вам предлагаем?</h2>
				<div className='content'>
					<div className='up-block'>
						{mediumBlocks[0] && (
							<Link
								key={mediumBlocks[0].id}
								to={'/category/:categoryId'}
								className={`medium-offer-block ${mediumBlocks[0].styleClass}`}
							>
								<div className='blur'></div>
								<h5>{mediumBlocks[0].title}</h5>
								<p>{mediumBlocks[0].description}</p>
							</Link>
						)}

						<div className='two-little-blocks'>
							{littleBlocks.map(block => (
								<Link
									key={block.id}
									to={'/category/:categoryId'}
									className={`little-offer-block ${block.styleClass}`}
								>
									<div className='blur'></div>
									<h5>{block.title}</h5>
									<p>{block.description}</p>
								</Link>
							))}
						</div>

						{mediumBlocks[1] && (
							<Link
								key={mediumBlocks[1].id}
								to={'/category/:categoryId'}
								className={`medium-offer-block ${mediumBlocks[1].styleClass}`}
							>
								<div className='blur'></div>
								<h5>{mediumBlocks[1].title}</h5>
								<p>{mediumBlocks[1].description}</p>
							</Link>
						)}
					</div>

					<div className='down-block'>
						{bigBlocks.map(block => (
							<Link
								key={block.id}
								to={'/category/:categoryId'}
								className={`big-offer-block ${block.styleClass}`}
							>
								<div className='blur'></div>
								<h5>{block.title}</h5>
								<p>{block.description}</p>
							</Link>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
