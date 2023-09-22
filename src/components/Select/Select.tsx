import { ETokenIds } from '@/common/constants'
import classes from './Select.module.scss'
import ReactSelect, { StylesConfig, components, SingleValueProps  } from 'react-select'
import { FC, Dispatch, SetStateAction, useState } from 'react';
import etherLogo from '@/assets/icons/ETHEREUM.svg';
import bscLogo from '@/assets/icons/BSC.svg';
import polygonLogo from '@/assets/icons/Polygon.svg';


const options = [
	{ value: ETokenIds.ETHEREUM, label: 'ETHEREUM', icon: etherLogo },
	{ value: ETokenIds.BSC, label: 'BSC', icon: bscLogo },
	{ value: ETokenIds.POLYGON, label: 'POLYGON', icon: polygonLogo },
]

const Styles: StylesConfig = {
	control: (styles, { isFocused }) => ({
		...styles,
		backgroundColor: 'white',
		borderRadius: '8px',
		width: '100%',
		border: '2px solid #EC6468',
		boxShadow: 'none',
		borderColor: isFocused ? '#EC6468 !important' : '',
		textAlign: 'center',
		'& input':{
			caretColor: 'transparent',
		},
	}),
	option: (styles, { isDisabled, isFocused, isSelected }) => {
		return {
			...styles,
			backgroundColor: '',
			borderRadius: '8px',
			color: isSelected || isFocused ? '#EC6468' : '',
			cursor: isDisabled ? 'not-allowed' : 'default',

			':active': {
				...styles[':active'],
				backgroundColor: isSelected ? '#EC6468' : undefined,
			},
		}
	},
}

const { Option } = components;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IconOption = (props:any) => (
	<Option {...props}>
		<img
			src={props.data.icon}
			className={classes.icons_select}
			alt={props.data.label}
		/>
		{props.data.label}
	</Option>
);

interface ISelect {
	setSelectedId: Dispatch<SetStateAction<string>>;
	selectedId: string;
}

const Select:FC<ISelect> = ({setSelectedId, selectedId}) => {
	const [ isDropdown, setIsDropdown ] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const SingleValue = (props: SingleValueProps<any, false>) => (
		<components.SingleValue {...props}>
			<img
				src={options.find((option) =>  option.value === selectedId)?.icon}
				alt="selected logo"
				className={classes.selected_logo}/>
			{props.children}
		</components.SingleValue>
	);

	const handleChange = (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		selectedOption: any) => {
		if (selectedOption) {
			setSelectedId(selectedOption.value || null);
		}
	};

	return (
		<ReactSelect
			classNamePrefix={classes.select_pref}
			className={`${classes.select} ${isDropdown ? classes.dropt_select : classes.usual_select}`}
			menuIsOpen={isDropdown}
			options={options}
			value={options.filter((option) => {
				return option.value === selectedId;
			})}
			styles={Styles}
			onMenuOpen={()=>setIsDropdown(true)}
			onMenuClose={()=>setIsDropdown(false)}
			onChange={handleChange}
			components={{ Option: IconOption, SingleValue }}
		/>
	)
}

export default Select
