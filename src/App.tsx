import { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import Search from '@/components/Search/Search';
import Cards from '@/components/Cards/Cards';
import { IResponse, getTokens } from '@/common/constants';
import './App.scss';

import { useAccount, useContractReads, useSwitchNetwork } from 'wagmi'
import { erc20ABI } from '@wagmi/core'
import { useInView } from 'react-intersection-observer';


export default function App() {
  const [ selectedId, setSelectedId ] = useState('1');
	const [ visibleChains, setVisibleChains ] = useState(5);

  const [ chainsList, setChainsList ] = useState<IResponse | undefined>();
  const [ filteredChains, setFilteredChain ] = useState(Object.values(chainsList || {}));

  const [ query, setQuery ] = useState('');

	const { ref, inView } = useInView();
  const { address, isConnected } = useAccount();
  const { switchNetwork } = useSwitchNetwork();


  const handleSearch = (query?:string) => {
    if(!query) return;
    if(!chainsList) return;

    const filtered = Object.values(chainsList)
      .filter(chain => chain.name?.toLowerCase().includes(query.toLowerCase()));

    setFilteredChain(filtered);
  };

  const tokenAddresses =
    (!!filteredChains.length && filteredChains)
    || (chainsList && Object.keys(chainsList).slice(0, visibleChains));

  const contractCalls = tokenAddresses?.map((tokenAddress) => ({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address]
  }));

  const { data } = useContractReads({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contracts: contractCalls as any,

    //Using "suspense: true" will crush the app because of filteredChains btw
  });

  const startupChains = async () => {
    const result = await getTokens(selectedId);

    if(isConnected) switchNetwork?.(+selectedId || 1);
    setQuery('')
    setChainsList(result)
    setFilteredChain(Object.values(result || {}))
    setVisibleChains(5)
  };


  useEffect(()=>{
    startupChains();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ selectedId ]);

  useEffect(() => {
		if (inView) {
			setVisibleChains(prev=> prev+5);
		}
	}, [ inView ]);

  return (
    <div className='container'>
      <Header setSelectedId={setSelectedId} selectedId={selectedId}/>
      <Search onSearch={handleSearch} query={query} setQuery={setQuery}/>
      <Cards
        chainsList={chainsList}
        filteredList={filteredChains}
        balance={data}
        visibleChains={visibleChains}
        refIntersection={ref}/>
    </div>
  )
}
