import { useState, useEffect, useCallback, useMemo } from 'react'
import './LeftNavBar.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Category {
	id: number
	title: string
	slug: string
	description?: string
	image?: string
	in_stock: boolean
	on_order: boolean
	parent: number | null
}

interface PageData {
	id: number
	slug: string
	children: Category[]
}

const getSlugFromPath = (path: string): string | null => {
	const match = path.match(/^\/catalog\/([^/]+)/)
	return match ? match[1] : null
}

const fetchCategories = async (): Promise<Category[]> => {
	const { data } = await axios.get(
		'https://back-bonte.anti-flow.com/api/v1/catalog/'
	)
	return data || []
}

const fetchPage = async (slug: string): Promise<PageData> => {
	const { data } = await axios.get(
		`https://back-bonte.anti-flow.com/api/v1/catalog/page/${slug}/`
	)
	return {
		id: data.id,
		slug: data.slug || slug,
		children: data.children || [],
	}
}

const fetchAllPages = async (
	categories: Category[]
): Promise<Record<string, PageData>> => {
	const pages: Record<string, PageData> = {}

	const promises = categories.map(async category => {
		try {
			const pageData = await fetchPage(category.slug)
			pages[category.slug] = pageData

			const subPromises = pageData.children.map(async subCategory => {
				try {
					const subPageData = await fetchPage(subCategory.slug)
					pages[subCategory.slug] = subPageData
				} catch {
					pages[subCategory.slug] = {
						id: subCategory.id,
						slug: subCategory.slug,
						children: [],
					}
				}
			})

			await Promise.all(subPromises)
		} catch {
			pages[category.slug] = {
				id: category.id,
				slug: category.slug,
				children: [],
			}
		}
	})

	await Promise.all(promises)
	return pages
}

export default function LeftNavBar() {
	const location = useLocation()
	const currentPath = location.pathname
	const currentSlug = getSlugFromPath(currentPath)

	const { data: categories = [], isLoading: categoriesLoading } = useQuery({
		queryKey: ['navCategories'],
		queryFn: fetchCategories,
		staleTime: 10 * 60 * 1000,
	})

	const { data: allPages = {}, isLoading: pagesLoading } = useQuery({
		queryKey: ['allCategoryPages', categories.length],
		queryFn: () => fetchAllPages(categories),
		enabled: categories.length > 0,
		staleTime: 10 * 60 * 1000,
	})

	const [openCategories, setOpenCategories] = useState<Set<number>>(new Set())
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkScreenSize = () => setIsMobile(window.innerWidth <= 450)
		checkScreenSize()
		window.addEventListener('resize', checkScreenSize)
		return () => window.removeEventListener('resize', checkScreenSize)
	}, [])

	useEffect(() => {
		if (!currentSlug || !categories.length || !allPages) return

		const findAndOpenParentCategory = () => {
			const directParent = categories.find(cat => cat.slug === currentSlug)
			if (directParent) {
				setOpenCategories(prev => new Set([...prev, directParent.id]))
				return
			}

			for (const category of categories) {
				const page = allPages[category.slug]
				if (!page) continue

				if (page.children.some(child => child.slug === currentSlug)) {
					setOpenCategories(prev => new Set([...prev, category.id]))
					return
				}

				for (const child of page.children) {
					const childPage = allPages[child.slug]
					if (
						childPage?.children?.some(subChild => subChild.slug === currentSlug)
					) {
						setOpenCategories(prev => new Set([...prev, category.id]))
						return
					}
				}
			}
		}

		findAndOpenParentCategory()
	}, [currentSlug, categories, allPages])

	const isCategoryOrSubcategoryActive = useCallback(
		(categorySlug: string): boolean => {
			if (!currentSlug) return false

			if (categorySlug === currentSlug) return true

			const categoryPage = allPages[categorySlug]
			if (!categoryPage) return false

			if (currentSlug.startsWith(categorySlug + '/')) return true

			for (const sub of categoryPage.children) {
				if (sub.slug === currentSlug) return true
				if (currentSlug.startsWith(sub.slug + '/')) return true

				const subPage = allPages[sub.slug]
				if (
					subPage?.children?.some(child => {
						if (child.slug === currentSlug) return true
						return currentSlug.startsWith(child.slug + '/')
					})
				) {
					return true
				}
			}

			return false
		},
		[currentSlug, allPages]
	)

	const isSubCategoryActive = useCallback(
		(subCategorySlug: string): boolean => {
			if (!currentSlug) return false

			if (subCategorySlug === currentSlug) return true

			if (currentSlug.startsWith(subCategorySlug + '/')) return true

			const subPage = allPages[subCategorySlug]
			if (
				subPage?.children?.some(child => {
					if (child.slug === currentSlug) return true
					return currentSlug.startsWith(child.slug + '/')
				})
			) {
				return true
			}

			return false
		},
		[currentSlug, allPages]
	)

	const toggleCategory = useCallback(
		(categoryId: number, e?: React.MouseEvent) => {
			if (e) {
				e.preventDefault()
				e.stopPropagation()
			}

			setOpenCategories(prev => {
				const newSet = new Set(prev)
				if (newSet.has(categoryId)) {
					newSet.delete(categoryId)
				} else {
					newSet.add(categoryId)
				}
				return newSet
			})
		},
		[]
	)

	const isCategoryOpen = (categoryId: number) => openCategories.has(categoryId)

	const selectedCategoryId = useMemo(() => {
		if (!currentSlug || !categories.length) return null

		for (const category of categories) {
			if (isCategoryOrSubcategoryActive(category.slug)) {
				return category.id
			}
		}

		return categories[0]?.id || null
	}, [currentSlug, categories, isCategoryOrSubcategoryActive])

	const selectedSubcategories = useMemo(() => {
		if (!selectedCategoryId) return []
		const category = categories.find(c => c.id === selectedCategoryId)
		if (!category) return []
		return allPages[category.slug]?.children || []
	}, [selectedCategoryId, categories, allPages])

	const isLoading = categoriesLoading || pagesLoading

	if (isLoading) {
		return (
			<nav className='leftNavBar'>
				<div className='loading'>Загрузка категорий...</div>
			</nav>
		)
	}

	if (isMobile) {
		return (
			<nav className='mobile-navbar'>
				<div className='mobile-categories-scroll'>
					{categories.map(category => {
						const isActive = isCategoryOrSubcategoryActive(category.slug)
						return (
							<NavLink
								key={category.id}
								to={`/catalog/${category.slug}`}
								className={() => `category-header ${isActive ? 'active' : ''}`}
								onClick={e => {
									if (isActive && currentSlug === category.slug) {
										e.preventDefault()
										toggleCategory(category.id, e)
									}
								}}
							>
								{category.title}
							</NavLink>
						)
					})}
				</div>

				{selectedSubcategories.length > 0 && (
					<div className='mobile-subcategories-scroll'>
						{selectedSubcategories.map(sub => (
							<NavLink
								key={sub.id}
								to={`/catalog/${sub.slug}`}
								className={`mobile-subcategory-btn ${
									isSubCategoryActive(sub.slug) ? 'active' : ''
								}`}
							>
								{sub.title}
							</NavLink>
						))}
					</div>
				)}
			</nav>
		)
	}

	return (
		<nav className='leftNavBar'>
			{categories.length === 0 ? (
				<div className='loading'>Категории не найдены</div>
			) : (
				categories.map(category => {
					const isOpen = isCategoryOpen(category.id)
					const pageData = allPages[category.slug]
					const subcategories = pageData?.children || []
					const isActive = isCategoryOrSubcategoryActive(category.slug)

					return (
						<div key={category.id} className='category-item'>
							<NavLink
								to={`/catalog/${category.slug}`}
								className={() => `category-header ${isActive ? 'active' : ''}`}
								onClick={e => {
									if (isActive && currentSlug === category.slug) {
										e.preventDefault()
										toggleCategory(category.id, e)
									}
								}}
							>
								<div className='category-name'>{category.title}</div>
							</NavLink>

							{subcategories.length > 0 && (
								<div className={`subcategories-list ${isOpen ? 'open' : ''}`}>
									{subcategories.map(sub => (
										<NavLink
											key={sub.id}
											to={`/catalog/${sub.slug}`}
											className={`subcategory-item ${
												isSubCategoryActive(sub.slug) ? 'active' : ''
											}`}
										>
											{sub.title}
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
