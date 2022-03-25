import {useState} from 'react'
// import logo from './logo.svg';
import './App.css';
import Search from './components/search'
import Graph from './components/graph'
import { SigmaContainer, useSigma } from 'react-sigma-v2';

import { FiltersState } from "./types";

function App() {

  const [filtersState, setFiltersState] = useState<FiltersState>({
    clusters: {},
    tags: {},
  });



  return (
      <SigmaContainer>
      <Search filters={filtersState} />
      <Graph />
      </SigmaContainer>
  );
}

export default App;
