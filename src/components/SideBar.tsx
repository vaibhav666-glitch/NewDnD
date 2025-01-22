import React from 'react';
export default () => {
  const onDragStart = (event:React.DragEvent, nodeType:string) => {  
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
 
  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode start" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
      <div className="dndnode if" onDragStart={(event) => onDragStart(event, 'if')} draggable> 
        If Node
      </div>
      <div className="dndnode data" onDragStart={(event) => onDragStart(event, 'data')} draggable> 
        Data Node
      </div>
      
    </aside>
  );
};