import './SubCategoryCard.scss'

export default function SubCategoryCard({ data }) {
	return (
		<div className='SubCategoryCard'>
			<div className='img'>
				<img src={data.image} alt={data.title} />
			</div>

			<h3>{data.title}</h3>

			<div className='btns'>
				<div className={data.in_stock ? 'available' : 'notAvailable'}>
					{data.in_stock ? 'В наличии' : 'Не в наличии'}
				</div>

				<div className={data.on_order ? 'toOrder' : 'notAvailable'}>
					{data.on_order ? 'В наличии' : 'Не доступно'}
				</div>
			</div>
		</div>
	)
}
