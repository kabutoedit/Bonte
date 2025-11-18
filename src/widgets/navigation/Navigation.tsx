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
	return (
		<nav className='navigation'>
			<a
				href='#main'
				className='navigation__link'
				onClick={e => handleScroll(e, '#main')}
			>
				ГЛАВНАЯ
			</a>
			<a
				href='#catalog'
				className='navigation__link'
				onClick={e => handleScroll(e, '#catalog')}
			>
				КАТАЛОГ
			</a>
			<a
				href='#about'
				className='navigation__link'
				onClick={e => handleScroll(e, '#about')}
			>
				О НАС
			</a>
			<a
				href='#contacts'
				className='navigation__link'
				onClick={e => handleScroll(e, '#contacts')}
			>
				КОНТАКТЫ
			</a>
		</nav>
	)
}
