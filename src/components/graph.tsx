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

import { getRandomPosition, getJsonNode } from '../utils';
import { Attributes } from 'graphology-types';

const Graph: React.FC<any> = (props) => {
  
  const data = props.data;
  const sigma = useSigma();
  const loadGraph = useLoadGraph();
  const registerEvents = useRegisterEvents();

  const [showInfoModal, setToggleInfo] = useState(false);
  const [currentNode, setCurrentNode] = useState(data.address);
  const [textInput, setTextInput] = useState(currentNode);

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
    if(data.address != null){
      graph.addNode(data.address, { label: data.address, x: 0, y: 0, size: 10, total_received: data.total_received, total_sent: data.total_sent, final_balance: data.final_balance, total_txs: data.txs.length, firstnode: true });
      for (let tx of data.txs) {
        // for (let input of tx.inputs) {
        //     if (!graph.hasNode(input.prev_out.addr)) {}
        // }
        for (let out of tx.out) {
          if (!graph.hasNode(out.addr)) {
            const pos = getRandomPosition();
            graph.addNode(out.addr, { label: out.addr, size: 5 ,...pos });
          }
          if (!graph.hasEdge(data.address, out.addr)) {
            graph.addEdge(data.address, out.addr, { color: "#CCC", size: 1 });
          }
        }
      }
    }else{
      

      data.nodes.map( (node:any, index:number) => {

          if(node.attributes.firstnode != null && node.attributes.firstnode)
            graph.addNode(node.key, node.attributes);


          if (!graph.hasNode(node.key)) {
            const pos = getRandomPosition();
            graph.addNode(node.key, node.attributes);
          }

          data.edges.map( (edge:any, index:number) => {
            if (!graph.hasEdge(node.key, edge.source)) {
              graph.addEdge(node.key, edge.source, edge.attributes);
            }
          });
      });
    }
    loadGraph(graph);

    registerEvents({
      clickNode(node) {
        setTextInput('');
        setCurrentNode(node.node);
        sigma.getViewportZoomedState({ x: 0, y: 0 }, 1000);
        setToggleInfo(true);
      },
    });

    props.sCS(sigma.getGraph());

  }, [data]);

  async function setNode(node:any)
  {
    const _data = await getJsonNode(node);
    if(_data.txs != null ){
      props.sBC(_data);
      setToggleInfo(false);
    }
  }
  function updateNode(node:any) {
    const graph = sigma.getGraph();
    const value = textInput;

    if (value != "") {
      graph.updateNode(node, Attr => { return { ...Attr, label: value, color: "#02ee5a" }; });
    }
    setToggleInfo(false);
    setTextInput('');
    props.sCS(sigma.getGraph());
  }

  function level(node:any,lvl: number) {
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
    graph.updateNode(node, Attr => { return { ...Attr, color: color, size: size }; });
  }


  const itemGraphNode = (attr:string) => { return (sigma.getGraph().hasNode(currentNode)) ? sigma.getGraph().getNodeAttribute(currentNode,attr) : null }
  const itemDataNode =  (addr:string) => { 
    if(data.address == null)
    {
      return data.edges.map( (node: any, index:number) => { if(node.source == addr || node.target == addr){ return node }  });
    }else return data.txs.map((val:any,idx:any) => {  val.out.map( (val2:any,idx2:any) => { if(val2.addr == addr){ return val2 }  })}) 
  }
  const itemCurrentNode = itemDataNode(currentNode);


  return <div>
    <Modal show={showInfoModal}>
      <Modal.Header closeButton onClick={() => setToggleInfo(false)}>
        <Modal.Title>Modal Node Info</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form.Label htmlFor="inputNameNode">Name Node</Form.Label>
        <Form.Control type="text" value={ (textInput.length != 0) ? textInput : itemGraphNode('label')} onChange={(e) => { setTextInput(e.target.value) }} aria-describedby="nameNode" />

        <Form.Label >{"Adress: " + currentNode}</Form.Label><br></br>
        {(data.address == currentNode) ? <><Form.Label >{"Total Received: " + itemGraphNode('total_received')}</Form.Label><br></br></> : null}
        {(data.address == currentNode) ? <><Form.Label >{"Total Sent: " + itemGraphNode('total_sent')}</Form.Label><br></br></> : null}
        {(data.address == currentNode) ? <><Form.Label >{"Balance: " + itemGraphNode('final_balance')}</Form.Label><br></br></> : null}
        {(data.address == currentNode) ? <><Form.Label >{"Total Transactions: " + itemGraphNode('total_txs')}</Form.Label><br></br></> : null}
        <Form.Text>
          <br></br>
          Your password must be 8-20 characters long, contain letters and numbers, and
          must not contain spaces, special characters, or emoji.
          <br></br>
        </Form.Text>

        <DropdownButton id="drop" title="Threat Level" onSelect={ (e:any) => { if(e != null)level(currentNode,parseInt(e)) } }>
          <Dropdown.Item eventKey={0} >Level 0</Dropdown.Item>
          <Dropdown.Item eventKey={1}>Level 1</Dropdown.Item>
          <Dropdown.Item eventKey={2}>Level 2</Dropdown.Item>
          <Dropdown.Item eventKey={3}>Level 3</Dropdown.Item>
        </DropdownButton>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="dark" onClick={() => setNode(currentNode) }>Set Node</Button>
        <Button variant="secondary" onClick={() => setToggleInfo(false)}>Close</Button>
        <Button variant="primary" onClick={() => updateNode(currentNode)}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  </div>;
}
export default Graph;
