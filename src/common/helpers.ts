export const shortenAddress = (address:string | undefined, chars = 6) => {
	if (!address) return '';
	const startChars = chars / 2;
	const endChars = chars / 2;

	return `${address.slice(0, startChars + 2)}...${address.slice(-endChars)}`;
}
