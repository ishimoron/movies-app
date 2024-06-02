import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

import { useDebounce } from '../../hooks/useDebounce';
import styles from './style.module.scss';

interface SearchPropsI {
	filterMovies: (text: string) => void;
	setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<SearchPropsI> = ({ filterMovies, setIsSearching }) => {
	const [fieldValue, setFieldValue] = useState<string>('');
	const debouncedValue = useDebounce(fieldValue, 1000);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFieldValue(e.target.value);
	};

	useEffect(() => {
		filterMovies(debouncedValue);
		if (!debouncedValue) {
			setIsSearching(false);
		}
	}, [debouncedValue]);

	return (
		<div className={styles.searchForm}>
			<div className={styles.formController}>
				<input
					value={fieldValue}
					onChange={e => handleChange(e)}
					type='text'
					placeholder='Search movie...'
				/>
				<span className={styles.searchIcon}>
					<CiSearch />
				</span>
			</div>
		</div>
	);
};

export default Search;
