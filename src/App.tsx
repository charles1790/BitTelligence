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

  return (
    <>
      <Header sBC={(data:any) => {setDataBC(data);}} data={dataBC} />
      <SigmaContainer>
        <Search filters={filtersState} />
        <Graph data={dataBC} />
      </SigmaContainer>
    </>
  );
}

export default App;
