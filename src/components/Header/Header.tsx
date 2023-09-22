import { FC, Dispatch, SetStateAction, memo } from 'react';
import classes from './Header.module.scss'
import Logo from '@/assets/icons/Logo.svg'
import Select from '../Select/Select'
import ConnectButton from '../ConnectButton/ConnectButton'


interface IHeader {
	setSelectedId: Dispatch<SetStateAction<string>>;
	selectedId: string;
}

const Header:FC<IHeader> = memo(({setSelectedId, selectedId}) => {
	return (
		<header className={classes.header}>
			<div className={classes.img_wrap}>
				<a href='#'>
					<img src={Logo} />
				</a>
			</div>
			<div className={classes.left_side}>
				<Select setSelectedId={setSelectedId} selectedId={selectedId}/>
				<ConnectButton />
			</div>
		</header>
	)
})

export default Header;
