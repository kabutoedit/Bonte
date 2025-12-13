import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Button from '../../shared/ui/Button'
import './MainSection.scss'
import axios from 'axios'
import { SliderType } from '../../types'

const SLIDER_INTERVAL = 3500

const fetchSliderData = async (): Promise<SliderType[]> => {
	const response = await axios.get(
		'https://back-bonte.anti-flow.com/api/v1/landing/info/'
	)
	return response.data.little_slider || []
}

export default function MainSection() {
	const [currentSlide, setCurrentSlide] = useState<number>(0)
	const [isAnimating, setIsAnimating] = useState<boolean>(false)

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	const { data: sliderData = [], isLoading } = useQuery({
		queryKey: ['sliderData'],
		queryFn: fetchSliderData,
		staleTime: 5 * 60 * 1000,
	})

	useEffect(() => {
		if (sliderData.length > 0) {
			intervalRef.current = setInterval(() => {
				setIsAnimating(true)
				setTimeout(() => {
					setCurrentSlide(prev => (prev + 1) % sliderData.length)
					setIsAnimating(false)
				}, 300)
			}, SLIDER_INTERVAL)
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [sliderData.length])

	if (isLoading) {
		return (
			<section id='main' className='main-section'>
				<div className='container'>
					<div style={{ margin: '0 auto' }} className='loading'>
						Загрузка контента...
					</div>
				</div>
			</section>
		)
	}

	if (!sliderData.length) {
		return (
			<section id='main' className='main-section'>
				<div className='container'>
					<div style={{ margin: '0 auto' }} className='no-data'>
						Нет данных для отображения
					</div>
				</div>
			</section>
		)
	}

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
					<div
						className={`slider__content ${
							isAnimating ? 'fade-out' : 'fade-in'
						}`}
						key={currentItem.id}
					>
						<div className='img'>
							<img
								src={`https://back-bonte.anti-flow.com` + currentItem.image}
								alt={currentItem.title}
							/>
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
