export const ENGLISH_COURSE_A1_TO_B1 = {
	id: '1',
	updatedAt: '29.08.2024',
	name: 'Английский в Действии: Преодолейте Порог от A1 до B1',
	description:
		'Этот курс предназначен для студентов, которые хотят перейти на следующий уровень в изучении английского языка, от начального уровня A1 до уверенного уровня B1. \n\n Курс предлагает всестороннее погружение в английский язык, охватывающее все ключевые аспекты, необходимые для успешного освоения нового уровня. В процессе обучения вы не только освоите грамматические правила, но и значительно расширите свой словарный запас. Кроме того, курс включает развитие навыков аудирования и разговорной практики, что поможет вам уверенно использовать английский язык в различных ситуациях. \n\nМы начнем с основ грамматики, необходимых для перехода на уровень B1. Вы будете изучать времена глаголов, модальные глаголы, а также сложносочиненные и сложноподчиненные предложения. Параллельно с этим вы будете расширять свой лексический запас, изучая темы повседневной жизни, словосочетания и фразеологизмы, а также темы для общения.',
	tags: ['Английский', 'B1'],
	image: 'English',
	completionTime: 42,
	totalTopics: 4,
	topics: [
		{
			name: 'Грамматика',
			description:
				'Изучение основных грамматических структур, которые необходимы для достижения уровня B1. Это включает времена глаголов, модальные глаголы и построение сложных предложений.',
			completionTime: '15',
			subtopics: [
				{
					name: 'Времена глаголов',
					description:
						'Изучение Present Simple, Present Continuous, Past Simple и Future Simple.',
					completionTime: '5',
					lessons: [
						{
							name: 'Present Simple',
							description:
								'Изучение образования и использования Present Simple в утвердительных, отрицательных и вопросительных предложениях.',
							types: ['VIDEO']
						},
						{
							name: 'Present Continuous',
							description:
								'Обзор Present Continuous и его использование для описания текущих действий.',
							types: ['VIDEO']
						},
						{
							name: 'Past Simple',
							description:
								'Изучение Past Simple для описания завершенных действий в прошлом.',
							types: ['VIDEO']
						},
						{
							name: 'Future Simple',
							description:
								'Обзор Future Simple и его применение для описания будущих действий.',
							types: ['VIDEO']
						}
					],
					quizzes: [
						{
							name: 'Тест по временам глаголов',
							description:
								'Проверка знаний об использовании различных времен глаголов.'
						}
					]
				},
				{
					name: 'Модальные глаголы',
					description:
						'Изучение модальных глаголов can, could, may, might, must.',
					completionTime: '4',
					lessons: [
						{
							name: 'Can и Could',
							description:
								'Изучение использования can и could для выражения способности и вежливых просьб.',
							types: ['VIDEO']
						},
						{
							name: 'May и Might',
							description: 'Обзор may и might для выражения возможности.',
							types: ['VIDEO']
						},
						{
							name: 'Must',
							description:
								'Изучение must для выражения обязательств и необходимости.',
							types: ['VIDEO']
						},
						{
							name: 'Обзор модальных глаголов',
							description:
								'Сравнение и использование модальных глаголов в контексте.',
							types: ['VIDEO']
						}
					],
					quizzes: [
						{
							name: 'Тест по модальным глаголам',
							description:
								'Проверка знаний о модальных глаголах и их использовании.'
						}
					]
				},
				{
					name: 'Сложносочиненные и сложноподчиненные предложения',
					description: 'Изучение структуры сложных предложений.',
					completionTime: '6',
					lessons: [
						{
							name: 'Сложносочиненные предложения',
							description:
								'Изучение соединительных слов и структуры сложносочиненных предложений.',
							types: ['VIDEO']
						},
						{
							name: 'Сложноподчиненные предложения',
							description:
								'Изучение подчинительных союзов и структуры сложноподчиненных предложений.',
							types: ['VIDEO']
						},
						{
							name: 'Практика сложных предложений',
							description: 'Практика создания сложных предложений.',
							types: ['VIDEO']
						},
						{
							name: 'Ошибки в предложениях',
							description:
								'Обзор распространенных ошибок в построении сложных предложений.',
							types: ['VIDEO']
						}
					],
					quizzes: [
						{
							name: 'Тест по сложным предложениям',
							description:
								'Проверка знаний о сложносочиненных и сложноподчиненных предложениях.'
						}
					]
				},
				{
					name: 'Согласование времен',
					description:
						'Изучение правил согласования времен при построении предложений.',
					completionTime: '3',
					lessons: [
						{
							name: 'Основы согласования времен',
							description: 'Изучение базовых принципов согласования времен.',
							types: ['VIDEO']
						},
						{
							name: 'Ошибки в согласовании времен',
							description: 'Обзор типичных ошибок в согласовании времен.',
							types: ['VIDEO']
						},
						{
							name: 'Практика согласования времен',
							description:
								'Практическое применение правил согласования времен.',
							types: ['VIDEO']
						}
					],
					quizzes: [
						{
							name: 'Тест по согласованию времен',
							description: 'Проверка знаний правил согласования времен.'
						}
					]
				},
				{
					name: 'Придаточные предложения',
					description:
						'Изучение придаточных предложений, их типов и правил использования.',
					completionTime: '3',
					lessons: [
						{
							name: 'Определительные придаточные',
							description: 'Изучение определительных придаточных предложений.',
							types: ['VIDEO']
						},
						{
							name: 'Придаточные времени',
							description: 'Изучение придаточных предложений времени.',
							types: ['VIDEO']
						},
						{
							name: 'Придаточные условия',
							description: 'Изучение придаточных предложений условия.',
							types: ['VIDEO']
						},
						{
							name: 'Ошибки в придаточных предложениях',
							description:
								'Обзор распространенных ошибок в использовании придаточных предложений.',
							types: ['VIDEO']
						}
					],
					quizzes: [
						{
							name: 'Тест по придаточным предложениям',
							description:
								'Проверка знаний по различным типам придаточных предложений.'
						}
					]
				}
			]
		},
		{
			name: 'Лексика',
			description:
				'Расширение словарного запаса для уверенного общения на уровне B1.',
			completionTime: '12',
			subtopics: [
				{
					name: 'Повседневная жизнь',
					description:
						'Изучение словарного запаса, связанного с повседневной жизнью: покупки, транспорт, погода и другие повседневные темы.',
					completionTime: '3',
					lessons: [
						{
							name: 'Покупки и обслуживание',
							description:
								'Изучение лексики, связанной с магазинами, ресторанами и услугами.',
							types: ['VIDEO']
						},
						{
							name: 'Транспорт и передвижение',
							description:
								'Лексика, связанная с общественным транспортом, поездками и ориентацией в городе.',
							types: ['VIDEO']
						},
						{
							name: 'Погода и климат',
							description:
								'Изучение слов и выражений, связанных с погодой и климатическими условиями.',
							types: ['VIDEO']
						},
						{
							name: 'Общение в повседневной жизни',
							description:
								'Разговорные фразы и выражения для ежедневного общения.',
							types: ['VIDEO']
						}
					],
					quizzes: [
						{
							name: 'Тест по лексике повседневной жизни',
							description:
								'Проверка знаний словарного запаса на темы повседневной жизни.'
						}
					]
				},
				{
					name: 'Тема здоровья',
					description:
						'Лексика и выражения, связанные со здоровьем, болезнями и медицинскими консультациями.',
					completionTime: '3',
					lessons: [
						{
							name: 'Части тела и органы',
							description: 'Изучение названий частей тела и органов человека.',
							types: ['VIDEO']
						},
						{
							name: 'Болезни и симптомы',
							description: 'Лексика, связанная с болезнями и их симптомами.',
							types: ['VIDEO']
						},
						{
							name: 'У врача',
							description:
								'Изучение фраз и выражений для общения с врачом и медицинским персоналом.',
							types: ['VIDEO']
						},
						{
							name: 'Здоровый образ жизни',
							description:
								'Лексика, связанная со здоровым образом жизни, питанием и физической активностью.',
							types: ['VIDEO']
						}
					],
					quizzes: [
						{
							name: 'Тест по теме здоровья',
							description:
								'Проверка знаний по лексике и выражениям, связанным со здоровьем.'
						}
					]
				},
				{
					name: 'Тема путешествий',
					description:
						'Изучение лексики и выражений, необходимых для путешествий и общения за границей.',
					completionTime: '3',
					lessons: [
						{
							name: 'Бронирование и размещение',
							description:
								'Лексика для бронирования отелей и общения с персоналом гостиницы.',
							types: ['VIDEO']
						},
						{
							name: 'Туристические достопримечательности',
							description:
								'Изучение слов, связанных с экскурсиями и достопримечательностями.',
							types: ['VIDEO']
						},
						{
							name: 'Транспортные терминалы',
							description:
								'Лексика, необходимая для общения в аэропортах, на вокзалах и автовокзалах.',
							types: ['VIDEO']
						},
						{
							name: 'Общение с местными жителями',
							description:
								'Разговорные фразы и выражения для общения с местными жителями во время путешествий.',
							types: ['VIDEO']
						}
					],
					quizzes: [
						{
							name: 'Тест по лексике путешествий',
							description:
								'Проверка знаний словарного запаса на тему путешествий.'
						}
					]
				},
				{
					name: 'Окружающая среда',
					description:
						'Лексика и выражения, связанные с природой, экологией и охраной окружающей среды.',
					completionTime: '3',
					lessons: [
						{
							name: 'Природные явления',
							description:
								'Изучение словарного запаса, связанного с природными явлениями и катастрофами.',
							types: ['VIDEO']
						},
						{
							name: 'Экология и охрана природы',
							description:
								'Лексика, связанная с экологией, охраной природы и устойчивым развитием.',
							types: ['VIDEO']
						},
						{
							name: 'Животные и растения',
							description:
								'Изучение словарного запаса, связанного с фауной и флорой.',
							types: ['VIDEO']
						},
						{
							name: 'Экологические проблемы',
							description:
								'Лексика, связанная с обсуждением экологических проблем и их решений.',
							types: ['VIDEO']
						}
					],
					quizzes: [
						{
							name: 'Тест по теме окружающей среды',
							description:
								'Проверка знаний по лексике, связанной с природой и экологией.'
						}
					]
				},
				{
					name: 'Работа и карьера',
					description:
						'Изучение словарного запаса, связанного с рабочей средой, карьерой и профессиональной деятельностью.',
					completionTime: '3',
					lessons: [
						{
							name: 'Поиск работы',
							description:
								'Лексика, необходимая для поиска работы, составления резюме и прохождения собеседования.',
							types: ['VIDEO']
						},
						{
							name: 'Профессиональные обязанности',
							description:
								'Изучение лексики, связанной с профессиональными обязанностями и рабочей средой.',
							types: ['VIDEO']
						},
						{
							name: 'Карьерный рост и развитие',
							description:
								'Лексика, связанная с карьерным ростом, повышением квалификации и профессиональным развитием.',
							types: ['VIDEO']
						},
						{
							name: 'Работа в команде',
							description:
								'Фразы и выражения для эффективного общения и работы в команде.',
							types: ['VIDEO']
						}
					],
					quizzes: [
						{
							name: 'Тест по теме работы и карьеры',
							description:
								'Проверка знаний по лексике, связанной с профессиональной деятельностью.'
						}
					]
				}
			]
		},
		{
			name: 'Аудирование',
			description:
				'Развитие навыков восприятия английской речи на слух с использованием различных материалов.',
			completionTime: '10',
			subtopics: [
				{
					name: 'Диалоги на повседневные темы',
					description:
						'Прослушивание диалогов на повседневные темы для тренировки навыков аудирования.',
					completionTime: '3',
					lessons: [
						{
							name: 'Диалог о покупках',
							description: 'Прослушивание и разбор диалога о покупках.',
							types: ['AUDIO']
						},
						{
							name: 'Диалог о транспорте',
							description: 'Прослушивание и разбор диалога о транспорте.',
							types: ['AUDIO']
						},
						{
							name: 'Диалог о погоде',
							description: 'Прослушивание и разбор диалога о погоде.',
							types: ['AUDIO']
						},
						{
							name: 'Диалог в ресторане',
							description: 'Прослушивание и разбор диалога в ресторане.',
							types: ['AUDIO']
						}
					],
					quizzes: [
						{
							name: 'Тест по аудированию диалогов',
							description: 'Проверка понимания диалогов на повседневные темы.'
						}
					]
				},
				{
					name: 'Интервью и обсуждения',
					description:
						'Аудирование интервью и обсуждений на различные темы для расширения кругозора и улучшения понимания.',
					completionTime: '3',
					lessons: [
						{
							name: 'Интервью с профессионалом',
							description:
								'Прослушивание интервью с профессионалом на тему карьеры и работы.',
							types: ['AUDIO']
						},
						{
							name: 'Обсуждение экологических проблем',
							description:
								'Прослушивание обсуждения на тему экологических проблем.',
							types: ['AUDIO']
						},
						{
							name: 'Интервью на тему здоровья',
							description:
								'Прослушивание интервью с врачом на тему здоровья и здорового образа жизни.',
							types: ['AUDIO']
						},
						{
							name: 'Дискуссия о путешествиях',
							description: 'Прослушивание дискуссии на тему путешествий.',
							types: ['AUDIO']
						}
					],
					quizzes: [
						{
							name: 'Тест по аудированию интервью и обсуждений',
							description:
								'Проверка понимания интервью и обсуждений на различные темы.'
						}
					]
				},
				{
					name: 'Подкасты на английском языке',
					description:
						'Прослушивание подкастов на английском языке для расширения словарного запаса и улучшения навыков аудирования.',
					completionTime: '2',
					lessons: [
						{
							name: 'Подкаст на тему технологий',
							description:
								'Прослушивание подкаста о последних тенденциях в технологиях.',
							types: ['AUDIO']
						},
						{
							name: 'Подкаст на тему культуры',
							description:
								'Прослушивание подкаста о культурных различиях и традициях.',
							types: ['AUDIO']
						},
						{
							name: 'Подкаст на тему бизнеса',
							description:
								'Прослушивание подкаста о бизнесе и предпринимательстве.',
							types: ['AUDIO']
						},
						{
							name: 'Подкаст на тему науки',
							description: 'Прослушивание подкаста о научных открытиях.',
							types: ['AUDIO']
						}
					],
					quizzes: [
						{
							name: 'Тест по аудированию подкастов',
							description: 'Проверка понимания подкастов на английском языке.'
						}
					]
				},
				{
					name: 'Фильмы и сериалы на английском',
					description:
						'Развитие навыков аудирования через просмотр фильмов и сериалов на английском языке.',
					completionTime: '2',
					lessons: [
						{
							name: 'Анализ сцены из фильма',
							description:
								'Просмотр и разбор сцены из фильма с последующим обсуждением лексики и выражений.',
							types: ['VIDEO']
						},
						{
							name: 'Сцена из сериала',
							description:
								'Просмотр и разбор сцены из популярного сериала с акцентом на повседневную лексику.',
							types: ['VIDEO']
						},
						{
							name: 'Интервью с актером',
							description:
								'Прослушивание и обсуждение интервью с актером о его роли в фильме.',
							types: ['AUDIO']
						},
						{
							name: 'Обсуждение фильма',
							description: 'Прослушивание обсуждения фильма и его анализа.',
							types: ['AUDIO']
						}
					],
					quizzes: [
						{
							name: 'Тест по аудированию фильмов и сериалов',
							description:
								'Проверка понимания сцен из фильмов и сериалов на английском языке.'
						}
					]
				}
			]
		},
		{
			name: 'Разговорная практика',
			description:
				'Практические задания и упражнения для развития навыков разговорной речи на английском языке.',
			completionTime: '15',
			subtopics: [
				{
					name: 'Диалоги на разные темы',
					description:
						'Практика диалогов на различные темы для улучшения разговорных навыков.',
					completionTime: '4',
					lessons: [
						{
							name: 'Диалог в магазине',
							description: 'Практика диалога в магазине с акцентом на покупки.',
							types: ['VIDEO']
						},
						{
							name: 'Диалог в ресторане',
							description: 'Практика диалога в ресторане и заказ блюд.',
							types: ['VIDEO']
						},
						{
							name: 'Диалог в аэропорту',
							description:
								'Практика диалога в аэропорту с акцентом на регистрацию на рейс и багаж.',
							types: ['VIDEO']
						},
						{
							name: 'Диалог в гостинице',
							description:
								'Практика диалога в гостинице при регистрации и выезде.',
							types: ['VIDEO']
						}
					],
					quizzes: [
						{
							name: 'Тест по разговорной практике диалогов',
							description:
								'Проверка навыков ведения диалогов на различные темы.'
						}
					]
				},
				{
					name: 'Монологи и описания',
					description:
						'Практика монологов и описаний на английском языке для развития навыков свободной речи.',
					completionTime: '4',
					lessons: [
						{
							name: 'Описание себя',
							description: 'Практика описания себя, своих увлечений и семьи.',
							types: ['VIDEO']
						},
						{
							name: 'Описание места',
							description:
								'Практика описания различных мест, таких как города, достопримечательности и природа.',
							types: ['VIDEO']
						},
						{
							name: 'Описание события',
							description:
								'Практика описания событий, таких как праздники, вечеринки или путешествия.',
							types: ['VIDEO']
						},
						{
							name: 'Описание процессов',
							description:
								'Практика описания процессов, таких как приготовление пищи или выполнение задания.',
							types: ['VIDEO']
						}
					],
					quizzes: [
						{
							name: 'Тест по монологам и описаниям',
							description:
								'Проверка навыков описания и ведения монологов на английском языке.'
						}
					]
				},
				{
					name: 'Ролевые игры',
					description:
						'Практика разговорной речи через ролевые игры на различные темы.',
					completionTime: '3',
					lessons: [
						{
							name: 'Ролевая игра: Покупка',
							description: 'Практика ролевой игры в магазине или на рынке.',
							types: ['VIDEO']
						},
						{
							name: 'Ролевая игра: Аэропорт',
							description:
								'Практика ролевой игры в аэропорту при посадке на рейс.',
							types: ['VIDEO']
						},
						{
							name: 'Ролевая игра: Ресторан',
							description: 'Практика ролевой игры в ресторане при заказе еды.',
							types: ['VIDEO']
						},
						{
							name: 'Ролевая игра: Гостиница',
							description:
								'Практика ролевой игры при заселении в гостиницу и общении с персоналом.',
							types: ['VIDEO']
						}
					],
					quizzes: [
						{
							name: 'Тест по ролевым играм',
							description:
								'Проверка навыков ведения диалогов и участия в ролевых играх на английском языке.'
						}
					]
				},
				{
					name: 'Дискуссии на английском',
					description:
						'Практика ведения дискуссий на английском языке для развития критического мышления и навыков общения.',
					completionTime: '2',
					lessons: [
						{
							name: 'Дискуссия о технологиях',
							description:
								'Практика обсуждения темы технологий и их влияния на общество.',
							types: ['VIDEO']
						},
						{
							name: 'Дискуссия о культуре',
							description:
								'Практика обсуждения культурных различий и влияния культуры на жизнь.',
							types: ['VIDEO']
						},
						{
							name: 'Дискуссия о здоровье',
							description:
								'Практика обсуждения вопросов здоровья и здорового образа жизни.',
							types: ['VIDEO']
						},
						{
							name: 'Дискуссия о путешествиях',
							description:
								'Практика обсуждения опыта путешествий и их влияния на личность.',
							types: ['VIDEO']
						}
					],
					quizzes: [
						{
							name: 'Тест по дискуссиям',
							description:
								'Проверка навыков ведения дискуссий на английском языке.'
						}
					]
				}
			]
		}
	]
}
export const coursesExample = [ENGLISH_COURSE_A1_TO_B1]
