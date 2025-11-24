import './ProductCard.scss'

interface Product {
	image: string
	id: number
	name: string
	description: string
	available: boolean
}

export default function ProductCard() {
	const products: Product[] = [
		{
			id: 1,
			name: 'Заквасочные культуры',
			image: '/public/images/aboutUs.jpg',
			description:
				'Закваска этого типа - LYOBAC® - простая в использовании и управлении, может использоваться для производства различных итальянских и международных сыров.',
			available: true,
		},
		{
			id: 2,
			name: 'Провода и Проволоне',
			image: '/public/images/aboutUs.jpg',
			description:
				'Высококачественные культуры для производства провода и проволоне. Обеспечивают превосходный вкус, текстуру и длительный срок хранения готового продукта.',
			available: true,
		},
		{
			id: 3,
			name: 'Горгонзола',
			image: '/public/images/aboutUs.jpg',
			description:
				'Высококачественные культуры для производства горгонзола. Обеспечивают превосходный вкус, текстуру и длительный срок хранения готового продукта.',
			available: true,
		},
		{
			id: 4,
			name: 'Качокавалло',
			image: '/public/images/aboutUs.jpg',
			description:
				'Высококачественные культуры для производства качокавалло. Обеспечивают превосходный вкус, текстуру и длительный срок хранения готового продукта.',
			available: true,
		},
		{
			id: 5,
			name: 'Фонталь',
			image: '/public/images/aboutUs.jpg',
			description:
				'Высококачественные культуры для производства фонталь. Обеспечивают превосходный вкус, текстуру и длительный срок хранения готового продукта.',
			available: true,
		},
		{
			id: 6,
			name: 'Примосале',
			image: '/public/images/aboutUs.jpg',
			description:
				'Высококачественные культуры для производства примосале. Обеспечивают превосходный вкус, текстуру и длительный срок хранения готового продукта.',
			available: true,
		},
		{
			id: 7,
			name: 'Сыры типа Чеддер',
			image: '/public/images/aboutUs.jpg',
			description:
				'Высококачественные культуры для производства сыры типа чеддер. Обеспечивают превосходный вкус, текстуру и длительный срок хранения готового продукта.',
			available: false,
		},
		{
			id: 8,
			name: 'Домашний сыр',
			image: '/public/images/aboutUs.jpg',
			description:
				'Высококачественные культуры для производства домашний сыр. Обеспечивают превосходный вкус, текстуру и длительный срок хранения готового продукта.',
			available: false,
		},
		{
			id: 9,
			name: 'Твёрдые сыры',
			image: '/public/images/aboutUs.jpg',
			description:
				'Высококачественные культуры для производства твёрдые сыры. Обеспечивают превосходный вкус, текстуру и длительный срок хранения готового продукта.',
			available: true,
		},
	]

	return (
		<>
			{products.map(product => (
				<div className='productCard' key={product.id}>
					<div className='img'>
						<img src={product.image} alt={product.name} />
					</div>
					<h3>{product.name}</h3>
					<p>{product.description}</p>
					<span></span>
					<div className='btns'>
						<div className={product.available ? 'available' : 'notAvailable'}>
							{product.available ? 'В наличии' : 'Не в наличии'}
						</div>
						<div className='toOrder'>На заказ</div>
					</div>
				</div>
			))}
		</>
	)
}
