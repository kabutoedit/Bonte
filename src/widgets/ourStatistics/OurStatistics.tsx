import './OurStatistics.scss'
import { useEffect, useState, useRef } from 'react'

export default function OurStatistics() {
	const [animated, setAnimated] = useState(false)
	const sectionRef = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setAnimated(true)
			}
		})

		if (sectionRef.current) {
			observer.observe(sectionRef.current)
		}
	}, [])

	const Counter = ({ to = 0, duration = 1500 }) => {
		const [count, setCount] = useState(0)

		useEffect(() => {
			if (!animated) return

			let start = 0
			const increment = to / (duration / 10)

			const timer = setInterval(() => {
				start += increment
				if (start >= to) {
					setCount(to)
					clearInterval(timer)
				} else {
					setCount(Math.floor(start))
				}
			}, 10)

			return () => clearInterval(timer)
		}, [to, animated, duration])

		return <span>{count}</span>
	}

	return (
		<section className='OurStatistic' ref={sectionRef}>
			<div className='container'>
				<div className='leftBlock'>
					<div className='twoLittle'>
						<div className='littleBlock'>
							<h3>
								<Counter to={500} />+
							</h3>
							<p>Тонн сырья поставляется ежемесячно по всей стране</p>
						</div>
						<div className='littleBlock'>
							<h3>
								<Counter to={99} />%
							</h3>
							<p>99% Заявок отгружаются точно в срок</p>
						</div>
					</div>
					<div className='large'>
						<h3>
							<Counter to={1000} />+ м²
						</h3>
						<p>Складских помещений с контролем температуры</p>
					</div>
				</div>
				<div className='bigBlock'>
					<h3>
						<Counter to={600} />+
					</h3>
					<p>
						Клиентов из <br /> сферы молочной, <br /> кондитерской и HoReCa{' '}
						<br />
						промышленности
					</p>
				</div>
			</div>
		</section>
	)
}
