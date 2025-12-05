import Button from '../../shared/ui/Button'
import './AboutUs.scss'

export default function AboutUs() {
	return (
		<section id='about' className='AboutUs'>
			<div className='container'>
				<div className='about'>
					<h2>О нас</h2>
					<span>
						Мы объединяем многолетний опыт работы с глобальными поставщиками и
						глубокое понимание потребностей пищевой отрасли,чтобы быть надёжным
						партнёром для производителей хлебобулочной, кондитерской и молочной
						продукции. Благодаря прямым поставкам сырья и ингредиентов из{' '}
						России, Турции и других стран мира, мы формируем устойчивую цепочку
						поставок и широкий ассортимент. Вместе с нашими клиентами мы создаём
						условия для стабильного роста, развития и устойчивого будущего
						пищевой промышленности.
					</span>
					<a href='https://wa.me/+996999223395' style={{ textAlign: 'center' }}>
						<Button>СВЯЗАТЬСЯ С НАМИ</Button>
					</a>
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
