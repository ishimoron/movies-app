import { useEffect, useState } from 'react'

export const useDebounce = (text: string, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState<string>('');

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(text);
		}, delay);

		return () => clearTimeout(timer);
	}, [text, delay]);

	return debouncedValue;
};

