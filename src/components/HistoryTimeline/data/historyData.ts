export interface IHistoryItem {
	year: number;
	text: string;
}

export const historyData: IHistoryItem[] = [
	{
		year: 1970,
		text: 'ARPANET, предшественник интернета, расширяется до 4 узлов.',
	},
	{
		year: 1971,
		text: 'Intel выпускает первый коммерческий микропроцессор Intel 4004.',
	},
	{
		year: 1975,
		text: 'Билл Гейтс и Пол Аллен основывают Microsoft.',
	},
	{
		year: 1976,
		text: 'Стив Джобс и Стив Возняк создают Apple Computer.',
	},
	{
		year: 1980,
		text: 'IBM выбирает MS-DOS от Microsoft для своих первых персональных компьютеров.',
	},
	{
		year: 1983,
		text: 'Запущена сеть мобильной связи 1G в США.',
	},
	{
		year: 1984,
		text: 'Apple выпускает первый Macintosh с графическим интерфейсом.',
	},
	{
		year: 1989,
		text: 'Тим Бернерс-Ли предлагает концепцию Всемирной паутины (World Wide Web).',
	},
	{
		year: 1990,
		text: 'Запущен первый веб-сайт и веб-браузер.',
	},
	{
		year: 1994,
		text: 'Джефф Безос основывает Amazon как онлайн-книжный магазин.',
	},
	{
		year: 1995,
		text: 'Microsoft выпускает Windows 95, популяризируя меню "Пуск".',
	},
	{
		year: 1998,
		text: 'Ларри Пейдж и Сергей Брин основывают Google.',
	},
	{
		year: 2000,
		text: 'Лопнул пузырь доткомов, вызвав спад в технологическом секторе.',
	},
	{
		year: 2001,
		text: 'Apple представляет первый iPod, революционизируя музыкальную индустрию.',
	},
	{
		year: 2004,
		text: 'Марк Цукерберг запускает Facebook из своей комнаты в общежитии.',
	},
	{
		year: 2007,
		text: 'Apple выпускает первый iPhone, объединяющий телефон и компьютер.',
	},
	{
		year: 2010,
		text: 'Instagram запускается как приложение для обмена фотографиями.',
	},
	{
		year: 2012,
		text: 'Tesla представляет Model S, популярный электромобиль.',
	},
	{
		year: 2015,
		text: 'SpaceX впервые успешно приземляет ракету Falcon 9.',
	},
	{
		year: 2020,
		text: 'Пандемия COVID-19 ускоряет переход к удалённой работе и цифровым технологиям.',
	},
] as const;
