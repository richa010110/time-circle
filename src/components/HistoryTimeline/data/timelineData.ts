export const yearRanges: [number, number][] = [
	[1970, 1980],
	[1980, 1990],
	[1990, 2000],
	[2000, 2010],
	[2010, 2020],
] as const;

export const options = [
	{ number: 1, label: 'Ранние компьютеры', yearRanges: yearRanges[0] },
	{ number: 2, label: 'Эра ПК', yearRanges: yearRanges[1] },
	{ number: 3, label: 'Интернет', yearRanges: yearRanges[2] },
	{ number: 4, label: 'Мобильные технологии', yearRanges: yearRanges[3] },
	{ number: 5, label: 'Современность', yearRanges: yearRanges[4] },
] as const;

export const totalOptions = options.length;
