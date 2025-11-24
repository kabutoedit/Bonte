// import { useState, useEffect } from 'react'
// import './LeftNavBar.scss'
// import { NavLink, useNavigate } from 'react-router-dom'

// type Subcategory = string

// interface Category {
// 	id: number
// 	name: string
// 	subcategories: Subcategory[]
// }

// const MOCK_CATEGORIES_DATA: Category[] = [
// 	{
// 		id: 1,
// 		name: 'Молочная продукция',
// 		subcategories: [
// 			'Заквасочные культуры',
// 			'Стабилизаторы',
// 			'Ароматизаторы',
// 			'Консерванты',
// 			'Ферменты',
// 			'Заменитель молочного жира',
// 			'СОМ',
// 			'Сыворотка',
// 		],
// 	},
// 	{
// 		id: 2,
// 		name: 'Специализированные жиры',
// 		subcategories: [
// 			'Заквасочные культурыs',
// 			'Стабилизаторы',
// 			'Ароматизаторы',
// 			'Консерванты',
// 			'Ферменты',
// 			'Заменитель молочного жира',
// 			'СОМ',
// 			'Сыворотка',
// 		],
// 	},
// 	{ id: 3, name: 'Ногеса', subcategories: [] },
// 	{ id: 4, name: 'Пищевая химия', subcategories: [] },
// 	{ id: 5, name: 'Хлебобулочные изделия', subcategories: [] },
// 	{ id: 6, name: 'Кондитерские изделия', subcategories: [] },
// ]

// export default function LeftNavBar() {
// 	const [categories, setCategories] = useState<Category[]>([])
// 	const [openCategories, setOpenCategories] = useState<Set<number>>(new Set())

// 	const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
// 		null
// 	)

// 	const navigate = useNavigate()

// 	useEffect(() => {
// 		const fetchCategories = async () => {
// 			setCategories(MOCK_CATEGORIES_DATA)
// 		}
// 		fetchCategories()
// 	}, [])

// 	const toggleCategory = (categoryId: number): void => {
// 		const isCurrentlyOpen = openCategories.has(categoryId)

// 		setActiveSubcategory(null)

// 		setOpenCategories(prev => {
// 			if (isCurrentlyOpen) {
// 				return new Set()
// 			} else {
// 				return new Set([categoryId])
// 			}
// 		})
// 	}

// 	const isCategoryOpen = (categoryId: number): boolean => {
// 		return openCategories.has(categoryId)
// 	}

// 	const handleSubcategoryClick = (subcategoryName: string): void => {
// 		const subcategorySlug = subcategoryName.toLowerCase().replace(/\s+/g, '-')
// 		const targetPath = `/catalog/${subcategorySlug}`

// 		setActiveSubcategory(
// 			activeSubcategory === subcategoryName ? null : subcategoryName
// 		)

// 		if (activeSubcategory !== subcategoryName) {
// 			navigate(targetPath)
// 		}
// 	}

// 	return (
// 		<nav className='leftNavBar'>
// 			{categories.length === 0 ? (
// 				<div className='loading'>Загрузка категорий...</div>
// 			) : (
// 				categories.map(category => {
// 					const hasSubcategories = category.subcategories.length > 0
// 					const isOpen = isCategoryOpen(category.id)

// 					const isCategoryActive =
// 						isOpen || category.subcategories.includes(activeSubcategory || '')

// 					return (
// 						<div key={category.id} className='category-item'>
// 							<div
// 								className={`category-header ${
// 									isCategoryActive ? 'active' : ''
// 								} ${hasSubcategories ? 'has-children' : ''}`}
// 								onClick={() => toggleCategory(category.id)}
// 							>
// 								<span className='category-name'>{category.name}</span>
// 							</div>

// 							{hasSubcategories && (
// 								<div className={`subcategories-list ${isOpen ? 'open' : ''}`}>
// 									{category.subcategories.map(subcategory => {
// 										const isSubActive = subcategory === activeSubcategory

// 										const subcategorySlug = subcategory
// 											.toLowerCase()
// 											.replace(/\s+/g, '-')
// 										const targetPath = `/catalog/${subcategorySlug}`

// 										return (
// 											<NavLink
// 												key={subcategory}
// 												to={targetPath}
// 												className={`subcategory-item ${
// 													isSubActive ? 'active' : ''
// 												}`}
// 												onClick={() => handleSubcategoryClick(subcategory)}
// 											>
// 												{subcategory}
// 											</NavLink>
// 										)
// 									})}
// 								</div>
// 							)}
// 						</div>
// 					)
// 				})
// 			)}
// 		</nav>
// 	)
// }

import { useState, useEffect } from 'react'
import './LeftNavBar.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import SubCategotyCard from '../subCategoryCard/SubCategoryCard'

interface SubCategory {
	name: string
	to: string
}

interface Category {
	id: number
	name: string
	subcategories: SubCategory[]
}

const createSubcategoryObject = (name: string): SubCategory => {
	const slug = name.toLowerCase().replace(/\s+/g, '-')
	return {
		name: name,
		to: `/catalog/${slug}`,
	}
}

const MOCK_CATEGORIES_DATA: Category[] = [
	{
		id: 1,
		name: 'Молочная продукция',
		subcategories: [
			createSubcategoryObject('Заквасочные культуры'),
			createSubcategoryObject('Стабилизаторы'),
			createSubcategoryObject('Ароматизаторы'),
			createSubcategoryObject('Консерванты'),
			createSubcategoryObject('Ферменты'),
			createSubcategoryObject('Заменитель молочного жира'),
			createSubcategoryObject('СОМ'),
			createSubcategoryObject('Сыворотка'),
		],
	},
	{
		id: 2,
		name: 'Специализированные жиры',
		subcategories: [
			createSubcategoryObject('Заквасочные культурыs'),
			createSubcategoryObject('Стабилизаторы'),
			createSubcategoryObject('Ароматизаторы'),
			createSubcategoryObject('Консерванты'),
			createSubcategoryObject('Ферменты'),
			createSubcategoryObject('Заменитель молочного жира'),
			createSubcategoryObject('СОМ'),
			createSubcategoryObject('Сыворотка'),
		],
	},
	{ id: 3, name: 'Ногеса', subcategories: [] },
	{ id: 4, name: 'Пищевая химия', subcategories: [] },
	{ id: 5, name: 'Хлебобулочные изделия', subcategories: [] },
	{ id: 6, name: 'Кондитерские изделия', subcategories: [] },
]

export default function LeftNavBar() {
	const [categories, setCategories] = useState<Category[]>([])
	const [openCategories, setOpenCategories] = useState<Set<number>>(new Set())

	const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
		null
	)

	const navigate = useNavigate()

	useEffect(() => {
		const fetchCategories = async () => {
			setCategories(MOCK_CATEGORIES_DATA)
		}
		fetchCategories()
	}, [])

	const toggleCategory = (categoryId: number): void => {
		const isCurrentlyOpen = openCategories.has(categoryId)

		setActiveSubcategory(null)

		setOpenCategories(prev => {
			if (isCurrentlyOpen) {
				return new Set()
			} else {
				return new Set([categoryId])
			}
		})
	}

	const isCategoryOpen = (categoryId: number): boolean => {
		return openCategories.has(categoryId)
	}

	const handleSubcategoryClick = (subcategory: SubCategory): void => {
		setActiveSubcategory(
			activeSubcategory === subcategory.name ? null : subcategory.name
		)

		if (activeSubcategory !== subcategory.name) {
			navigate(subcategory.to)
		} else {
			navigate('/catalog')
		}
	}

	return (
		<nav className='leftNavBar'>
			{categories.length === 0 ? (
				<div className='loading'>Загрузка категорий...</div>
			) : (
				categories.map(category => {
					const hasSubcategories = category.subcategories.length > 0
					const isOpen = isCategoryOpen(category.id)

					const isCategoryActive =
						isOpen ||
						category.subcategories.some(sub => sub.name === activeSubcategory)

					return (
						<div key={category.id} className='category-item'>
							<div
								className={`category-header ${
									isCategoryActive ? 'active' : ''
								} ${hasSubcategories ? 'has-children' : ''}`}
								onClick={() => toggleCategory(category.id)}
							>
								<span className='category-name'>{category.name}</span>
							</div>

							{hasSubcategories && (
								<div className={`subcategories-list ${isOpen ? 'open' : ''}`}>
									{category.subcategories.map(subcategory => {
										const isSubActive = subcategory.name === activeSubcategory

										return (
											<NavLink
												key={subcategory.name}
												to={subcategory.to}
												className={`subcategory-item ${
													isSubActive ? 'active' : ''
												}`}
												onClick={() => handleSubcategoryClick(subcategory)}
											>
												{subcategory.name}
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
