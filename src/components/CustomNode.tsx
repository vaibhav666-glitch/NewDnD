import { Handle,Position } from "@xyflow/react";
import "../App.css"
const CustomNode = ({data}:any) => {
console.log("am data",data)
  const renderNode=()=>{
    switch (data.label){ 
      case "start":
        return(
          <div 
          style={{
            padding: "10px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            textAlign: "center",
          }}>
            <p>{data.label||'start Node'}</p>
          <Handle
          type="source"
          position={Position.Right}
          style={{top:'50%'}}
          />
          </div>
        )
        case "output":
          return(
            <div 
            style={{
              padding: "10px",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "center",
            }}>
              <p>{data.label||'start Node'}</p>
            <Handle
            type="target"
            position={Position.Left}
            style={{top:'50%'}}
            />
            </div>
          )

      case "if":
        return(
          <div
          style={{
            padding: "10px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            textAlign: "center",
          }}>
            <p>{data.label || "If Node"}</p>
            <Handle
              type="source"
              id="source1"
              position={Position.Right}
              style={{
                top: "40%",
              }}
            />
            <Handle
              type="source"
              id="source2"
              position={Position.Right}
              style={{
                top: "60%",
              }}
            />
             <Handle
              type="target"

              position={Position.Left}
              style={{
                top: "50%",
              }}
  
            />

          </div>
        )


        case "data":
        return(
          <div 
          style={{
            padding: "10px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            textAlign: "center",
          }}>
            <p>{data.label||'start Node'}</p>
          <Handle
          type="target"
          position={Position.Left}
          style={{top:'50%'}}
          />
           <Handle
          type="source"
          position={Position.Right}
          style={{top:'50%'}}
          />
          </div>
        )
        default:
          return <div>Unknown Node Type</div>; // Handle unrecognized node types
      
    }
  }
  
  
return(
  <>
  {renderNode()}
  </>
)

}
export default CustomNode