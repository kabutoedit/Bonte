import { Link } from 'react-router-dom'
import './WhatWeOffer.scss'

export default function WhatWeOffer() {
	return (
		<section id='catalog' className='what-we-offer'>
			<div className='container'>
				<h2>Что мы вам предлагаем?</h2>
				<div className='content'>
					<div className='up-block'>
						<Link to={'/milk-products'} className='medium-offer-block first'>
							<div className='blur'></div>
							<h5>Молочная продукция</h5>
							<p>
								Стабилизаторы, закваски, ароматизаторы и другие ингредиенты для
								молочной продукции.
							</p>
						</Link>
						<div className='two-little-blocks'>
							<Link to='/horeca' className='little-offer-block first'>
								<div className='blur'></div>
								<h5>Horeca</h5>
								<p>
									Ингредиенты для ресторанов, кафе и отелей: качественное сырьё
									для стабильных блюд.
								</p>
							</Link>
							<Link to='/food-chemistry' className='little-offer-block second'>
								<div className='blur'></div>
								<h5>Пищевая химия</h5>
								<p>
									Сорбат калия, фосфомикс и другие добавки для безопасности и
									стабильности продукции.
								</p>
							</Link>
						</div>

						<Link to='/confectionery' className='medium-offer-block second'>
							<div className='blur'></div>
							<h5>Кондитерские изделия</h5>
							<p>
								Какао-продукты, наполнители, стабилизаторы и другое сырьё для
								кондитерского производства.
							</p>
						</Link>
					</div>
					<div className='down-block'>
						<Link to='/bakery-products' className='big-offer-block first'>
							<div className='blur'></div>
							<h5>Хлебобулочные продукты</h5>
							<p>
								Улучшители, закваски, ферментные комплексы и добавки для
								хлебопекарной продукции.
							</p>
						</Link>
						<Link to='/specialized-fats' className='big-offer-block second'>
							<div className='blur'></div>
							<h5>Специализированные жиры</h5>
							<p>
								Кондитерские, хлебопекарные и фритюрные жиры с отличными
								технологическими свойствами.
							</p>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
