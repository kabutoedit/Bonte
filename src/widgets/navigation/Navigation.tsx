import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Navigation.scss'

interface NavigationProps {
	onLinkClick?: () => void
	isMobile?: boolean
}

const handleScroll = (id: string) => {
	const element = document.getElementById(id)
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

export default function Navigation({ onLinkClick, isMobile }: NavigationProps) {
	const location = useLocation()
	const navigate = useNavigate()
	const onMainPage = location.pathname === '/'
	const [activeLink, setActiveLink] = useState('')
	const [mobileView, setIsMobile] = useState(false)

	const handleLinkClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		id: string
	) => {
		e.preventDefault()

		if (onMainPage) {
			handleScroll(id)
			setActiveLink(id)
			if (onLinkClick) onLinkClick()
		} else {
			navigate('/', { state: { scrollTo: id } })
			if (onLinkClick) onLinkClick()
		}
	}

	useEffect(() => {
		if (location.state?.scrollTo && onMainPage) {
			const id = location.state.scrollTo
			setTimeout(() => {
				handleScroll(id)
				setActiveLink(id)
			}, 500)

			navigate(location.pathname, { replace: true, state: {} })
		}
	}, [location, navigate, onMainPage])

	useEffect(() => {
		if (!onMainPage) return

		const handleScrollActive = () => {
			const sections = ['main', 'catalog', 'about', 'contacts', 'contact-us']
			const currentPosition = window.scrollY + 200

			for (const sectionId of sections) {
				const element = document.getElementById(sectionId)
				if (element) {
					const { offsetTop, offsetHeight } = element
					if (
						currentPosition >= offsetTop &&
						currentPosition < offsetTop + offsetHeight
					) {
						setActiveLink(sectionId)
						break
					}
				}
			}
		}

		window.addEventListener('scroll', handleScrollActive, { passive: true })
		handleScrollActive()

		return () => window.removeEventListener('scroll', handleScrollActive)
	}, [onMainPage])

	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth <= 375)
		}

		checkScreenSize()
		window.addEventListener('resize', checkScreenSize)

		return () => window.removeEventListener('resize', checkScreenSize)
	}, [])

	const isMobileView = isMobile || mobileView

	return (
		<nav className='navigation'>
			<a
				href='#main'
				className={`navigation__link ${activeLink === 'main' ? 'active' : ''}`}
				onClick={e => handleLinkClick(e, 'main')}
			>
				ГЛАВНАЯ
			</a>

			<a
				href='#catalog'
				className={`navigation__link ${
					activeLink === 'catalog' ? 'active' : ''
				}`}
				onClick={e => handleLinkClick(e, 'catalog')}
			>
				КАТАЛОГ
			</a>

			<a
				href='#about'
				className={`navigation__link ${activeLink === 'about' ? 'active' : ''}`}
				onClick={e => handleLinkClick(e, 'about')}
			>
				О НАС
			</a>

			<a
				href='#contacts'
				className={`navigation__link ${
					activeLink === 'contacts' ? 'active' : ''
				}`}
				onClick={e => handleLinkClick(e, 'contacts')}
			>
				КОНТАКТЫ
			</a>

			{isMobileView && (
				<a
					href='#contact-us'
					className={`navigation__link ${
						activeLink === 'contact-us' ? 'active' : ''
					}`}
					onClick={e => handleLinkClick(e, 'contact-us')}
				>
					СВЯЗАТЬСЯ С НАМИ
				</a>
			)}
		</nav>
	)
}
