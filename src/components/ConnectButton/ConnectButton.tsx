import { FC } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import classes from './ConnectButton.module.scss';
import { shortenAddress } from '@/common/helpers';


const text = 'Connect Wallet';

const ConnectButton:FC = () => {
	const { connect, connectors, error } = useConnect();
	const { address, isConnected } = useAccount();
	const { disconnect } = useDisconnect()

	const theConnector = connectors[0];

	const shortenedAddress = shortenAddress(address);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleConnectWallet = (connector:any) => {
		if(!isConnected){
			connect({ connector })
		} else {
			const responseDisconnect = confirm('You will disconnect the wallet. Are you sure?');
			if (responseDisconnect) {
				disconnect();
				alert('You have disconnected');
			} else {
				alert("You have not disconnected");
			}
		}
	}

	if(error) alert(error.message);

	return (
		<button
			className={classes.button}
			disabled={!theConnector.ready}
			key={theConnector.id}
			onClick={() => handleConnectWallet(theConnector)}>
			{ address ? shortenedAddress : text }
		</button>
	)
}

export default ConnectButton
