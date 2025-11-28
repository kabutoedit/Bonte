import { NavLink } from 'react-router-dom'
import Button from '../../shared/ui/Button'
import LeftNavBar from '../leftNavBar/LeftNavBar'
import './Catalog404.scss'

export default function Catalog404() {
	return (
		<div className='categoryPage'>
			<LeftNavBar />
			<div className='Catalog404'>
				<div className='text'>
					<h3>Товар временно недоступен или был удалён из каталога.</h3>
					<p>Страница не найдена. Вернуться на главную?</p>
					<NavLink to={'/'}>
						<Button>Вернуться на главную</Button>
					</NavLink>
				</div>
				<div className='img'></div>
			</div>
		</div>
	)
}
