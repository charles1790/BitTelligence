// import logo from './logo.svg';
import './App.css';
import Search from './components/search'
import Graph from './components/graph'
import { SigmaContainer, useSigma } from 'react-sigma-v2';

function App() {
  return (
    <div>
      <Search />
      <Graph />
    </div>
  );
}

export default App;
