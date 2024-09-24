import HowUseOne from './howuse_one.webp'
import HowUseThree from './howuse_three.webp'
import HowUseTwo from './howuse_two.webp'
const HowUse = () => {
	return (
		<div className={'flex items-center flex-col mt-20 mb-20'}>
			<h1 className='text-3xl'>
				Как пользоваться <b className='text-decor-2'>whai</b>
			</h1>
			<div>
				<div className='flex gap-20 items-start mt-10 max-md:flex-col'>
					<div className='bg-decor-1 w-[400px] h-[400px] overflow-hidden rounded-[40px] flex items-center justify-center max-md:w-[300px] max-md:h-[300px]'>
						<img
							className='object-cover max-w-fit w-[600px] ml-[50%]  max-md:w-[400px]'
							src={HowUseOne.src}
							alt='HowUseOne'
						/>
					</div>
					<div className='flex flex-col gap-5'>
						<h1 className='text-2xl w-[400px] max-md:w-[300px] font-medium'>
							Учитесь только тому, что действительно нужно
						</h1>
						<p className='text-base w-[400px] max-md:w-[300px]'>
							Наша платформа <b>помогает структурировать ваши мысли</b> и цели
							обучения. Мы выделяем ключевые знания, отсеивая лишнее. 
							<br />
							<br />
							<b>Результат:</b> вы усваиваете только необходимое, экономя время
							и быстрее достигая целей. Сфокусируйтесь на главном -{' '}
							<b>ваше время бесценно.</b>
						</p>
					</div>
				</div>
				<div className='flex gap-20 items-start mt-10 max-md:flex-col-reverse'>
					<div className='flex flex-col gap-5'>
						<h1 className='text-2xl w-[400px] max-md:w-[300px] font-medium'>
							Хочешь учиться эффективно? Начни с понимания себя!
						</h1>
						<p className='text-base w-[400px] max-md:w-[300px]'>
							Хочешь учиться <b>эффективно</b>? Начни с понимания себя! <br />
							<br />
							1. Пройди тест Узнай свой текущий уровень знаний за считанные
							минуты.
							<br />
							<br />
							2. Получи персональный план Наша платформа автоматически создаст
							структуру курса, идеально подходящую именно тебе. <br />
							<br />
							3. Учись с удовольствием Используй подобранные материалы,
							иллюстрации для быстрого усвоения знаний.
							<br />
						</p>
					</div>
					<div className='bg-[#FFEDE0] w-[400px] h-[400px] overflow-hidden rounded-[40px] flex items-center justify-center max-md:w-[300px] max-md:h-[300px]'>
						<img
							className='object-contain max-w-fit h-[250px] ml-[50%] max-md:h-[200px]'
							src={HowUseTwo.src}
							alt='HowUseOne'
						/>
					</div>
				</div>
				<div className='flex gap-20 items-start mt-10 max-md:flex-col'>
					<div className='bg-decor-4 w-[400px] h-[400px] max-md:w-[300px] max-md:h-[300px] overflow-hidden rounded-[40px] flex items-start justify-center p-5'>
						<img
							className='object-cover max-w-fit w-[250px] max-md:w-[300px]'
							src={HowUseThree.src}
							alt='HowUseOne'
						/>
					</div>
					<div className='flex flex-col gap-5'>
						<h1 className='text-2xl w-[400px] max-md:w-[300px] font-medium'>
							Учись по своему плану
						</h1>
						<p className='text-base max-md:w-[300px] w-[400px]'>
							Образование, которое подстраивается под <b>вас</b>, а не наоборот.
							Наша платформа предлагает гибкую систему обучения, адаптированную
							под ваш ритм жизни и индивидуальные цели.
							<br /> <br />
							<b>Гибкость обучения:</b>
							<br />
							1. Учитесь в удобное время, выбирайте оптимальный темп и
							настраивайте программу под свои потребности. <br />
							<br />
							2. Структурированные модули: Логически выстроенная
							последовательность уроков поможет вам эффективно осваивать
							материал шаг за шагом.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
export default HowUse
