import classes from './Card.module.scss'
import { FC } from 'react'

export interface ICard {
	logo?: string
	name?: string
	symbol?: string
	balance?: number | string
	refIntersection: ((node?: Element | null | undefined) => void) | null;
}

const Card: FC<ICard> = ({ logo, name, symbol, balance, refIntersection }) => {
	return (
		<div className={classes.card} ref={refIntersection}>
			<div className={classes.right_side}>
				<div className={classes.img_wrap}>
					<img src={logo} alt={`logo ${name}`} />
				</div>
				<p className={'title'}> {name}</p>
				<p className={'text'}> {symbol}</p>
			</div>

			<div className={`text ${classes.balance}`}> {balance} <span>{symbol}</span></div>
		</div>
	)
}

export default Card
