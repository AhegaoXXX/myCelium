import { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import Search from '@/components/Search/Search';
import Cards from '@/components/Cards/Cards';
import { TTokenInfo, getTokens } from '@/common/constants';
import './App.scss';

import { useAccount, useContractReads, useSwitchNetwork } from 'wagmi'
import { erc20ABI } from '@wagmi/core'
import { useInView } from 'react-intersection-observer';


const tokensLimit = 5;

export default function App() {
  const [ selectedId, setSelectedId ] = useState('1');
	const [ visibleChains, setVisibleChains ] = useState(tokensLimit);
  const [ query, setQuery ] = useState('');

  const [ chainsList, setChainsList ] = useState<TTokenInfo[] | undefined>();
  const [ filteredChains, setFilteredChain ] = useState<TTokenInfo[] | undefined>(Object.values(chainsList || {}));
  const [ filteredChainsKeys, setFilteredChainKeys ] = useState<string[]>(Object.keys(chainsList || {}));


	const { ref, inView } = useInView();
  const { address, isConnected } = useAccount();
  const { switchNetwork } = useSwitchNetwork();


  const handleSearch = (query?:string) => {
    if(!query) return;
    if(!chainsList) return;

    const filtered = chainsList
      .filter(chain =>
        chain.address?.includes(query.toLowerCase())
        ||
        chain.name?.toLowerCase().includes(query.toLowerCase()));

    setFilteredChain(filtered);
  };

  const contractCalls = filteredChainsKeys?.slice(0, visibleChains)?.map((tokenAddress) => ({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address]
  }));

  const { data: balance } = useContractReads({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contracts: contractCalls as any,
    allowFailure: true,
    suspense: true,
  });
  

  const startupChains = async () => {
    if(!isConnected) return;
    switchNetwork?.(+selectedId || 1)
    const result = await getTokens(selectedId);
    setQuery('')
    setVisibleChains(tokensLimit)
    if(result){
      const resultValues = Object.values(result);
      const resultKeys = Object.keys(result);
      setChainsList(resultValues)
      setFilteredChain(resultValues)
      setFilteredChainKeys(resultKeys)
    }
  };


  useEffect(()=>{
    startupChains();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ selectedId ]);

  useEffect(() => {
		if (inView) {
			setVisibleChains(prev=> prev+tokensLimit);
		}
	}, [ inView ]);

  return (
    <div className='container'>
      <Header setSelectedId={setSelectedId} selectedId={selectedId}/>
      <Search onSearch={handleSearch} query={query} setQuery={setQuery}/>
      <Cards
        chainsList={chainsList}
        filteredList={filteredChains}
        balance={balance}
        visibleChains={visibleChains}
        refIntersection={ref}/>
    </div>
  )
}
