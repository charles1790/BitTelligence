import React,{ ReactNode, useEffect, useState, useRef } from 'react';
import ReactDOM from "react-dom";
import {formatMoney} from '../utils';

import erdosRenyi from "graphology-generators/random/erdos-renyi";
import forceAtlas2 from 'graphology-layout-forceatlas2';

import { useSigma, useLoadGraph, useRegisterEvents,SigmaContainer } from 'react-sigma-v2';
import { DirectedGraph,UndirectedGraph } from 'graphology';
import PropTypes,{ func } from 'prop-types';
import { Modal, Button, Form, Dropdown, DropdownButton, Alert, AlertProps } from 'react-bootstrap';
import { PropertySignature, StringLiteralLike, updateTypePredicateNodeWithModifier } from 'typescript';

import { getRandomPosition } from '../utils';
let tnode: string = '';
  let label: string = '';
const Graph: React.FC<any> = (props) => {
  

  
  
  const loadGraph = useLoadGraph();
  const registerEvents = useRegisterEvents();


  // New items
  
  const sigma = useSigma();
  const [getModalNodeSelect, setModalNodeSelect] = useState('');
  const [showInfoModal, setToggleInfo] = useState(false);
  const [showRegisterModal, setToggleRegister] = useState(false);
  const textInput = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const data = props.data;

  useEffect(() => {



    
     /* let inputs = 0;
      let outputs = 0;
      
      console.log("total_received: "+formatMoney(data.total_received));
      console.log("total_sent: "+formatMoney(data.total_sent));
      //console.log("final_balance: "+data.final_balance);

      console.log("data.txs: "+data.txs.length);
      data.txs.map((val2:any, idx2:any) => {

        val2.inputs.map((val3:any,idx3:any) => {
          if(val3.addr == data.address)
            inputs +=val3.prev_out.value; 
        });

        val2.out.map((val3:any,idx3:any) => {
          outputs +=val3.value; 
        });
  
      });

      console.log("total_received 2 "+formatMoney(outputs));
      console.log("total_sent 2 "+formatMoney(inputs));*/
   

    
    let graph = new DirectedGraph();

    graph.addNode(data.address, { label: data.address, x: 0, y: 0, size: 10 });
    for (let tx of data.txs) {
      // for (let input of tx.inputs) {
      //     if (!graph.hasNode(input.prev_out.addr)) {}
      // }
      for (let out of tx.out) {
        if (!graph.hasNode(out.addr)) {
          // const pos = randomisePosition(getRandomPosition());
          const pos = getRandomPosition();
          graph.addNode(out.addr, { label: out.addr, size: 5 ,...pos });
        }
        if (!graph.hasEdge(data.address, out.addr)) {
          graph.addEdge(data.address, out.addr, { color: "#CCC", size: 1 });
        }
      }
    }
    // forceAtlas2.assign(graph, 100);

    loadGraph(graph);

    registerEvents({
      clickNode(node) {
        tnode = node.node;
        label = sigma.getGraph().getNodeAttribute(tnode, 'label');
        sigma.getViewportZoomedState({ x: 0, y: 0 }, 1000);
        setToggleInfo(true);
        //setModalNodeSelect(node.node);
      },
    });


  }, [data]);



  function updateNode() {
    const graph = sigma.getGraph();
    const value = textInput.current?.value ?? '';

    console.log(graph.export());

    if (value != "") {
      const ccolor = graph.getNodeAttribute(tnode, 'label');
      graph.updateNode(tnode, Attr => { return { ...Attr, label: (value), color: "#02ee5a" }; });
    }
    setToggleInfo(false);
  }

  function level(lvl: number) {
    const graph = sigma.getGraph();
    let color: string;
    let size: number;
    if (lvl == 0) {
      color = "#CCC";
      size = 10;
    } else if (lvl == 1) {
      color = "#FF0";
      size = 15;
    } else if (lvl == 2) {
      color = "#ff8805"
      size = 20;
    } else {
      color = "#ff0000";
      size = 25;
      //document.getElementById("drop").style.color="red";
    }
    graph.updateNode(tnode, Attr => { return { ...Attr, color: color, size: size }; });
  }
  /* 
  function level2(){
    const graph =sigma.getGraph();
    graph.updateNode(tnode, Attr => {return { ...Attr, color: "#ff8805"};});
  }
  function level3(){
    const graph =sigma.getGraph();
    graph.updateNode(tnode, Attr => {return { ...Attr, color: "#ff0000"};});
  }
  */

  //if (tnode != label) {
  // this.getElementById('tonto').style.visibility = 'hidden';
  //}
  return <div>
    <Modal show={showInfoModal}>
      <Modal.Header closeButton onClick={() => setToggleInfo(false)}>
        <Modal.Title>Modal Node Info</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form.Label htmlFor="inputNameNode" id="tonto">Name Node</Form.Label>
        <Form.Control
          type="text"
          placeholder={tnode}
          id="inputNameNode"
          aria-describedby="nameNode"
          ref={textInput}
        />

        <Form.Label >{"Label: " + label}</Form.Label><br></br>
        <Form.Label >{"Total Received: " + data.total_received}</Form.Label><br></br>
        <Form.Label >{"Total Sent: " + data.total_sent}</Form.Label><br></br>
        <Form.Label >{"Balance: " + data.final_balance}</Form.Label><br></br>
        <Form.Label >{"Total Transactions: " + sigma.getGraph().size}</Form.Label><br></br>
        <Form.Text>
          <br></br>
          Your password must be 8-20 characters long, contain letters and numbers, and
          must not contain spaces, special characters, or emoji.
          <br></br>
        </Form.Text>

        <DropdownButton id="drop" title="Threat Level">
          <Dropdown.Item onClick={() => level(0)}>Level 0</Dropdown.Item>
          <Dropdown.Item onClick={() => level(1)}>Level 1</Dropdown.Item>
          <Dropdown.Item onClick={() => level(2)}>Level 2</Dropdown.Item>
          <Dropdown.Item onClick={() => level(3)}>Level 3</Dropdown.Item>
        </DropdownButton>


      </Modal.Body>

      <Modal.Footer>

        <Button variant="dark" onClick={() => setShow(true)}>Set Node</Button>
        <Button variant="secondary" onClick={() => setToggleInfo(false)}>Close</Button>
        <Button variant="primary" onClick={() => updateNode()}>Save changes</Button>

      </Modal.Footer>
    </Modal>
  </div>;
}
export default Graph;
