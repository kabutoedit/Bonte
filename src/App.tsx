import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './widgets/header/Header'
import Home from './pages/home/Home'
import Catalog from './pages/catalog/Catalog'
import About from './pages/about/About'
import Contacts from './pages/contacts/Contacts'
import './App.css'

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/catalog' element={<Catalog />} />
				<Route path='/about' element={<About />} />
				<Route path='/contacts' element={<Contacts />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
