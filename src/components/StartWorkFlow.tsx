
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { updateNode } from "../store/dndSlice";
const StartWorkFlow=()=>{
    const {nodes,edges}=useSelector((state:RootState)=>state.dnd)
   
    const dispatch=useDispatch()
        const start=()=>{
     
        console.log("am value", nodes[0].data)
        console.log(nodes[0].data.value)
        dispatch(updateNode({ ...nodes[0], data: { ...nodes[0].data, value: '40', } }))
            
       console.log("am nodes", nodes);

            ifNode('1');
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