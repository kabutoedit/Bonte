import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './widgets/header/Header'
import Home from './pages/home/Home'
import Category from './pages/category/Category'
import SubCategory from './pages/subCategory/SubCategory'
import ProductPage from './pages/product/Product'

function HeaderWrapper() {
	const location = useLocation()
	return <Header isHome={location.pathname === '/'} />
}

function App() {
	return (
		<BrowserRouter>
			<HeaderWrapper />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/category/:categoryId' element={<Category />} />
				<Route
					path='/category/:categoryId/sub/:subId'
					element={<SubCategory />}
				/>
				<Route
					path='/category/:categoryId/sub/:subId/product/:productId'
					element={<ProductPage />}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
