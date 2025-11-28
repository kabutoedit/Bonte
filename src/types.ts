export interface ProductsType {
	id: number
	title: string
	slug: string
	description: string
	image: string
	in_stock: boolean
	on_order: boolean
	parent: number
}

export interface ContactType {
	id: number
	title: string
}

export interface EmailType {
	id: number
	email: string
}

export interface SliderType {
	id: number
	title: string
	image: string
	slug: string
}
