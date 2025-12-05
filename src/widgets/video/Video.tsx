import './Video.scss'

export default function VideoBlock() {
	return (
		<section className='VideoBlock'>
			<div className='container'>
				<div className='video'>
					<iframe
						src='https://www.youtube.com/embed/racb1jJxigo'
						title='Видео о компании'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
					></iframe>
				</div>

				<div className='video-content'>
					<h2>
						Познакомьтесь с нами <br />
						поближе посмотрев
						<br /> видеоролик <br />
						<span>о компаниии.</span>
					</h2>
				</div>
				<div className='yellowBorder'></div>
				<div className='grayBorder'></div>
			</div>
		</section>
	)
}
