import LeftNavbar from '../../widgets/leftNavBar/LeftNavBar'
import ProductCard from '../../widgets/productCard/ProductCard'
import Button from '../../shared/ui/Button'
import './SubCategory.scss'

export default function SubCategory() {
	return (
		<div className='subCategoryBlock'>
			<LeftNavbar />

			<div className='products'>
				<div className='cardContainer'>
					<ProductCard />
				</div>
				{/* <Button>Заказать по WhatsApp</Button> */}
			</div>
		</div>
	)
}
