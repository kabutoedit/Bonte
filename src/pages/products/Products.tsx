import { useState } from 'react'
import LeftNavbar from '../../widgets/leftNavBar/LeftNavBar'
import ProductCard from '../../widgets/productCard/ProductCard'
import Button from '../../shared/ui/Button'
import './Products.scss'
import Catalog404 from '../../widgets/catalog404/Catalog404'
import { ProductsType } from '../../types'

type ProductsProps = {
	products: ProductsType[]
}

export default function Products({ products }: ProductsProps) {
	const [expanded, setExpanded] = useState(false)
	const [mainSubCategory, setMainSubCategory] = useState(products[0])

	if (!products.length) {
		return <Catalog404 />
	}

	return (
		<div className='subCategoryBlock'>
			<LeftNavbar />

			<div className='subCategory'>
				{mainSubCategory && (
					<div className='bigCard'>
						<div className='textBlock'>
							<h2>{mainSubCategory.title}</h2>
							{mainSubCategory.description && (
								<>
									<p>
										{expanded
											? mainSubCategory.description
											: mainSubCategory.description.slice(0, 350)}
										{mainSubCategory.description.length > 350 &&
											!expanded &&
											'...'}
									</p>
									{mainSubCategory.description.length > 350 && (
										<h6 onClick={() => setExpanded(prev => !prev)}>
											{expanded ? 'Скрыть' : 'Подробнее'}
										</h6>
									)}
								</>
							)}
						</div>
						<div className='img'>
							<img src={mainSubCategory.image} alt={mainSubCategory.title} />
						</div>
					</div>
				)}

				<div className='cardContainer'>
					{products.map(product => (
						<div
							style={{ cursor: 'pointer' }}
							key={product.id}
							onClick={() => setMainSubCategory(product)}
						>
							<ProductCard product={product} />
						</div>
					))}
				</div>

				<Button>Заказать по WhatsApp</Button>
			</div>
		</div>
	)
}
