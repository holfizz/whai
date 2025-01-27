import { Layout } from '@/widgets/Layout'

const CookiePolicyPage = () => {
	return (
		<Layout>
			<div className='container mx-auto px-4 py-8'>
				<h1 className='text-3xl font-bold text-decor-2 mb-4'>
					Политика использования файлов cookie
				</h1>
				<p className='mb-4'>
					Настоящая Политика использования файлов cookie (далее — «Политика»)
					Индивидуального предпринимателя (ИНН 753614213399) (далее — «Whai»)
					является неотъемлемой частью Политики конфиденциальности и защиты
					персональных данных, которая размещена на сайте Whai по адресу:{' '}
					<a
						href='https://whai.ru/privacy'
						className='text-blue-500 hover:underline'
					>
						https://whai.ru/privacy
					</a>{' '}
					и распространяется на продукты и сервисы (далее — «Сервисы») Whai
					и/или его аффилированных лиц. Настоящая Политика описывает типы файлов
					cookie, цели их использования и способы, с помощью которых можно от
					них отказаться.
				</p>
				<h2 className='text-2xl font-bold text-decor-2 mb-4'>
					Что такое файлы cookie и для чего их использует Whai
				</h2>
				<p className='mb-4'>
					Файлы cookie — это небольшие фрагменты данных, которые сервер
					отправляет на устройство Пользователя при посещении сайта. Файлы
					cookie запоминают информацию о предпочтениях Пользователя, что
					позволяет улучшить работу с Сервисами.
				</p>
				<p className='mb-4'>Whai использует файлы cookie для того, чтобы:</p>
				<ul className='list-disc ml-6 mb-4'>
					<li>Помогать Пользователю оставаться авторизованным в Сервисах;</li>
					<li>Улучшать качество работы Пользователя с Сервисами;</li>
					<li>Показывать приоритетную для Пользователя информацию;</li>
					<li>
						Сохранять настройки рекламных предпочтений и безопасного поиска;
					</li>
					<li>
						Отображать рекламу, которая может заинтересовать Пользователя;
					</li>
					<li>Анализировать статистику использования Сервисов.</li>
				</ul>
				<h2 className='text-2xl font-bold text-decor-2 mb-4'>
					Какие файлы cookie использует Whai
				</h2>
				<p className='mb-4'>
					Whai использует различные типы файлов cookie, которые можно разделить
					на следующие категории:
				</p>
				<ul className='list-disc ml-6 mb-4'>
					<li>
						<b>Технические файлы cookie</b>: необходимы для правильной работы и
						предоставления полного функционала Сервисов.
					</li>
					<li>
						<b>Аналитические и маркетинговые файлы cookie</b>: позволяют
						собирать информацию о пользователях, их действиях на Сервисах и
						показывать релевантную рекламу.
					</li>
					<li>
						<b>Прочие файлы cookie</b>: выполняют различные функции, например,
						запоминают настройки Пользователя, такие как регион или размер
						текста.
					</li>
				</ul>
				<h2 className='text-2xl font-bold text-decor-2 mb-4'>
					Управление файлами cookie
				</h2>
				<p className='mb-4'>
					При первом посещении Сервисов Whai может предложить Вам согласиться с
					использованием файлов cookie через уведомление. Если Вы не хотите,
					чтобы файлы cookie сохранялись на Вашем устройстве, Вы можете
					отключить эту опцию в настройках браузера. Сохраненные файлы cookie
					также можно удалить в любое время в настройках браузера.
				</p>
				<p className='mb-4'>
					Если Вы одобрили использование файлов cookie на одном из сервисов
					Whai, это будет означать, что такое согласие дано Вами для
					использования файлов cookie на всех Сервисах Whai.
				</p>
				<h2 className='text-2xl font-bold text-decor-2 mb-4'>
					Кто, кроме Whai, имеет доступ к информации, содержащейся в файлах
					cookie
				</h2>
				<p className='mb-4'>
					Информация, собранная с помощью файлов cookie, может быть передана и
					доступна Whai и/или его партнерам в соответствии с условиями Политики
					конфиденциальности и защиты персональных данных, которая доступна по
					адресу:{' '}
					<a
						href='https://whai.ru/privacy'
						className='text-blue-500 hover:underline'
					>
						https://whai.ru/privacy
					</a>
					.
				</p>
				<p className='mb-4'>
					Партнеры Whai могут также использовать файлы cookie для анализа
					активности Пользователей на Сервисах и показа адаптированной рекламы.
				</p>
			</div>
		</Layout>
	)
}

export default CookiePolicyPage
