import { NavLink } from 'react-router-dom'
import './Navigation.scss'

export default function Navigation() {
	return (
		<nav className='navigation'>
			<NavLink to='/' className='navigation__link' end>
				ГЛАВНАЯ
			</NavLink>
			<NavLink to='/catalog' className='navigation__link'>
				КАТАЛОГ
			</NavLink>
			<NavLink to='/about' className='navigation__link'>
				О НАС
			</NavLink>
			<NavLink to='/contacts' className='navigation__link'>
				КОНТАКТЫ
			</NavLink>
		</nav>
	)
}

