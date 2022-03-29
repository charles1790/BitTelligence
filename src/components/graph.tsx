import { ReactNode, useEffect, useState, useRef } from 'react';
import { useSigma, useLoadGraph, useRegisterEvents } from 'react-sigma-v2'
import erdosRenyi from "graphology-generators/random/erdos-renyi";
import forceAtlas2 from 'graphology-layout-forceatlas2';
import { DirectedGraph } from 'graphology';
import { SigmaContainer } from 'react-sigma-v2';
import data from './data.json';
import ReactDOM from "react-dom";
import { UndirectedGraph } from "graphology";
//import JwModal from '/WebApps/BitTelligence/src/JwModal';
import React from 'react';
import { func } from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Dropdown, DropdownButton, Alert, AlertProps } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { StringLiteralLike, updateTypePredicateNodeWithModifier } from 'typescript';
//import Search from './search';


const getRandomPosition = () => ({
  x: (Math.random() - .5) * 100,
  y: (Math.random() - .5) * 100
});

const randomisePosition = (position: { x: number, y: number }) => ({
  x: position.x - (Math.random() - .5) * 10,
  y: position.y - (Math.random() - .5) * 10
});



let tnode: string;
let label: string;

const CustomGraph: React.FC = () => {

  const loadGraph = useLoadGraph();
  // New items
  const registerEvents = useRegisterEvents()
  const sigma = useSigma();
  const [getModalNodeSelect, setModalNodeSelect] = useState('');
  const [showInfoModal, setToggleInfo] = useState(false);
  const [showRegisterModal, setToggleRegister] = useState(false);
  const textInput = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //let tnode = MouseNodeEvent();

  useEffect(() => {
    // let graph = erdosRenyi(DirectedGraph, {order: 20, probability: 0.1});
    let graph = new DirectedGraph();
    // graph.addNode("Jessica", { label: "Jessica", size: 10 });
    // graph.addNode("Truman", { label: "Truman", x: 0, y: 1, size: 5 });
    // graph.addEdge("Jessica", "Truman", { color: "#CCC", size: 1 });
    graph.addNode(data.address, { label: data.address, x: 0, y: 0, size: 10 });
    for (let tx of data.txs) {
      // for (let input of tx.inputs) {
      //     if (!graph.hasNode(input.prev_out.addr)) {}
      // }
      for (let out of tx.out) {
        if (!graph.hasNode(out.addr)) {
          // const pos = randomisePosition(getRandomPosition());
          const pos = getRandomPosition();
          graph.addNode(out.addr, { label: out.addr, size: 5, ...pos });
        }
        if (!graph.hasEdge(data.address, out.addr)) {
          graph.addEdge(data.address, out.addr, { color: "#CCC", size: 1 });
        }
      }
    }
    // forceAtlas2.assign(graph, 100);

    loadGraph(graph);
  }, []);

  useEffect(() => {

    registerEvents({
      clickNode(node) {
        tnode = node.node;
        label = sigma.getGraph().getNodeAttribute(tnode, 'label');
        sigma.getViewportZoomedState({ x: 0, y: 0 }, 1000);
        setToggleInfo(true);
        //setModalNodeSelect(node.node);
        console.log(node);

      },
    });
  }, []);


  function updateNode() {
    const graph = sigma.getGraph();
    const pos = getRandomPosition();
    const value = textInput.current?.value ?? '';

    if (value != "") {
      const ccolor = graph.getNodeAttribute(tnode, 'label');
      console.log(ccolor);
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
}*/

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

        <DropdownButton id="" title="Threat Level">
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

/*function Example1() {
  <Modal
  show={show}
  onHide={handleClose}
  backdrop="static"
  keyboard={false}
  center
>
  <Modal.Header closeButton>
    <Modal.Title>Modal title</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    I will not close if you click outside me. Don't even try to press
    escape key.
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button variant="primary">Understood</Button>
  </Modal.Footer>
</Modal>
}*/



function Graph() {
  return (
    <div style={{ border: "1px solid black" }}>
      <CustomGraph />
    </div>
  )
}

export default Graph;


