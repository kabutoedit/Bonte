import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../shared/ui/Button'
import './MainSection.scss'

interface SliderItem {
	id: number
	title: string
	image: string
	link: string
}

const SLIDER_INTERVAL = 2000

export default function MainSection() {
	const sliderData: SliderItem[] = [
		{
			id: 1,
			title: 'Кондитерские изделия',
			image: '/images/confectionery.png',
			link: '/confectionery',
		},
		{
			id: 2,
			title: 'Молочная продукция',
			image: '/images/milkProducts.png',
			link: '/milk-products',
		},
		{
			id: 3,
			title: 'Horeca',
			image: '/images/horeca.png',
			link: '/horeca',
		},
		{
			id: 4,
			title: 'Пищевая химия',
			image: '/images/foodСhemistry.png',
			link: '/food-chemistry',
		},
		{
			id: 5,
			title: 'Хлебобулочные продукты',
			image: '/images/bakeryProducts.png',
			link: '/bakery-products',
		},
		{
			id: 6,
			title: 'Специализированные жиры',
			image: '/images/specializedFats.png',
			link: '/specialized-fats',
		},
	]

	const [currentSlide, setCurrentSlide] = useState<number>(0)
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % sliderData.length)
		}, SLIDER_INTERVAL)

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [sliderData.length])

	const currentItem = sliderData[currentSlide]

	return (
		<section id='main' className='main-section'>
			<div className='container'>
				<div className='main-section__text'>
					<p>
						Прямые поставки из разных стран и регионов мира <br />
						позволяют нам обеспечить широкий ассортимент продукции.
					</p>
					<span>
						ПОСТАВКА <br /> СЫРЬЯ ДЛЯ <span>ПИЩЕВОЙ</span> ПРОМЫШЛЕННОСТИ
					</span>
				</div>

				<div className='main-section__sliderBlock'>
					<div className='slider__content' key={currentSlide}>
						<div className='img'>
							<img src={currentItem.image} alt={currentItem.title} />
						</div>
						<h4>{currentItem.title}</h4>
						<Link to={currentItem.link}>
							<Button>Подробнее</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
