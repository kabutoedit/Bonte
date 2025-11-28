import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Category from '../category/Category'
import SubCategory from '../products/Products'
import ProductsPage from '../subCategory./SubCategory'
import { ProductsType } from '../../types'

interface Data {
	children: ProductsType[]
	category: ProductsType[]
}

export default function CatalogPage() {
	const { slug } = useParams()
	const [data, setData] = useState<Data | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function load() {
			setLoading(true)
			try {
				const url = slug
					? `https://back-bonte.anti-flow.com/api/v1/catalog/page/${slug}/`
					: 'https://back-bonte.anti-flow.com/api/v1/catalog/'

				const res = await axios.get(url)
				setData(res.data)
			} catch (error) {
				console.error('Ошибка загрузки:', error)
			} finally {
				setLoading(false)
			}
		}

		load()
	}, [slug])

	if (loading) return <>Загрузка...</>

	// if (!slug) {
	// 	return <Category categories={data || []} />
	// }

	if (data && data.category && (data.category as any).parent !== null)
		return <SubCategory products={data.children} />

	if (data && data.category && (data.category as any).parent === null)
		return <ProductsPage subCategories={data.children} />

	return null
}
