'use client'
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow
} from '@nextui-org/react'

const ComparisonSection = () => {
	return (
		<div className='w-screen h-fit p-8 flex mt-36 items-center justify-center z-10'>
			<div className='flex items-center justify-center w-[60%] max-lg:w-[70%] max-md:w-[80%] max-640:w-[90%] max-sm:w-full gap-20'>
				<div className='flex flex-col gap-20 w-full justify-center items-center'>
					<h2 className='text-3xl font-bold mb-4 z-10'>
						Почему WHAI - ваш лучший выбор
					</h2>
					<Table
						className='z-10 shadow-none w-full'
						classNames={{
							base: 'bg-white shadow-none scrollbar-hide',
							wrapper: 'shadow-none scrollbar-hide',
							th: 'bg-decor-2 text-accent'
						}}
						aria-label='Comparison table'
						style={{ borderSpacing: '10px 15px' }}
					>
						<TableHeader>
							<TableColumn className='px-4'>Преимущество</TableColumn>
							<TableColumn className='px-4'>Другие платформы</TableColumn>
							<TableColumn className='px-4 font-semibold'>WHAI</TableColumn>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className='bg-white'>Подбор курсов</TableCell>
								<TableCell className='px-4 py-2 rounded-xl'>
									Часы поисков
								</TableCell>
								<TableCell className='px-4 py-2 rounded-xl font-semibold'>
									Мгновенно
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='bg-white'>Персонализация</TableCell>
								<TableCell className='px-4 py-2 rounded-xl'>Базовая</TableCell>
								<TableCell className='px-4 py-2 rounded-xl font-semibold'>
									Полная адаптация
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='bg-white'>Гибкость обучения</TableCell>
								<TableCell className='px-4 py-2 rounded-xl'>
									Фиксированная программа
								</TableCell>
								<TableCell className='px-4 py-2 rounded-xl font-semibold'>
									Динамический план
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='bg-white'>Проверка ДЗ</TableCell>
								<TableCell className='px-4 py-2 rounded-xl'>
									До 48 часов
								</TableCell>
								<TableCell className='px-4 py-2 rounded-xl font-semibold'>
									Мгновенно
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='bg-white'>Стоимость</TableCell>
								<TableCell className='px-4 py-2 rounded-xl'>
									≈70 000 ₽ / курс
								</TableCell>
								<TableCell className='px-4 py-2 rounded-xl font-semibold'>
									От 799 ₽ навсегда
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='bg-white'>Поддержка</TableCell>
								<TableCell className='px-4 py-2 rounded-xl'>
									Ограниченная
								</TableCell>
								<TableCell className='px-4 py-2 rounded-xl font-semibold'>
									24/7 ИИ-ассистент
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	)
}

export default ComparisonSection
