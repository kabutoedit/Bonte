import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import './Navigation.scss'

interface NavigationProps {
	onLinkClick?: () => void
	isMobile?: boolean
}

export default function Navigation({ onLinkClick }: NavigationProps) {
	const location = useLocation()
	const onMainPage = location.pathname === '/'
	const [activeLink, setActiveLink] = useState('')
	const [isMobile, setIsMobile] = useState(false)

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		e.preventDefault()

		setActiveLink(id)

		if (onMainPage) {
			const element = document.querySelector(`#${id}`)
			if (element) {
				const headerOffset = 130
				const elementPosition = element.getBoundingClientRect().top
				const offsetPosition =
					elementPosition + window.pageYOffset - headerOffset

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				})
			}
		}

		if (onLinkClick) {
			onLinkClick()
		}
	}

	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth <= 375)
		}

		checkScreenSize()
		window.addEventListener('resize', checkScreenSize)

		return () => window.removeEventListener('resize', checkScreenSize)
	}, [])

	return (
		<nav className='navigation'>
			<a
				href={onMainPage ? '#main' : '/#main'}
				className={`navigation__link ${activeLink === 'main' ? 'active' : ''}`}
				onClick={e => handleClick(e, 'main')}
			>
				ГЛАВНАЯ
			</a>

			<a
				href={onMainPage ? '#catalog' : '/#catalog'}
				className={`navigation__link ${
					activeLink === 'catalog' ? 'active' : ''
				}`}
				onClick={e => handleClick(e, 'catalog')}
			>
				КАТАЛОГ
			</a>

			<a
				href={onMainPage ? '#about' : '/#about'}
				className={`navigation__link ${activeLink === 'about' ? 'active' : ''}`}
				onClick={e => handleClick(e, 'about')}
			>
				О НАС
			</a>

			<a
				href={onMainPage ? '#contacts' : '/#contacts'}
				className={`navigation__link ${
					activeLink === 'contacts' ? 'active' : ''
				}`}
				onClick={e => handleClick(e, 'contacts')}
			>
				КОНТАКТЫ
			</a>

			{isMobile && (
				<a
					href={onMainPage ? '#main' : '/#main'}
					className={`navigation__link ${
						activeLink === 'contact-us' ? 'active' : ''
					}`}
					onClick={e => handleClick(e, 'contact-us')}
				>
					СВЯЗАТЬСЯ С НАМИ
				</a>
			)}
		</nav>
	)
}
