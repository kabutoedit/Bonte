import Button from '../../shared/ui/Button'
import LeftNavbar from '../../widgets/leftNavBar/LeftNavBar'
import SubCategoryCard from '../../widgets/subCategoryCard/SubCategoryCard'
import './Category.scss'

export default function Category() {
	return (
		<div className='categoryPage'>
			<LeftNavbar />
			<div className='subCategory'>
				<div className='cardContainer'>
					<SubCategoryCard />
				</div>
				<Button>Заказать по WhatsApp</Button>
			</div>
		</div>
	)
}
