import './OurPartners.scss'

interface Partner {
	id: number
	name: string
	logo: string
	hasBorderRadius?: boolean
	width: number
	height: number
}

const partners: Partner[] = [
	{
		id: 1,
		name: 'Kulikov',
		logo: '/images/ourPartners/kulikov.png',
		hasBorderRadius: false,
		width: 332,
		height: 91,
	},
	{
		id: 2,
		name: 'Wildberries',
		logo: '/images/ourPartners/wb.png',
		hasBorderRadius: true,
		width: 240,
		height: 113,
	},
	{
		id: 3,
		name: 'Dostor',
		logo: '/images/ourPartners/dostor.png',
		hasBorderRadius: true,
		width: 129,
		height: 129,
	},
	{
		id: 4,
		name: 'Mbank',
		logo: '/images/ourPartners/mbank.png',
		hasBorderRadius: false,
		width: 226,
		height: 54,
	},
	{
		id: 5,
		name: 'Yandex Go',
		logo: '/images/ourPartners/yandex.png',
		hasBorderRadius: true,
		width: 284,
		height: 122,
	},
	{
		id: 6,
		name: 'Heart',
		logo: '/images/ourPartners/heart.png',
		hasBorderRadius: false,
		width: 119,
		height: 119,
	},
	{
		id: 7,
		name: 'Glovo',
		logo: '/images/ourPartners/glovo.png',
		hasBorderRadius: true,
		width: 261,
		height: 250,
	},
]

export default function OurPartners() {
	return (
		<section className='our-partners'>
			<div className='container'>
				<h2>Наши партнёры</h2>
				<div className='partners-track'>
					{partners.map(partner => (
						<div key={partner.id} className='partner-logo'>
							<img
								src={partner.logo}
								alt={partner.name}
								className={partner.hasBorderRadius ? 'with-radius' : ''}
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
								className={partner.hasBorderRadius ? 'with-radius' : ''}
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
