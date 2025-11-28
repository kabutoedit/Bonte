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
			<LeftNavbar />

			<div className='subCategory'>
				<div className='cardContainer'>
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

				<Button>Заказать по WhatsApp</Button>
			</div>
		</div>
	)
}
