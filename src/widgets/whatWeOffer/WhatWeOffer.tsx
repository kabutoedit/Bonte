import { Link } from 'react-router-dom'

export default function WhatWeOffer() {
	return (
		<section className='what-we-offer'>
			<div className='container'>
				<h2>Что мы вам предлагаем?</h2>
				<div className='content'>
					<div className='up-block'>
						<Link to={'/milk-products'} className='medium-offer-block'>
							<div className='img'>
								<h5>Молочная продукция</h5>
								<p>
									Стабилизаторы, закваски, ароматизаторы и другие ингредиенты
									для молочной продукции.
								</p>
							</div>
						</Link>
						<div className='two-little-blocks'>
							<Link to='/horeca' className='little-offer-block'>
								<div className='img'>
									<h5>Horeca</h5>
									<p>
										Ингредиенты для ресторанов, кафе и отелей: качественное
										сырьё для стабильных блюд.
									</p>
								</div>
							</Link>
							<Link to='/food-chemistry' className='little-offer-block'>
								<div className='img'>
									<h5>Пищевая химия</h5>
									<p>
										Сорбат калия, фосфомикс и другие добавки для безопасности и
										стабильности продукции.
									</p>
								</div>
							</Link>
						</div>

						<Link to='/confectionery' className='medium-offer-block'>
							<div className='img'>
								<h5>Кондитерские изделия</h5>
								<p>
									Какао-продукты, наполнители, стабилизаторы и другое сырьё для
									кондитерского производства.
								</p>
							</div>
						</Link>
					</div>
					<div className='down-block'>
						<Link to='/bakery-products' className='big-offer-block'>
							<div className='img'>
								<h5>Хлебобулочные продукты</h5>
								<p>
									Улучшители, закваски, ферментные комплексы и добавки для
									хлебопекарной продукции.
								</p>
							</div>
						</Link>
						<Link to='/specialized-fats' className='big-offer-block'>
							<div className='img'>
								<h5>Специализированные жиры</h5>
								<p>
									Кондитерские, хлебопекарные и фритюрные жиры с отличными
									технологическими свойствами.
								</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
