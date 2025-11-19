import Button from '../../shared/ui/Button'
import './AboutUs.scss'

export default function AboutUs() {
	return (
		<section id='about' className='AboutUs'>
			<div className='container'>
				<div className='about'>
					<h2>О нас</h2>
					<span>
						Мы объединяем многолетний опыт работы с <br />
						глобальными <br />
						поставщиками и глубокое понимание <br /> потребностей пищевой
						отрасли,чтобы быть <br />
						надёжным партнёром для производителей <br /> хлебобулочной,
						кондитерской и молочной <br />
						продукции. Благодаря <br /> прямым поставкам сырья и ингредиентов из{' '}
						<br />
						России, Турции и других <br /> стран мира, мы формируем устойчивую{' '}
						<br />
						цепочку поставок и широкий <br /> ассортимент. Вместе с нашими
						клиентами мы <br />
						создаём условия для <br /> стабильного роста, развития и устойчивого
						<br /> будущего пищевой промышленности.
					</span>
					<Button>СВЯЗАТЬСЯ С НАМИ</Button>
				</div>
				<div className='img'>
					<img src='/images/aboutUs.jpg' alt='О нас' />
				</div>
				<div className='yellowBorder'></div>
				<div className='grayBorder'></div>
			</div>
		</section>
	)
}
