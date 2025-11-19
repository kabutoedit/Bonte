import AboutUs from '../../widgets/aboutUs/AboutUs'
import Footer from '../../widgets/footer/Footer'
import MainSection from '../../widgets/mainSection/MainSection'
import OurPartners from '../../widgets/ourPartners/OurPartners'
import OurStatistics from '../../widgets/ourStatistics/OurStatistics'
import QualityPartners from '../../widgets/qualityPartners/QualityPartners'
import Video from '../../widgets/video/Video'
import WhatWeOffer from '../../widgets/whatWeOffer/WhatWeOffer'

export default function Home() {
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
