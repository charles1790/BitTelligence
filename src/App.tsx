import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import Logo from './assets/grayv.png'

import Contact from './view/Contact';
import Main from './view/Main';
import VGraph from './view/graph'

import { FiltersState } from "./api/types";
import { SigmaContainer, useSigma } from 'react-sigma-v2';
import Icon from './components/icon';



function App() {


  const [path, setPath] = useState("");

  window.addEventListener("load", () => {

    if (window.location.pathname === "/contact") {
      setPath(window.location.pathname);
    }
  });


  /* const checkPath = () => {
     history.((location) => {
       setPath(location.pathname);
     });
   }*/


  const showContact = path;
  /*let _contact;
  if (showContact !== "/contact") {
    _contact = (<li><Link to="/contact">Contact Us</Link></li>)
  }
  let _graph;
  if (showContact !== "/graph") {
    _graph = (<li><Link to="/graph">Graph</Link></li>)
  }
  let _about;
  if (showContact !== "/about") {
    _about = (<li><Link to="/about" >About Us</Link></li>)
  }*/



  let _home = ((path != '/') ? <li><Link to="/" >  <Icon libraryName='home' /> Home</Link></li> : null)

  let _graph = ((path != '/graph') ? <li><Link to="/graph"><Icon libraryName='desktop' /> Graph</Link></li> : null)
  let _contact = ((path != '/contact') ? <li><Link to="/contact"><Icon libraryName='phone' /> Contact Us</Link></li> : null)
  let _about = ((path != '/about') ? <li><Link to="/about" >About Us</Link></li> : null)

  return (
    <div className="App">


      <nav>
        <ul>
          <li><Link to="/"> <img src={Logo} height="100" width="auto" /> </Link></li>
        </ul>
        <ul style={{ display: 'rows' }}>
          <b>
          {_home}
          <li className="vertical-separator" />
          {_graph}
          <li className="vertical-separator" />
          {_contact}
        
          </b>
        </ul>
      </nav>


      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/graph" element={<VGraph />} />
      </Routes>

    </div>
  );

}


export default App;


// <Route path="/main" element={<Main/>} /> 