
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { updateNode } from "../store/dndSlice";
import { Node } from "@xyflow/react";
const StartWorkFlow=()=>{
    const {nodes,edges}=useSelector((state:RootState)=>state.dnd)
   
    const dispatch=useDispatch()
        const start=()=>{    
       // console.log("am value", nodes[0].data)
       // console.log("am edges", edges)
        validateNodeEdge(nodes,edges);
        dispatch(updateNode({ ...nodes[0], data: { ...nodes[0].data, value: '40', } }))
            
      // console.log("am nodes", nodes);

            ifNode('1');
        }

        const validateNodeEdge=(nodes:Node[],edges:any):boolean=>{
            const nodeMap = new Map(nodes.map((node) => [node.id, node]));
            const startNode=nodes.find((node)=>node?.data.name==='start') 
            if(startNode)
            {
                const connectedEdge=edges.find((edge:any)=>edge.source===startNode.id)
                console.log("am connectedEdges", connectedEdge)
                if(!connectedEdge)
                {
                    console.log("must have 1 edge!!")
                    return false;
                }
               const nextNode=nodeMap.get(connectedEdge.target);
               console.log("am next nextNode", nextNode)
               if(nextNode?.data.name!=='data')
               {
                    console.log("should be")
                    return false;
               }
               
                

            }
            

            const ifNodes=nodes.filter((node)=>node.data.name==='if')
            for(const ifNode of ifNodes){
                const outgoingEdges=edges.filter((edge:any)=>edge.source===ifNode.id)
                if(outgoingEdges.length!==2)
                {
                    console.log("It must have atlest 2 edges")
                    return false
                }

            }

            return true;
        }



        const ifNode=(id:string)=>{
            let ids=parseInt(id);
            const val:any=nodes[ids].data.label
            if(parseInt(val)%2===0)
            {
                console.log("true");
                resultNode(ids+1)
            }
            else{
                console.log("false");
                resultNode(ids+2)
            }
        
        }

        const resultNode=(id:number)=>{
           // nodes[id]
          // console.log(id)
        }
    
   
    return(
        <div >
            <button
            className="bg-blue-400 rounded-lg p-3 m-3 left-5" 
            onClick={start}>
                start
            </button>
        </div>
    )
}
export default StartWorkFlow