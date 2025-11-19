import './OurStatistics.scss'

export default function OurStatistics() {
	return (
		<section className='OurStatistic'>
			<div className='container'>
				<div className='leftBlock'>
					<div className='twoLittle'>
						<div className='littleBlock'>
							<h3>500+</h3>
							<p>Тонн сырья поставляется ежемесячно по всей стране</p>
						</div>
						<div className='littleBlock'>
							<h3>99%</h3>
							<p>99% Заявок отгружаются точно в срок</p>
						</div>
					</div>
					<div className='large'>
						<h3>1 000+ м²</h3>
						<p>Складских помещений с контролем температуры</p>
					</div>
				</div>
				<div className='bigBlock'>
					<h3>600+</h3>
					<p>
						Клиентов из <br /> сферы молочной, <br /> кондитерской и HoReCa{' '}
						<br />
						промышленности
					</p>
				</div>
			</div>
		</section>
	)
}
