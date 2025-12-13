import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SubCategory from '../products/Products'
import ProductsPage from '../subCategory/SubCategory'
import { ProductsType } from '../../types'
import Catalog404 from '../../widgets/catalog404/Catalog404'

interface Data {
	children: ProductsType[]
	category: ProductsType
}

export default function CatalogPage() {
	const { slug } = useParams()
	const [data, setData] = useState<Data | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<any>(null)

	const [subCategoryData, setSubCategoryData] = useState<ProductsType>()

	useEffect(() => {
		async function load() {
			setLoading(true)
			try {
				const url = slug
					? `https://back-bonte.anti-flow.com/api/v1/catalog/page/${slug}/`
					: 'https://back-bonte.anti-flow.com/api/v1/catalog/'

				const res = await axios.get(url)
				setData(res.data)
				setSubCategoryData(res.data.category)
			} catch (error) {
				setError(error)
			} finally {
				setLoading(false)
			}
		}

		load()
	}, [slug])

	if (loading) return <>Загрузка...</>
	if (error) return <Catalog404 />

	if (data && data.category && (data.category as any).parent !== null)
		return (
			<SubCategory
				products={data.children}
				subCategoryData={subCategoryData as ProductsType}
			/>
		)

	if (data && data.category && (data.category as any).parent === null)
		return <ProductsPage subCategories={data.children} />

	return null
}

// import { useParams } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import SubCategory from '../products/Products'
// import ProductsPage from '../subCategory/SubCategory'
// import { ProductsType } from '../../types'
// import Catalog404 from '../../widgets/catalog404/Catalog404'

// interface Data {
// 	children: ProductsType[]
// 	category: ProductsType
// }

// const fetchCatalogData = async (slug?: string): Promise<Data> => {
// 	const url = slug
// 		? `https://back-bonte.anti-flow.com/api/v1/catalog/page/${slug}/`
// 		: 'https://back-bonte.anti-flow.com/api/v1/catalog/'

// 	const { data } = await axios.get(url)
// 	return data
// }

// export default function CatalogPage() {
// 	const { slug } = useParams()

// 	const { data, isLoading, isFetching, error, isError } = useQuery({
// 		queryKey: ['catalog', slug],
// 		queryFn: () => fetchCatalogData(slug),
// 		staleTime: 5 * 60 * 1000,
// 		retry: 2,
// 		enabled: true,
// 	})

// 	const subCategoryData = data?.category

// 	if (isLoading) return <>Загрузка...</>
// 	if (isError) return <Catalog404 />

// 	if (data && data.category && (data.category as any).parent !== null)
// 		return (
// 			<SubCategory
// 				products={data.children}
// 				subCategoryData={subCategoryData as ProductsType}
// 			/>
// 		)

// 	if (data && data.category && (data.category as any).parent === null)
// 		return <ProductsPage subCategories={data.children} />

// 	return null
// }
