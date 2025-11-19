import './Map.scss'

export default function Map() {
	return (
		<div className='map'>
			<iframe
				src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3896.382824680978!2d74.65528653958557!3d42.878293406000424!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb710ac1f16a9%3A0x330cb5323235fa79!2zNCwgMSDRg9C7LiDQm9C10YDQvNC-0L3RgtC-0LLQsCwg0JHQuNGI0LrQtdC6!5e0!3m2!1sru!2skg!4v1763547034097!5m2!1sru!2skg'
				width='600'
				height='450'
				loading='lazy'
			></iframe>

			<div className='info'>
				<div className='adress'>
					<h4>Адрес</h4>
					<p>
						Кыргызская Республика г.Бишкек <br /> Лермонтова 1Б/4.
					</p>
				</div>
				<div className='mail'>
					<h4>Почта</h4>
					<p>bonte.m.a8.@gmail.com</p>
				</div>
				<div className='phone'>
					<h4>Телефон</h4>
					<p>
						Отдел закупа: +996 999 22 33 95 <br /> Отдел продаж: +996 999 22 33
						95 <br />
						Бухгалтерия: +996 555 966 034
					</p>
				</div>
			</div>
		</div>
	)
}
