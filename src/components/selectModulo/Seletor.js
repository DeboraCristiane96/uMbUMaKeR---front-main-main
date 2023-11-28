import React, { useState } from 'react';
import { TreeSelect } from 'primereact/treeselect';
//import "antd/dist/antd.css";
  
const { TreeNode } = TreeSelect;
  
export default function Seletor() {
  
  // States to manage current value
  const [value, setValue] = useState("Parent");
  
  return (
    <div style={{
      display: 'block', width: 700, padding: 30
    }}>
      <h4>ReactJS Ant-Design TreeSelect Component</h4>
      <>
        <TreeSelect
          placeholder="Select from the Tree"
          allowClear
          showSearch
          value={value}
          onChange={() => {
            setValue(value);
          }}
        >
          <TreeNode value="Parent" title="Parent">
            <TreeNode value="ChildLeaf1" title="ChildLeaf1" />
            <TreeNode value="ChildLeaf2" title="ChildLeaf2" />
            <TreeNode value="ChildLeaf3" title="ChildLeaf3" />
            <TreeNode value="ChildLeaf4" title="ChildLeaf4" />
            <TreeNode value="ChildLeaf5" title="ChildLeaf5" />
          </TreeNode>
        </TreeSelect>
      </>
    </div>
  );
}