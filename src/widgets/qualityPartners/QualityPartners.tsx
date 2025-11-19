import './QualityPartners.scss'

interface Partner {
	id: number
	name: string
	logo: string
	width: number
	height: number
}

const partners: Partner[] = [
	{
		id: 1,
		name: 'White River',
		logo: '/images/qualityPartners/whiteRiver.png',
		width: 157,
		height: 157,
	},
	{
		id: 2,
		name: 'Besh',
		logo: '/images/qualityPartners/besh.png',
		width: 170,
		height: 87,
	},
	{
		id: 3,
		name: 'Salih',
		logo: '/images/qualityPartners/salih.png',
		width: 239,
		height: 113,
	},
	{
		id: 4,
		name: 'Umai Group',
		logo: '/images/qualityPartners/umaiGroup.png',
		width: 239,
		height: 86,
	},
	{
		id: 5,
		name: 'Riha',
		logo: '/images/qualityPartners/riha.jpg',
		width: 267,
		height: 66,
	},
	{
		id: 6,
		name: 'Ice Qween',
		logo: '/images/qualityPartners/iceQween.jpg',
		width: 205,
		height: 136,
	},
	{
		id: 7,
		name: 'Jety Baatyr',
		logo: '/images/qualityPartners/jetyBaatyr.jpg',
		width: 233,
		height: 189,
	},
]

export default function QualityPartners() {
	return (
		<section className='QualityPartners'>
			<div className='container'>
				<h2>Наши партнёры</h2>
				<div className='partners-track'>
					{partners.map(partner => (
						<div key={partner.id} className='partner-logo'>
							<img
								src={partner.logo}
								alt={partner.name}
								width={partner.width}
								height={partner.height}
								style={{
									width: `${partner.width}px`,
									height: `${partner.height}px`,
								}}
							/>
						</div>
					))}
					{partners.map(partner => (
						<div key={`duplicate-${partner.id}`} className='partner-logo'>
							<img
								src={partner.logo}
								alt={partner.name}
								width={partner.width}
								height={partner.height}
								style={{
									width: `${partner.width}px`,
									height: `${partner.height}px`,
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
