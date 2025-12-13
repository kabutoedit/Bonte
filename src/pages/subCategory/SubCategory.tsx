import LeftNavbar from '../../widgets/leftNavBar/LeftNavBar'
import SubCategoryCard from '../../widgets/subCategoryCard/SubCategoryCard'
import Button from '../../shared/ui/Button'
import './SubCategory.scss'
import { NavLink } from 'react-router-dom'
import { ProductsType } from '../../types'

type SubCategoryProps = {
	subCategories: ProductsType[]
}

export default function SubCategory({ subCategories }: SubCategoryProps) {
	return (
		<div className='subCategoryBlock'>
			<div
				className='containerCatalog'
				style={{ display: 'flex', width: 1440, margin: '0 auto' }}
			>
				<LeftNavbar />

				<div className='subCategory'>
					<div
						style={subCategories.length <= 0 ? { display: 'none' } : {}}
						className='cardContainer'
					>
						{subCategories.map(subCategory => (
							<NavLink
								to={`/catalog/${subCategory.slug}`}
								style={{ cursor: 'pointer', color: 'rgba(12, 30, 52, 1)' }}
								key={subCategory.id}
							>
								<SubCategoryCard subCategories={subCategory} />
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
