import { useState, useEffect } from 'react'
import LeftNavbar from '../../widgets/leftNavBar/LeftNavBar'
import ProductCard from '../../widgets/productCard/ProductCard'
import Button from '../../shared/ui/Button'
import './Products.scss'
import Catalog404 from '../../widgets/catalog404/Catalog404'
import { ProductsType } from '../../types'
import { NavLink } from 'react-router-dom'

type ProductsProps = {
	products: ProductsType[] | null
	subCategoryData: ProductsType
}

export default function Products({ products, subCategoryData }: ProductsProps) {
	const [expanded, setExpanded] = useState(false)
	const [mainSubCategory, setMainSubCategory] = useState(subCategoryData)

	if (!products && !subCategoryData) {
		return <Catalog404 />
	}

	useEffect(() => {
		if (products?.length === 0) {
			setExpanded(true)
		}
	}, [products])

	return (
		<div className='subCategoryBlock'>
			<div
				className='containerCatalog'
				style={{ display: 'flex', width: 1440, margin: '0 auto' }}
			>
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
								<img
									src={
										`https://back-bonte.anti-flow.com` + mainSubCategory.image
									}
									alt={mainSubCategory.title}
								/>
							</div>
						</div>
					)}

					<div
						style={!products ? { display: 'none' } : {}}
						className='cardContainer'
					>
						{products?.map(product => (
							<NavLink
								to={`/catalog/${product.slug}`}
								style={{ cursor: 'pointer' }}
								key={product.id}
								onClick={() => setMainSubCategory(product)}
							>
								<ProductCard product={product} />
							</NavLink>
						))}
					</div>
					<a href='https://wa.me/+996999223395' style={{ textAlign: 'center' }}>
						<Button>Заказать по WhatsApp</Button>
					</a>
				</div>
			</div>
		</div>
	)
}
