import AboutUs from '../../widgets/aboutUs/AboutUs'
import MainSection from '../../widgets/mainSection/MainSection'
import OurPartners from '../../widgets/ourPartners/OurPartners'
import WhatWeOffer from '../../widgets/whatWeOffer/WhatWeOffer'

export default function Home() {
	return (
		<div className='home'>
			<MainSection />
			<WhatWeOffer />
			<AboutUs />
			<OurPartners />
		</div>
	)
}
