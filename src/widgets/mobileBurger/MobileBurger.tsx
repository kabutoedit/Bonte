import Navigation from '../navigation/Navigation'
import { useEffect } from 'react'
import './MobileBurger.scss'

export default function MobileBurger() {
	useEffect(() => {
		document.body.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [])
	return (
		<div className='MobileBurger'>
			<Navigation />
		</div>
	)
}
