// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
// import Home from './pages/home/Home'
// import CatalogPage from './pages/catalogPage/CatalogPage'
// import Header from './widgets/header/Header'
// import Page404 from './pages/page404/Page404'

// export default function App() {
// 	function HeaderWrapper() {
// 		const location = useLocation()

// 		if (location.pathname === '*') {
// 			return null
// 		}
// 		return <Header isHome={location.pathname === '/'} />
// 	}

// 	return (
// 		<BrowserRouter>
// 			<HeaderWrapper />
// 			<Routes>
// 				<Route path='/' element={<Home />} />
// 				<Route path='/catalog/' element={<CatalogPage />} />
// 				<Route path='/catalog/:slug' element={<CatalogPage />} />
// 				<Route path='*' element={<Page404 />} />
// 			</Routes>
// 		</BrowserRouter>
// 	)
// }

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/home/Home'
import CatalogPage from './pages/catalogPage/CatalogPage'
import Header from './widgets/header/Header'
import Page404 from './pages/page404/Page404'

export default function App() {
	function HeaderWrapper() {
		const location = useLocation()

		const existingRoutes = ['/', '/catalog/', '/catalog/:slug']

		const isExistingRoute = existingRoutes.some(route => {
			if (route.includes(':')) {
				const basePath = route.split('/:')[0]
				return location.pathname.startsWith(basePath)
			}
			return route === location.pathname
		})

		if (!isExistingRoute) {
			return null
		}

		return <Header isHome={location.pathname === '/'} />
	}

	return (
		<BrowserRouter>
			<HeaderWrapper />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/catalog/' element={<CatalogPage />} />
				<Route path='/catalog/:slug' element={<CatalogPage />} />
				<Route path='*' element={<Page404 />} />
			</Routes>
		</BrowserRouter>
	)
}
