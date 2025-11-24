import './SubCategoryCard.scss'

interface SubCategory {
	id: number
	name: string
	image: string
	available: boolean
}

export default function SubCategoryCard() {
	const subCategories = [
		{
			id: 101,
			name: 'Заквасочные культуры',
			image: '/public/images/aboutUs.jpg',
			available: false,
		},
		{
			id: 102,
			name: 'Заквасочные культуры',
			image: '/public/images/aboutUs.jpg',
			available: false,
		},
		{
			id: 103,
			name: 'Заквасочные культуры',
			image: '/public/images/aboutUs.jpg',
			available: false,
		},
		{
			id: 104,
			name: 'Заквасочные культуры',
			image: '/public/images/aboutUs.jpg',
			available: false,
		},
		{
			id: 105,
			name: 'Заквасочные культуры',
			image: '/public/images/aboutUs.jpg',
			available: false,
		},
	]

	return (
		<>
			{subCategories.map(category => (
				<div className='SubCategoryCard' key={category.id}>
					<div className='img'>
						<img src={category.image} alt={category.name} />
					</div>
					<h3>{category.name}</h3>
					<span></span>
					<div className='btns'>
						<div className={category.available ? 'available' : 'notAvailable'}>
							{category.available ? 'В наличии' : 'Не в наличии'}
						</div>
						<div className='toOrder'>На заказ</div>
					</div>
				</div>
			))}
		</>
	)
}
