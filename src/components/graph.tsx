import { ReactNode, useEffect, useState,useRef } from 'react';
import { useSigma, useLoadGraph,useRegisterEvents } from 'react-sigma-v2'
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
import { Modal,Button,Form,Dropdown,DropdownButton}  from 'react-bootstrap';
//import Search from './search';


const getRandomPosition = () => ({
    x: (Math.random() - .5)*100,
    y: (Math.random() - .5)*100
});

const randomisePosition = (position: {x: number, y: number}) => ({
    x: position.x - (Math.random() - .5)*10,
    y: position.y - (Math.random() - .5)*10
});


 
let tnode:string;

const CustomGraph: React.FC = () => { 
 
    const loadGraph = useLoadGraph();
    // New items
    const registerEvents = useRegisterEvents()
    const sigma = useSigma();
    const [getModalNodeSelect, setModalNodeSelect] = useState('');
    const [showInfoModal, setToggleInfo] = useState(false);
    const [showRegisterModal, setToggleRegister] = useState(false);
    const textInput = useRef<HTMLInputElement>(null);  

    //let tnode = MouseNodeEvent();
    
    useEffect(() => {
        // let graph = erdosRenyi(DirectedGraph, {order: 20, probability: 0.1});
        let graph = new DirectedGraph();
        // graph.addNode("Jessica", { label: "Jessica", size: 10 });
        // graph.addNode("Truman", { label: "Truman", x: 0, y: 1, size: 5 });
        // graph.addEdge("Jessica", "Truman", { color: "#CCC", size: 1 });
        graph.addNode(data.address, {label: data.address, x: 0, y: 0, size: 10});
        for (let tx of data.txs) {
            // for (let input of tx.inputs) {
            //     if (!graph.hasNode(input.prev_out.addr)) {}
            // }
            for (let out of tx.out) {
                if (!graph.hasNode(out.addr)) {
                    // const pos = randomisePosition(getRandomPosition());
                    const pos = getRandomPosition();
                    graph.addNode(out.addr, {label: out.addr, size: 5, ...pos});
                }
                if (!graph.hasEdge(data.address, out.addr)) {
                    graph.addEdge(data.address, out.addr, {color: "#CCC", size: 1});
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
            sigma.getViewportZoomedState({x:0,y:0},1000);
            setToggleInfo(true);
            //setModalNodeSelect(node.node);

           console.log(node);
          
          },
        });
      }, []);
    

    function updateNode()
{
    const graph =sigma.getGraph();
    const pos = getRandomPosition();
    const value = textInput.current?.value ?? '';
    if(value != "")
    graph.updateNode(tnode, Attr => {return { ...Attr, label:(value),color: "#FF0"};});
    setToggleInfo(false);
}

    
      return <div>     
    <Modal show={showInfoModal}>
            <Modal.Header closeButton onClick={()=> setToggleInfo(false)}>
            <Modal.Title>Modal Node Info</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            
            <Form.Label htmlFor="inputNameNode">Name Node</Form.Label>
            <Form.Control
                type="text"
                placeholder={tnode}
                id="inputNameNode"
                aria-describedby="nameNode"
                ref={textInput}
            />
            <Form.Text>
                Your password must be 8-20 characters long, contain letters and numbers, and
                must not contain spaces, special characters, or emoji.
                <br></br>
            </Form.Text>

            <DropdownButton id="dropdown-basic-button" title="Threat Level">
              <Dropdown.Item >Level 1</Dropdown.Item>
              <Dropdown.Item >Level 2</Dropdown.Item>
              <Dropdown.Item >Level 3</Dropdown.Item>
            </DropdownButton>


        </Modal.Body>


            <Modal.Footer>
              
            <Button variant="dark"  onClick={() => setToggleInfo(false) }>Set Node</Button>
            <Button variant="secondary" onClick={() => setToggleInfo(false) }>Close</Button>
            <Button variant="primary" onClick={() => updateNode() }>Save changes</Button>
            
            </Modal.Footer>
        </Modal>
        </div>;

    
}



function Graph() {
    return (
        <div style={{ border: "1px solid black"}}>
            <CustomGraph /> 
        </div>
    )
}

export default Graph;

function Example() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
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
      </>
    );
  }
  