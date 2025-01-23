import React, { useCallback } from "react";
import { useSelector,useDispatch } from "react-redux";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge as addEdgeHelper,
  Controls,
  useReactFlow,
  Background,
  OnConnect,
  Node,
  applyEdgeChanges,
  applyNodeChanges
} from "@xyflow/react";
import { RootState } from "../store/store";
import "@xyflow/react/dist/style.css";
import Sidebar from "./SideBar";
import CustomNode from "./CustomNode";
//import Custom from "./Custom";

import {
  setNodes,
  setEdges,
  addNode,
 
  updateNode

}from "../store/dndSlice";


let id = 1;
const getId = () => `${id++}`;

function DnDFlow() {
  
 // console.log("am node types", nodeTypes)
  const dispatch=useDispatch();
  const {nodes,edges} = useSelector((state: RootState) => state.dnd);
  const { screenToFlowPosition } = useReactFlow(); 
  
  const onConnect: OnConnect = useCallback(
   
    (params)=>{
    let newEdges=addEdgeHelper(params,edges)
    if(params.sourceHandle!==null){
    const edgeLabel=params.sourceHandle==="source1"?"True":"False"
     newEdges=addEdgeHelper({...params,label:edgeLabel,style:{stroke:params.sourceHandle==="source1"?"green":"red"},},edges);
    }
    
    dispatch(setEdges(newEdges));
   },
   [edges]
  ); 
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    //console.log("yooo")
    event.dataTransfer.dropEffect = "move"; 
  }, []);

  const nodeTypes={customNode:CustomNode};
 

  
  
  const onDrop = useCallback(
     (event: React.DragEvent) => {
      
      event.preventDefault();
      
      const nodeType =  event.dataTransfer.getData("application/reactflow");
      if (!nodeType) {
        console.log("Node type is missing");
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type:'customNode',
        data: { label: `${nodeType}`,name:`${nodeType}`,value:id },
        position
      };
      dispatch(addNode(newNode))
    },
    [screenToFlowPosition, dispatch]
  );

 
  const onNodeDoubleClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const newLabel = prompt("Enter new label:");
      if (newLabel) {
        dispatch(updateNode({ ...node, data: { ...node.data, label: newLabel, } }))
      }
    },
    [setNodes]
  );

  return (
    <div className="dndflow">
      <div style={{ width: "100vw", height: "100vh" }} className="reactflow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(changes) => {
            const updatedNodes = applyNodeChanges(changes, nodes);
            dispatch(setNodes(updatedNodes)); // Dispatch the updated nodes to Redux
          }}
          onEdgesChange={(changes) => {
            const updatedEdges = applyEdgeChanges(changes, edges);
           // console.log("am update edge", updatedEdges)
            dispatch(setEdges(updatedEdges)); // Dispatch the updated edges to Redux
          }}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeDoubleClick={onNodeDoubleClick} // Add double-click event
          nodeTypes={nodeTypes}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
        >
          <Controls />

          <Background />
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  );
}

export default () => (
  <ReactFlowProvider>
    <DnDFlow />
  </ReactFlowProvider>
);
