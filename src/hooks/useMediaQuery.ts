import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		setMatches(mediaQuery.matches);

		const handleMediaChange = (e: MediaQueryListEvent) => {
			setMatches(e.matches);
		};

		mediaQuery.addEventListener('change', handleMediaChange);
		return () => mediaQuery.removeEventListener('change', handleMediaChange);
	}, [query]);

	return matches;
};
