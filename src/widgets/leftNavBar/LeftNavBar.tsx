import { useEffect, useRef, useState } from 'react'
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

type SubCategoriesMap = {
	[key: number]: Category[]
}

interface CachedPage {
	id?: number
	slug: string
	children: Category[]
}

const getSlugFromPath = (path: string) => {
	const m = path.match(/^\/catalog\/([^/]+)/)
	return m ? m[1] : null
}

export default function LeftNavBar() {
	const [categories, setCategories] = useState<Category[]>([])
	const [subCategories, setSubCategories] = useState<SubCategoriesMap>({})
	const [openCategories, setOpenCategories] = useState<Set<number>>(new Set())
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
		null
	)
	const [loading, setLoading] = useState(true)
	const [isMobile, setIsMobile] = useState(false)
	const location = useLocation()

	const fetchCacheRef = useRef<Record<string, CachedPage>>({})
	const latestRequestIdRef = useRef(0)
	const isMountedRef = useRef(true)

	useEffect(() => {
		isMountedRef.current = true
		return () => {
			isMountedRef.current = false
		}
	}, [])

	useEffect(() => {
		const checkScreenSize = () => setIsMobile(window.innerWidth <= 450)
		checkScreenSize()
		window.addEventListener('resize', checkScreenSize)
		return () => window.removeEventListener('resize', checkScreenSize)
	}, [])

	useEffect(() => {
		let cancelled = false
		const fetchData = async () => {
			try {
				setLoading(true)
				const response = await axios.get(
					'https://back-bonte.anti-flow.com/api/v1/catalog/'
				)
				if (cancelled) return
				const data: Category[] = response.data || []
				setCategories(data)
				if (data.length > 0)
					setSelectedCategoryId(prev => (prev == null ? data[0].id : prev))
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			} finally {
				if (!cancelled) setLoading(false)
			}
		}
		fetchData()
		return () => {
			cancelled = true
		}
	}, [])

	const fetchPage = async (slug: string): Promise<CachedPage> => {
		if (fetchCacheRef.current[slug]) return fetchCacheRef.current[slug]
		const requestId = ++latestRequestIdRef.current
		try {
			const response = await axios.get(
				`https://back-bonte.anti-flow.com/api/v1/catalog/page/${slug}/`
			)
			const data = response.data || {}
			const children = Array.isArray(data.children) ? data.children : []
			const saved: CachedPage = {
				id: data.id ?? undefined,
				slug: data.slug ?? slug,
				children,
			}
			fetchCacheRef.current[slug] = saved
			return saved
		} catch {
			const empty: CachedPage = { id: undefined, slug, children: [] }
			fetchCacheRef.current[slug] = empty
			return empty
		}
	}

	const ensureCategorySubcategories = async (
		categoryId: number,
		categorySlug: string
	) => {
		if (subCategories[categoryId]?.length) return subCategories[categoryId]
		const page = await fetchPage(categorySlug)
		setSubCategories(prev => ({ ...prev, [categoryId]: page.children || [] }))
		return page.children || []
	}

	const toggleCategory = (categoryId: number, categorySlug: string) => {
		const isOpen = openCategories.has(categoryId)
		if (!isOpen) {
			ensureCategorySubcategories(categoryId, categorySlug)
			setOpenCategories(prev => new Set([...prev, categoryId]))
		} else {
			setOpenCategories(prev => {
				const s = new Set(prev)
				s.delete(categoryId)
				return s
			})
		}
	}

	const isCategoryOpen = (categoryId: number) => openCategories.has(categoryId)

	const isActiveSlugRecursive = (
		candidateSlug: string,
		currentSlug: string
	): boolean => {
		if (!candidateSlug) return false
		if (candidateSlug === currentSlug) return true
		const category = categories.find(c => c.slug === candidateSlug)
		if (category) {
			const kids = subCategories[category.id] || []
			if (kids.some(k => k.slug === currentSlug)) return true
			for (const kid of kids) {
				const cached = fetchCacheRef.current[kid.slug]
				if (cached?.children?.some(ch => ch.slug === currentSlug)) return true
			}
		}
		const cachedRoot = fetchCacheRef.current[candidateSlug]
		if (cachedRoot?.children?.length) {
			for (const ch of cachedRoot.children) {
				if (ch.slug === currentSlug) return true
				const cachedChild = fetchCacheRef.current[ch.slug]
				if (cachedChild?.children?.some(cc => cc.slug === currentSlug))
					return true
			}
		}
		return false
	}

	useEffect(() => {
		let cancelled = false
		const currentPath = location.pathname
		const currentSlug = getSlugFromPath(currentPath)
		if (!currentSlug) return
		;(async () => {
			let foundParentId: number | null = null
			const directParent = categories.find(
				cat => `/catalog/${cat.slug}` === currentPath
			)
			if (directParent) {
				foundParentId = directParent.id
			} else {
				await Promise.all(
					categories.map(async category => {
						if (cancelled || foundParentId != null) return
						const categorySubs = await ensureCategorySubcategories(
							category.id,
							category.slug
						)
						if (categorySubs.some(s => s.slug === currentSlug)) {
							foundParentId = category.id
							return
						}
						const results = await Promise.all(
							categorySubs.map(async sub => {
								const page = await fetchPage(sub.slug)
								return page.children || []
							})
						)
						for (const chArray of results) {
							if (chArray.some(ch => ch.slug === currentSlug)) {
								foundParentId = category.id
								break
							}
						}
					})
				)
			}
			if (cancelled) return
			if (foundParentId != null) {
				setSelectedCategoryId(prev =>
					prev === foundParentId ? prev : foundParentId
				)
				setOpenCategories(prev =>
					prev.has(foundParentId!) ? prev : new Set([...prev, foundParentId!])
				)
			}
		})()
		return () => {
			cancelled = true
		}
	}, [location.pathname, categories])

	const isCategoryOrSubcategoryActive = (
		categorySlug: string,
		categoryId: number
	) => {
		const currentPath = location.pathname
		if (currentPath.startsWith(`/catalog/${categorySlug}`)) return true
		const categorySubs = subCategories[categoryId] || []
		for (const sub of categorySubs) {
			const cached = fetchCacheRef.current[sub.slug]
			if (
				currentPath.startsWith(`/catalog/${sub.slug}`) ||
				cached?.children?.some(child =>
					currentPath.startsWith(`/catalog/${child.slug}`)
				)
			)
				return true
		}
		return isActiveSlugRecursive(
			categorySlug,
			getSlugFromPath(currentPath) || ''
		)
	}

	if (loading)
		return (
			<nav className='leftNavBar'>
				<div className='loading'>Загрузка категорий...</div>
			</nav>
		)

	if (isMobile) {
		const selectedCategory = categories.find(
			cat => cat.id === selectedCategoryId
		)
		const selectedSubcategories = selectedCategory
			? subCategories[selectedCategory.id] || []
			: []
		return (
			<nav className='mobile-navbar'>
				<div className='mobile-categories-scroll'>
					{categories.map(category => (
						<NavLink
							key={category.id}
							to={`/catalog/${category.slug}`}
							className={() =>
								`category-header ${
									isCategoryOrSubcategoryActive(category.slug, category.id)
										? 'active'
										: ''
								}`
							}
							onClick={() => toggleCategory(category.id, category.slug)}
						>
							{category.title}
						</NavLink>
					))}
				</div>
				{selectedSubcategories.length > 0 && (
					<div className='mobile-subcategories-scroll'>
						{selectedSubcategories.map(sub => {
							const cached = fetchCacheRef.current[sub.slug]
							const isActiveSub =
								location.pathname.startsWith(`/catalog/${sub.slug}`) ||
								cached?.children?.some(ch =>
									location.pathname.startsWith(`/catalog/${ch.slug}`)
								)
							return (
								<NavLink
									key={sub.id}
									to={`/catalog/${sub.slug}`}
									className={`mobile-subcategory-btn ${
										isActiveSub ? 'active' : ''
									}`}
								>
									{sub.title}
								</NavLink>
							)
						})}
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
					const categorySubs = subCategories[category.id] || []
					const isOpen = isCategoryOpen(category.id)
					return (
						<div key={category.id} className='category-item'>
							<NavLink
								to={`/catalog/${category.slug}`}
								className={() =>
									`category-header ${
										isCategoryOrSubcategoryActive(category.slug, category.id)
											? 'active'
											: ''
									}`
								}
								onClick={() => toggleCategory(category.id, category.slug)}
							>
								<div className='category-name'>{category.title}</div>
							</NavLink>
							{categorySubs.length > 0 && (
								<div className={`subcategories-list ${isOpen ? 'open' : ''}`}>
									{categorySubs.map(sub => {
										const cached = fetchCacheRef.current[sub.slug]
										const isActiveSub =
											location.pathname.startsWith(`/catalog/${sub.slug}`) ||
											cached?.children?.some(ch =>
												location.pathname.startsWith(`/catalog/${ch.slug}`)
											)
										return (
											<NavLink
												key={sub.id}
												to={`/catalog/${sub.slug}`}
												className={`subcategory-item ${
													isActiveSub ? 'active' : ''
												}`}
											>
												{sub.title}
											</NavLink>
										)
									})}
								</div>
							)}
						</div>
					)
				})
			)}
		</nav>
	)
}
