import {useState, useEffect} from 'react';
import { FiltersState } from "./types";
import { SigmaContainer, useSigma } from 'react-sigma-v2';

import Header from './components/header';
import Search from './components/search';
import Graph from './components/graph';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';




function App() {
  
  const [dataBC, setDataBC] = useState<any>(require('./data.json'));
  const [filtersState, setFiltersState] = useState<FiltersState>({
    clusters: {},
    tags: {},
  });

  const [currentSigma, setCurrentSigma] = useState(null);

  return (
    <>
      <Header sBC={(data:any) => {setDataBC(data)}} data={dataBC} sigmaData={currentSigma} />
      <SigmaContainer>
        <Search filters={filtersState} />
        <Graph data={dataBC} sBC={(data:any) => {setDataBC(data)}} sCS={(data:any) => setCurrentSigma(data)} />
      </SigmaContainer>
    </>
  );
}

export default App;
