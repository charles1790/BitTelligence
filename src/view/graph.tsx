import {useState, useEffect} from 'react';
import { FiltersState } from "../api/types";
import { SigmaContainer, useSigma } from 'react-sigma-v2';

import Header from '../components/header';
import Search from '../components/search';
import Graph from '../components/graph';
import Comments from '../components/comments';

const _infoProject = require('../../package.json');

function App() {
  
  const [dataBC, setDataBC] = useState<any>(require('../static/data.json'));
  const [filtersState, setFiltersState] = useState<FiltersState>({ clusters: {}, tags: {} });
  const [currentSigma, setCurrentSigma] = useState(null);
  const [sigma, setSigma] = useState(null);

  return (
    <>
      <Header title={_infoProject.name} desc={_infoProject.desc} sBC={(data:any) => {setDataBC(data)}} data={dataBC} sigmaData={currentSigma} sigma={sigma} />
      <SigmaContainer>
        <Search filters={filtersState} />
        <Graph data={dataBC} sBC={(data:any) => {setDataBC(data)}} sCS={(data:any) => setCurrentSigma(data)} sSigma={(data:any) => setSigma(data)} />
      </SigmaContainer>
      <Comments/>
    </>
  );
}

export default App;