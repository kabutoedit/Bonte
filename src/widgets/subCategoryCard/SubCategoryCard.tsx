import './SubCategoryCard.scss'
import { ProductsType } from '../../types'

type SubCategoryProps = {
	subCategories: ProductsType
}

export default function SubCategoryCard({ subCategories }: SubCategoryProps) {
	return (
		<div className='SubCategoryCard'>
			<div className='img'>
				<img src={subCategories.image} alt={subCategories.title} />
			</div>

			<h3>{subCategories.title}</h3>

			<div className='btns'>
				<div className={subCategories.in_stock ? 'available' : 'notAvailable'}>
					{subCategories.in_stock ? 'В наличии' : 'Не в наличии'}
				</div>

				<div className={subCategories.on_order ? 'toOrder' : 'notAvailable'}>
					{subCategories.on_order ? 'В наличии' : 'Не доступно'}
				</div>
			</div>
		</div>
	)
}
