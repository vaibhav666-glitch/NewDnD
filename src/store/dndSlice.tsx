import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Node,Edge } from "@xyflow/react";

interface DnDState{
    
    nodes:Node[];
    edges:Edge[];
}
const initialState: DnDState={
    
    nodes:[
        {
        id:"0",
        type:'customNode',
        data:{label:'start',name:'start',value:1},
        position:{x:250,y:5},
        }
    ],
    edges:[],
}

const dndSlice=createSlice({
    name:'dnd',
    initialState,
    reducers:{
        
       // setType(stae,action:PayloadAction<string>){}
        setNodes(state,action:PayloadAction<Node[]>){
            state.nodes=action.payload;
        },
        setEdges(state,action:PayloadAction<Edge[]>){
            state.edges=action.payload;
        },

        updateNode: (state, action: PayloadAction<Node>) => {
            state.nodes = state.nodes.map((node) =>
              node.id === action.payload.id ? action.payload : node
            );
          },
          addEdge: (state, action: PayloadAction<Edge>) => {
            state.edges.push(action.payload);
          },
          addNode: (state, action: PayloadAction<Node>) => {
            const node=action.payload;
            if(!node.data){
                node.data = { label: "Unknown", name: "unknown", value: -1 };
            }
            state.nodes.push(action.payload);
          },


    },
})

export const{
    setNodes,setEdges,updateNode,addEdge,addNode
}=dndSlice.actions;

export default dndSlice.reducer;