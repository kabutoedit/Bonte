import Button from '../../shared/ui/Button'
import LeftNavbar from '../../widgets/leftNavBar/LeftNavBar'
import SubCategoryCard from '../../widgets/subCategoryCard/SubCategoryCard'
import './Category.scss'
import { ProductsType } from '../../types'

type CategoriesProps = {
	categories: ProductsType[]
}

export default function Category({ categories }: CategoriesProps) {
	console.log(categories)

	return (
		<div className='categoryPage'>
			<LeftNavbar />

			<div className='subCategory'>
				<div className='cardContainer'>
					{categories.map(cat => (
						<SubCategoryCard key={cat.id} subCategories={cat} />
					))}
				</div>

				<Button>Заказать по WhatsApp</Button>
			</div>
		</div>
	)
}
