import React,{ useEffect, useState, createRef } from 'react';
import { getRandomPosition, getJsonNode, formatMoneyToBTC } from '../api/utils';
import { useSigma, useLoadGraph, useRegisterEvents,SigmaContainer } from 'react-sigma-v2';
import { DirectedGraph } from 'graphology';
import { Modal, Button, Form, Dropdown, DropdownButton, Alert, AlertProps } from 'react-bootstrap';
import { Attributes } from 'graphology-types';
import Info from './info';
import Bootbox from './bootbox';

const Graph: React.FC<any> = (props) => {
  
  const data = props.data;
  const sigma = useSigma();
  const loadGraph = useLoadGraph();
  const registerEvents = useRegisterEvents();

  const dialogRef = createRef<any>();

  const [showInfoModal, setToggleInfo] = useState(false);
  const [currentNode, setCurrentNode] = useState(data.address);
  const [textInput, setTextInput] = useState(currentNode);
  const [levelSelect, setLevelSelect] = useState(-1);
  const [enableSearch, setEnableSearch] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const levelNode = [
    {name:'Default', color:'#999', size:10},
    {name:'Level 1', color:'#ff0', size:15},
    {name:'Level 2', color:'#ff8805', size:20},
    {name:'Level 3', color:'#ff0000', size:25}
  ];

  useEffect(() => {
 
    let graph = new DirectedGraph();

    if(graph.nodes.length != 0)
      graph.clear();

    if(data.address != null){
      graph.addNode(data.address, { label: data.address, x: 0, y: 0, color: "#0d6efd", size: 5, total_received: formatMoneyToBTC(data.total_received), total_sent: formatMoneyToBTC(data.total_sent), final_balance: formatMoneyToBTC(data.final_balance), total_txs: data.n_tx, firstnode: true });
      for (let tx of data.txs) {
        for (let input of tx.inputs) {
            if (!graph.hasNode(input.prev_out.addr)) {
              const pos = getRandomPosition();
              graph.addNode(input.prev_out.addr, { label: input.prev_out.addr, money: input.prev_out.value, spent: input.prev_out.spent, is_output:false, is_input:true, size: 5, alert: -1,...pos });
            }
            if (!graph.hasEdge(data.address, input.prev_out.addr)) {
              graph.addEdge(data.address, input.prev_out.addr, { color: "#36E51E", size: 1 });
            }
        }
        for (let out of tx.out) {
          if (!graph.hasNode(out.addr)) {
            const pos = getRandomPosition();
            graph.addNode(out.addr, { label: out.addr, money: out.value,spent: out.spent, is_input:false, is_output:true, size: 5, alert: -1,...pos });
          }
          if (!graph.hasEdge(data.address, out.addr)) {
            graph.addEdge(data.address, out.addr, { color: "#E51E1E", size: 1 });
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
      });
      data.edges.map( (edge:any, index:number) => {
        if (!graph.hasEdge(edge.source, edge.target)) {
          graph.addEdge(edge.source, edge.target, edge.attributes);
        }
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
    props.sSigma(sigma);

  }, [data]);

  const setNode = async (node:any) => {
    const graph = sigma.getGraph();
    const _data = await getJsonNode(node);

    if(!enableSearch)
    {
        alert("Wait 10 seconds for the next query.");
        return false;
    }
    
    if(_data.txs != null ){
      props.sBC(_data);
      setToggleInfo(false);

      const nodeDisplayData = sigma.getNodeDisplayData(_data.address);
      if (nodeDisplayData)
      sigma.getCamera().animate( { ...nodeDisplayData, ratio: 1 }, { duration: 600 } );

    }

    setEnableSearch(false);
    setTimeout(() => { setEnableSearch(true); }, 10*1000);
  };
  const updateNode = (node:any) => {
    const graph = sigma.getGraph();
    const value = textInput;
    const attrs = sigma.getGraph().getNodeAttributes(node);
    let _lvl = { color : '#000', size: 7}; //Default Data

    if(levelSelect != -1)
      _lvl = levelNode[levelSelect];
    
    graph.updateNode(node, Attr => { return { ...Attr, label: ((value != "" && value != node) ? value: attrs.label ), color: (attrs.firstnode != null && attrs.firstnode) ? '#0d6efd' : ((attrs.alert != -1 && levelSelect == -1 ) ? attrs.color : _lvl.color), size: ( levelSelect == -1) ? attrs.size : _lvl.size, alert: (levelSelect != -1) ? levelSelect : attrs.alert }; });
      
    setToggleInfo(false);
    setShowConfirm(false);
    setLevelSelect(-1);
    setTextInput('');
    props.sCS(sigma.getGraph());
  
  };
  const level = (lvl: number) => {
    console.log(lvl);
    setLevelSelect(lvl);
  };
  const itemGraphAttr = () => {
    return (sigma.getGraph().hasNode(currentNode)) ? sigma.getGraph().getNodeAttributes(currentNode) : {}
  };
  const contentInfo = () => {

    let inputs: number = 0;
    let outputs: number = 0;
    sigma.getGraph().forEachNode((key: string, attributes: Attributes): void => {
        if(attributes.is_input){
          inputs++;
        }else if(attributes.is_output){
          outputs++;
        }
    });
    let arrayData = [];
    arrayData.push({ title:'Total Inputs:',value: inputs,style:{color:'#0AE82F', fontWeight:'bold'} });
    arrayData.push({ title:'Total Outputs:',value: outputs,style:{color:'#E80A0A', fontWeight:'bold'} });
  
    return arrayData;
  };

  return <div>
    <Info content={contentInfo()} />
    <Bootbox show={showConfirm} 
				type={"confirm"}  
				message={"Do That?"}
				onSuccess={() => updateNode(currentNode)}  
				onCancel={() => { setShowConfirm(false);setToggleInfo(true); }}  
				onClose={() => { setShowConfirm(false);setToggleInfo(true); }} 
    />
    <Modal show={showInfoModal}>

      <Modal.Header closeButton onClick={() => setToggleInfo(false)}>
        <Modal.Title>Modal Node Info</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form.Label htmlFor="inputNameNode">Name Node / Custom Name Node</Form.Label>
        <Form.Control type="text" value={ (textInput.length != 0) ? textInput : itemGraphAttr().label} onChange={(e) => { setTextInput(e.target.value) }} aria-describedby="nameNode" />

        <Form.Label style={{color : '#333'}} >{"Address: " + currentNode}</Form.Label><br></br>
        {(itemGraphAttr().firstnode) ? <><Form.Label >{'Total Received: ' + itemGraphAttr().total_received}</Form.Label><br></br></> : null}
        {(itemGraphAttr().firstnode) ? <><Form.Label >{'Total Sent: ' + itemGraphAttr().total_sent}</Form.Label><br></br></> : null}
        {(itemGraphAttr().firstnode) ? <><Form.Label >{'Balance: ' + itemGraphAttr().final_balance}</Form.Label><br></br></> : null}
        {(itemGraphAttr().firstnode) ? <><Form.Label >{'Total Transactions: ' + itemGraphAttr().total_txs}</Form.Label><br></br></> : null}

        {(itemGraphAttr().is_input != null) ? <><Form.Label >{'Type: '+ ((itemGraphAttr().is_input) ? 'Input' : 'Output')} </Form.Label><br></br></> : null }
        {(itemGraphAttr().spent != null) ? <><Form.Label >{'Spent: '+ ((itemGraphAttr().spent) ? 'Yes' : 'No')} </Form.Label><br></br></> : null }
        {(itemGraphAttr().money != null) ? <><Form.Label >{'Total Money: '+ formatMoneyToBTC(itemGraphAttr().money)}</Form.Label><br></br></> : null }

        <Form.Text>Select a Level (Current: {itemGraphAttr().alert}): </Form.Text>

        <DropdownButton id="drop" title={(levelSelect != -1 ) ? levelNode[levelSelect].name : "Threat Level"} onSelect={ (e:any) => { if(e != null)level(parseInt(e)) } }>
          {levelNode.map((item:any,key: number) => {
            return (<Dropdown.Item key={key} eventKey={key} selected={ (itemGraphAttr().alert != -1 ) ? true : false }>{item.name}</Dropdown.Item>);
          })}
        </DropdownButton>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="dark" onClick={() => setNode(currentNode) }>Apply Node</Button>
        <Button variant="secondary" onClick={() => setToggleInfo(false)}>Close</Button>
        <Button variant="primary" onClick={() => {setToggleInfo(false); setShowConfirm(true); }}>Save changes</Button>
      </Modal.Footer>

    </Modal>
  </div>;
}
export default Graph;