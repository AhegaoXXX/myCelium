
import axios from 'axios';


export const TOKENS_URL = (chainId:string | number ) => `https://tokens-staging.1inch.io/v1.1/${chainId}`;

export enum ETokenIds {
    ETHEREUM = '1',
    BSC = '56',
    POLYGON = '137',
}

export type TChainId = ETokenIds | string;


export type TTokenInfo = {
	symbol?: string
	name?: string
	decimals?: number
	address?: string
	logoURI?: string
}

export interface IResponse {
    [key: string]: TTokenInfo;
}

export const getTokens = async (chainId: string | number):Promise<IResponse | undefined> => {
    try {
        const response = await axios.get(TOKENS_URL(chainId));
    
        return response.data;
    } catch (error) {
        console.error('Error fetching tokens:', error);
    }
}


