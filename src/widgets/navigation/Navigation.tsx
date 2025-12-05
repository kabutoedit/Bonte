import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Navigation.scss'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

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
	const [categoryLink, setCategoryLink] = useState<string>('')

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

		let ticking = false

		const onScroll = () => {
			if (!ticking) {
				ticking = true
			}
		}

		window.addEventListener('scroll', onScroll, { passive: true })

		return () => window.removeEventListener('scroll', onScroll)
	}, [onMainPage])

	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth <= 450)
		}

		checkScreenSize()
		window.addEventListener('resize', checkScreenSize)

		return () => window.removeEventListener('resize', checkScreenSize)
	}, [])

	const isMobileView = isMobile || mobileView

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get(
					'https://back-bonte.anti-flow.com/api/v1/catalog/'
				)
				setCategoryLink(response.data[0].slug)
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			}
		}

		fetchData()
	}, [])

	return (
		<nav className='navigation'>
			<a
				href='#main'
				className={`navigation__link ${activeLink === 'main' ? 'active' : ''}`}
				onClick={e => handleLinkClick(e, 'main')}
			>
				ГЛАВНАЯ
			</a>

			<NavLink
				to={`/catalog/${categoryLink}`}
				className={`navigation__link ${
					activeLink === 'catalog' ? 'active' : ''
				}`}
			>
				КАТАЛОГ
			</NavLink>

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
					href='https://wa.me/+996999223395'
					className={`navigation__link ${
						activeLink === 'contact-us' ? 'active' : ''
					}`}
					target='_blank'
					rel='noopener noreferrer'
				>
					СВЯЗАТЬСЯ С НАМИ
				</a>
			)}
		</nav>
	)
}
