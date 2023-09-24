import Card from '../Card/Card'
import classes from './Cards.module.scss'
import { FC } from 'react';
import { IResponse, TTokenInfo } from '@/common/constants';


const tokenFields = {
	logo: 'Logo',
	name: 'Name',
	symbol: 'Symbol',
	balance: 'Balance',
}

interface ICards {
	chainsList: IResponse | undefined;
	filteredList?:  TTokenInfo[];
	balance: ({ error: Error; result?: undefined; status: "failure"; } | { error?: undefined; result: unknown; status: "success"; })[] | undefined;
	visibleChains: number;
	refIntersection: (node?: Element | null | undefined) => void;
}

const Cards:FC<ICards> = ({chainsList, filteredList, balance, visibleChains, refIntersection}) => {
	const cardsArray = chainsList &&
		((!!filteredList?.length && filteredList) || Object.values(chainsList))?.slice(0, visibleChains);	
	
	return (
		<div className={classes.wrap_cards}>
			<div className={classes.head}>
				<div className={classes.left_side}>
					<p className='text'>{tokenFields.logo}</p>
					<p className='text'>{tokenFields.name}</p>
					<p className='text'>{tokenFields.symbol}</p>
				</div>
				<p className='text'>{tokenFields.balance}</p>
			</div>
			<div className={classes.cards}>
				{cardsArray?.map((chain, id: number, arr) =>
						(<Card
							refIntersection={id === arr.length-1 ? refIntersection : null}
							key={id}
							logo={chain.logoURI}
							name={chain.name}
							balance={Number(balance?.[id].result || 0)}
							symbol={chain.symbol}
						/>))}
			</div>
		</div>
	)
}

export default Cards
