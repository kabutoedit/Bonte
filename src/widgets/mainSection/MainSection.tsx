import Button from '../../shared/ui/Button'
import './MainSection.scss'

export default function MainSection() {
	return (
		<section className='main-section'>
			<div className='container'>
				<div className='main-section__text'>
					<p>
						Прямые поставки из разных стран и регионов мира <br />
						позволяют нам обеспечить широкий ассортимент продукции.
					</p>
					<span>
						ПОСТАВКА <br /> СЫРЬЯ ДЛЯ <span>ПИЩЕВОЙ</span> ПРОМЫШЛЕННОСТИ
					</span>
				</div>

				<div className='main-section__cakeBlock'>
					<div className='img'>
						<img src='../../../images/mainSectionCake.png' alt='cake' />
					</div>
					<h4>Кондитерские изделия</h4>
					<Button>Подробнее</Button>
				</div>
			</div>
		</section>
	)
}
