import React, { useState, useEffect } from "react";
import { createTreeNodesArray, changeExpandStatus } from "./tree.api";
import "./Tree.css";
import "../css/iconfont.css";

const TreeNodes = props => {
  const { treeNodes, rootNodeIndex, onNodeClick, render } = props;
  // console.info("Tree.js--TreeNodes--", { treeNodes, rootNodeIndex });
  const rootNode = treeNodes[rootNodeIndex];
  if (!treeNodes || treeNodes.length === 0) return "";
  return (
    <BranchNode
      onNodeClick={onNodeClick}
      render={render}
      level={0}
      treeNodes={treeNodes}
      branch={rootNode}
    />
  );
};

const BranchNode = ({ branch, onNodeClick, treeNodes, level, render }) => {
  const { children, hidden = false, expanded = false } = branch || {};
  if (hidden) return "";
  const isLeafNode = !children || children.length === 0;
  const iconClass = expanded ? "icon-jiantou_xia" : "icon-jiantou_you";
  return (
    <li className={`${isLeafNode ? "tree-leaf-node" : ""} tree-li`}>
      <span
        onClick={e => onNodeClick(e, branch)}
        className={` ${
          isLeafNode ? "" : "branch-icon-text-container"
        } level${level}`}
      >
        {!isLeafNode && (
          <span className={`iconfont ${iconClass} branch-icon`} />
        )}
        <span>
          {render && typeof render === "function"
            ? render({ node: branch, level, treeNodes })
            : branch.name}
        </span>
      </span>
      {expanded && !isLeafNode && (
        <ul className="tree-branch-node">
          {children.map(item => {
            const newBranch = treeNodes[item];
            if (!newBranch) return "";
            return (
              <BranchNode
                key={`branch-${newBranch.id}`}
                branch={newBranch}
                onNodeClick={onNodeClick}
                treeNodes={treeNodes}
                level={level + 1}
                render={render}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
};

const Tree = props => {
  const { treeNodes, onNodeClick, render } = props;
  // const nodesArrObj = createTreeNodesArray(treeNodes);
  const [nodesArrObj, setNodesArrObj] = useState(null);
  const [originNodes, setOriginNodes] = useState(null);
  // console.log("Tree.js---", { originNodes, nodesArrObj });
  useEffect(() => {
    // console.log("Tree.js---", {
    //   originNodes,
    //   treeNodes,
    //   same: originNodes === treeNodes
    // });
    if (originNodes === treeNodes) return;
    const nodesObject = createTreeNodesArray(treeNodes);
    setOriginNodes(treeNodes);
    setNodesArrObj(nodesObject);
  }, [originNodes, treeNodes]);
  const { rootNodeIndex, treeNodeArr } = nodesArrObj || {};

  const nodeClickHandler = (e, node) => {
    e.stopPropagation();
    // console.info("Tree.js---nodeClickHandler--", node);
    onNodeClick && onNodeClick(e, node);
    const newNodesArr = changeExpandStatus(node, treeNodeArr);
    // console.info("Tree.js---nodeClickHandler---", {
    //   rootNodeIndex,
    //   treeNodeArr: newNodesArr
    // });
    if (newNodesArr && newNodesArr.length > 0) {
      setNodesArrObj({ rootNodeIndex, treeNodeArr: newNodesArr });
    }
  };

  if (
    (!rootNodeIndex && rootNodeIndex !== 0) ||
    !treeNodeArr ||
    !treeNodeArr.length
  )
    return "";

  return (
    <ul className="tree-container">
      <TreeNodes
        rootNodeIndex={rootNodeIndex}
        treeNodes={treeNodeArr}
        onNodeClick={nodeClickHandler}
        render={render}
      />
    </ul>
  );
};

export default Tree;
