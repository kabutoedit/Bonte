import './ProductCard.scss'
import { ProductsType } from '../../types'

type ProductCardProps = {
	product: ProductsType
}

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<>
			<div className='productCard' key={product.id}>
				<div className='img'>
					<img
						src={`https://back-bonte.anti-flow.com` + product.image}
						alt={product.title}
					/>
				</div>
				<h3>{product.title}</h3>
				<p>{product.description}</p>
				<div className='btns'>
					<div className={product.in_stock ? 'available' : 'notAvailable'}>
						{product.in_stock ? 'В наличии' : 'Не в наличии'}
					</div>
					<div className={product.on_order ? 'toOrder' : 'notAvailable'}>
						{product.on_order ? 'В наличии' : 'Не доступно'}
					</div>
				</div>
			</div>
		</>
	)
}
