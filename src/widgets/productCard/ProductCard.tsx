import './ProductCard.scss'

interface Product {
	image: string
	id: number
	title: string
	description: string
	available: boolean
	on_order: boolean
}

type ProductCardProps = {
	product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
	console.log(product)

	return (
		<>
			<div className='productCard' key={product.id}>
				<div className='img'>
					<img src={product.image} alt={product.title} />
				</div>
				<h3>{product.title}</h3>
				<p>{product.description}</p>
				<div className='btns'>
					<div className={product.available ? 'available' : 'notAvailable'}>
						{product.available ? 'В наличии' : 'Не в наличии'}
					</div>
					<div className={product.on_order ? 'toOrder' : 'notAvailable'}>
						{product.on_order ? 'В наличии' : 'Не доступно'}
					</div>
				</div>
			</div>
		</>
	)
}
