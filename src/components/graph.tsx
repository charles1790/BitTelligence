import { ReactNode, useEffect } from 'react';
import { useSigma, useLoadGraph } from 'react-sigma-v2'
import erdosRenyi from "graphology-generators/random/erdos-renyi";
import forceAtlas2 from 'graphology-layout-forceatlas2';
import { DirectedGraph } from 'graphology';
import { SigmaContainer } from 'react-sigma-v2';
import data from './data.json'

const getRandomPosition = () => ({
    x: (Math.random() - .5)*100,
    y: (Math.random() - .5)*100
});

const randomisePosition = (position: {x: number, y: number}) => ({
    x: position.x - (Math.random() - .5)*10,
    y: position.y - (Math.random() - .5)*10
});


const CustomGraph: React.FC = () => {
    const loadGraph = useLoadGraph();
    
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
    
    return <div></div>;
}

function Graph() {
    return (
        <div style={{ border: "1px solid black"}}>
            <SigmaContainer>
            <CustomGraph />
            </SigmaContainer>
        </div>
    )
}

export default Graph;