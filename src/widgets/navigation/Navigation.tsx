import { useLocation } from 'react-router-dom'
import './Navigation.scss'

const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
	e.preventDefault()
	const element = document.querySelector(href)
	if (element) {
		const headerOffset = 130
		const elementPosition = element.getBoundingClientRect().top
		const offsetPosition = elementPosition + window.pageYOffset - headerOffset

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth',
		})
	}
}

export default function Navigation() {
	const location = useLocation()
	const onMainPage = location.pathname === '/'

	const link = (id: string, label: string) => {
		if (onMainPage) {
			return (
				<a
					href={`#${id}`}
					className='navigation__link'
					onClick={e => handleScroll(e, `#${id}`)}
				>
					{label}
				</a>
			)
		}

		return (
			<a href={`/#${id}`} className='navigation__link'>
				{label}
			</a>
		)
	}

	return (
		<nav className='navigation'>
			{link('main', 'ГЛАВНАЯ')}
			{link('catalog', 'КАТАЛОГ')}
			{link('about', 'О НАС')}
			{link('contacts', 'КОНТАКТЫ')}
		</nav>
	)
}
