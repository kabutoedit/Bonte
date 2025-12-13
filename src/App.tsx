import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/home/Home'
import CatalogPage from './pages/catalogPage/CatalogPage'
import Header from './widgets/header/Header'
import Page404 from './pages/page404/Page404'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			gcTime: 10 * 60 * 1000,
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
})

function RouterWithHeader() {
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
		<>
			<HeaderWrapper />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/catalog/' element={<CatalogPage />} />
				<Route path='/catalog/:slug' element={<CatalogPage />} />
				<Route path='*' element={<Page404 />} />
			</Routes>
		</>
	)
}

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<RouterWithHeader />
			</BrowserRouter>
		</QueryClientProvider>
	)
}
