import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../shared/ui/Button'
import './MainSection.scss'
import axios from 'axios'

interface SliderItem {
	id: number
	title: string
	image: string
}

const SLIDER_INTERVAL = 2000

export default function MainSection() {
	const [currentSlide, setCurrentSlide] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(true)
	const [sliderData, setSliderData] = useState<SliderItem[]>([])

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	useEffect(() => {
		if (sliderData.length > 0) {
			intervalRef.current = setInterval(() => {
				setCurrentSlide(prev => (prev + 1) % sliderData.length)
			}, SLIDER_INTERVAL)
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [sliderData.length])

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get(
					'https://back-bonte.anti-flow.com/api/v1/landing/info/'
				)

				setSliderData(response.data.little_slider || [])
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	const currentItem = sliderData[currentSlide]

	if (loading) {
		return (
			<section id='main' className='main-section'>
				<div className='container'>
					<div className='loading'>Загрузка контента...</div>
				</div>
			</section>
		)
	}

	if (!currentItem) {
		return (
			<section id='main' className='main-section'>
				<div className='container'>
					<div className='info'>Нет доступных слайдов.</div>
				</div>
			</section>
		)
	}

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
					<div className='slider__content' key={currentItem.id}>
						<div className='img'>
							<img src={currentItem.image} alt={currentItem.title} />
						</div>
						<h4>{currentItem.title}</h4>
						<Link to={`/catalog/${currentItem.slug}`}>
							<Button>Подробнее</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
