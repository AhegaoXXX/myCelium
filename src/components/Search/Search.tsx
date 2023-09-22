import classes from './Search.module.scss'
import SearchIcon from '@/assets/icons/search.svg'
import { ChangeEvent, FC, Dispatch, SetStateAction } from 'react';


interface ISearch {
	onSearch: (query?: string) => void;
	setQuery: Dispatch<SetStateAction<string>>;
	query: string;
}

const Search:FC<ISearch> = ({onSearch, setQuery, query}) => {
	const handleInputChange = (event:ChangeEvent<HTMLInputElement>):void => {
		setQuery(event.target.value);
		onSearch(event.target.value);
	};

	return (
		<label className={classes.label}>
			<img src={SearchIcon} alt='search' />
			<input
				value={query}
				onChange={handleInputChange}
				type='text'
				placeholder='Search assets'
				className={classes.search} />
		</label>
	)
}

export default Search
