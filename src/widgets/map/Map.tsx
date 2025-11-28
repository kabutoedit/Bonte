import './Map.scss'

interface ContactItem {
	id: number
	title: string
}

interface MapProps {
	latitude: number | null
	longitude: number | null
	address: string
	phoneNumbers: Array<ContactItem>
	email: Array<ContactItem>
}

export default function Map({
	latitude,
	longitude,
	address,
	email,
	phoneNumbers,
}: MapProps) {
	if (latitude === null || longitude === null) {
		return (
			<div className='map'>
				<p>Карта недоступна, нет координат.</p>
				<div className='info'>
					<div className='adress'>
						<h4>Адрес</h4>
						<p>{address}</p>
					</div>
					<div className='mail'>
						<h4>Почта</h4>
						{email.map(item => {
							return <p key={item.id}>{item.email}</p>
						})}
					</div>
					<div className='phone'>
						<h4>Телефон</h4>

						{phoneNumbers.map(item => {
							return <p key={item.id}>{item.title}</p>
						})}
					</div>
				</div>
			</div>
		)
	}

	const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`

	return (
		<div className='map'>
			<iframe
				src={mapUrl}
				width='600'
				height='450'
				style={{ border: 0 }}
				allowFullScreen={true}
				loading='lazy'
				referrerPolicy='no-referrer-when-downgrade'
				title='Google Map Location'
			></iframe>

			<div className='info'>
				<div className='adress'>
					<h4>Адрес</h4>
					<p>{address}</p>
				</div>
				<div className='mail'>
					<h4>Почта</h4>
					{email.map(item => {
						return <p key={item.id}>{item.email}</p>
					})}
				</div>
				<div className='phone'>
					<h4>Телефон</h4>

					{phoneNumbers.map(item => {
						return <p key={item.id}>{item.title}</p>
					})}
				</div>
			</div>
		</div>
	)
}
