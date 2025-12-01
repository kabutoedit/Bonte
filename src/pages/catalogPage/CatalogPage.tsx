import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SubCategory from '../products/Products'
import ProductsPage from '../subCategory./SubCategory'
import { ProductsType } from '../../types'

interface Data {
	children: ProductsType[]
	category: ProductsType
}

export default function CatalogPage() {
	const { slug } = useParams()
	const [data, setData] = useState<Data | null>(null)
	const [loading, setLoading] = useState(true)

	const [subCategoryData, setSubCategoryData] = useState<ProductsType[]>([])

	useEffect(() => {
		async function load() {
			setLoading(true)
			try {
				const url = slug
					? `https://back-bonte.anti-flow.com/api/v1/catalog/page/${slug}/`
					: 'https://back-bonte.anti-flow.com/api/v1/catalog/'

				const res = await axios.get(url)
				setData(res.data)
				setSubCategoryData([res.data.category, ...res.data.children])
			} catch (error) {
				console.error('Ошибка загрузки:', error)
			} finally {
				setLoading(false)
			}
		}

		load()
	}, [slug])

	if (loading) return <>Загрузка...</>

	if (data && data.category && (data.category as any).parent !== null)
		return <SubCategory products={subCategoryData} />

	if (data && data.category && (data.category as any).parent === null)
		return <ProductsPage subCategories={data.children} />

	return null
}
