import AboutUs from '../../widgets/aboutUs/AboutUs'
import Footer from '../../widgets/footer/Footer'
import MainSection from '../../widgets/mainSection/MainSection'
import OurPartners from '../../widgets/ourPartners/OurPartners'
import OurStatistics from '../../widgets/ourStatistics/OurStatistics'
import QualityPartners from '../../widgets/qualityPartners/QualityPartners'
import Video from '../../widgets/video/Video'
import WhatWeOffer from '../../widgets/whatWeOffer/WhatWeOffer'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function Home() {
	const location = useLocation()

	useEffect(() => {
		if (!location.hash) return

		const timer = setTimeout(() => {
			const id = location.hash.replace('#', '')
			const element = document.getElementById(id)

			if (!element) return

			window.scrollTo({
				top: element.getBoundingClientRect().top,
				behavior: 'smooth',
			})
		}, 500)

		return () => clearTimeout(timer)
	}, [location])

	return (
		<div className='home'>
			<MainSection />
			<WhatWeOffer />
			<AboutUs />
			<OurPartners />
			<Video />
			<OurStatistics />
			<QualityPartners />
			<Footer />
		</div>
	)
}
