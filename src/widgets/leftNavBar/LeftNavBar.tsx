import { useState, useEffect } from 'react'
import './LeftNavBar.scss'
import { NavLink, useLocation } from 'react-router-dom'
import axios from 'axios'

interface Category {
	id: number
	title: string
	slug: string
	description?: string
	image?: string
	in_stock: boolean
	on_order: boolean
}

export default function LeftNavBar() {
	const [categories, setCategories] = useState<Category[]>([])
	const [subCategories, setSubCategories] = useState<{
		[key: number]: Category[]
	}>({})
	const [openCategories, setOpenCategories] = useState<Set<number>>(new Set())
	const [loading, setLoading] = useState(true)
	const location = useLocation()

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true)
				const response = await axios.get(
					'https://back-bonte.anti-flow.com/api/v1/catalog/'
				)
				setCategories(response.data)
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	useEffect(() => {
		const currentPath = location.pathname

		categories.forEach(async category => {
			if (currentPath === `/catalog/${category.slug}`) {
				return
			}

			let categorySubcategories = subCategories[category.id] || []

			if (categorySubcategories.length === 0) {
				try {
					const response = await axios.get(
						`https://back-bonte.anti-flow.com/api/v1/catalog/page/${category.slug}/`
					)
					categorySubcategories = response.data.children || []

					setSubCategories(prev => ({
						...prev,
						[category.id]: categorySubcategories,
					}))
				} catch (error) {
					console.error('Ошибка при авто-загрузке подкатегорий:', error)
					return
				}
			}

			const hasActiveSubcategory = categorySubcategories.some(
				sub => `/catalog/${sub.slug}` === currentPath
			)

			if (hasActiveSubcategory && !openCategories.has(category.id)) {
				setOpenCategories(prev => new Set([...prev, category.id]))
			}
		})
	}, [location.pathname, categories])

	const fetchSubcategories = async (
		categoryId: number,
		categorySlug: string
	) => {
		if (subCategories[categoryId]) return

		try {
			const response = await axios.get(
				`https://back-bonte.anti-flow.com/api/v1/catalog/page/${categorySlug}/`
			)
			setSubCategories(prev => ({
				...prev,
				[categoryId]: response.data.children || [],
			}))
		} catch (error) {
			console.error('Ошибка при получении подкатегорий:', error)
		}
	}

	const toggleCategory = (categoryId: number, categorySlug: string): void => {
		const isCurrentlyOpen = openCategories.has(categoryId)

		if (!isCurrentlyOpen) {
			fetchSubcategories(categoryId, categorySlug)
			setOpenCategories(prev => new Set([...prev, categoryId]))
		} else {
			setOpenCategories(prev => {
				const newSet = new Set(prev)
				newSet.delete(categoryId)
				return newSet
			})
		}
	}

	const isCategoryOpen = (categoryId: number): boolean => {
		return openCategories.has(categoryId)
	}

	const isCategoryOrSubcategoryActive = (
		categorySlug: string,
		categoryId: number
	) => {
		const currentPath = location.pathname

		if (currentPath === `/catalog/${categorySlug}`) {
			return true
		}

		const categorySubcategories = subCategories[categoryId] || []
		const hasActiveSubcategory = categorySubcategories.some(
			sub => `/catalog/${sub.slug}` === currentPath
		)

		return hasActiveSubcategory
	}

	if (loading) {
		return (
			<nav className='leftNavBar'>
				<div className='loading'>Загрузка категорий...</div>
			</nav>
		)
	}

	return (
		<nav className='leftNavBar'>
			{categories.length === 0 ? (
				<div className='loading'>Категории не найдены</div>
			) : (
				categories.map(category => {
					const categorySubcategories = subCategories[category.id] || []
					const isOpen = isCategoryOpen(category.id)

					return (
						<div key={category.id} className='category-item'>
							<NavLink
								to={`/catalog/${category.slug}`}
								className={({ isActive: isNavLinkActive }) =>
									`category-header ${
										isNavLinkActive ||
										isCategoryOrSubcategoryActive(category.slug, category.id)
											? 'active'
											: ''
									}`
								}
								onClick={() => toggleCategory(category.id, category.slug)}
							>
								<div className='category-name'>{category.title}</div>
							</NavLink>

							{categorySubcategories.length > 0 && (
								<div className={`subcategories-list ${isOpen ? 'open' : ''}`}>
									{categorySubcategories.map(subcategory => (
										<NavLink
											key={subcategory.id}
											to={`/catalog/${subcategory.slug}`}
											className='subcategory-item'
										>
											{subcategory.title}
										</NavLink>
									))}
								</div>
							)}
						</div>
					)
				})
			)}
		</nav>
	)
}
