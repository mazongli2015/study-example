import React, { useState, useEffect, useCallback } from "react";
import { createTreeNodesArray, changeExpandStatus } from "./Tree.api";
import "../Tree/components/Tree.css";
import "../Tree/css/iconfont.css";

const TreeNodes = ({ render, treeNodes, onNodeClick }) => {
  return class NodesComponent extends React.Component {
    render() {
      const { currentLevel, currentParent } = this.props;
      const node = treeNodes[currentParent];
      const children = node.children;
      return (
        <Node
          data={node}
          level={currentLevel}
          onNodeClick={onNodeClick}
          render={render}
          expanded={node.expanded}
        >
          {node.expanded && children && children.length && (
            <ul className="tree-branch-node">
              {children.map(item => (
                <NodesComponent
                  key={`node-${treeNodes[item].id}`}
                  currentParent={item}
                  currentLevel={currentLevel + 1}
                />
              ))}
            </ul>
          )}
        </Node>
      );
    }
  };
};

const Node = React.memo(
  props => {
    const {
      expanded = false,
      data,
      children,
      level,
      onNodeClick,
      render
    } = props;
    const isLeafNode = !data.children || !data.children.length;
    console.info("优化Tree组件--Node--", props);
    const { name } = data;
    const iconClass = expanded ? "icon-jiantou_xia" : "icon-jiantou_you";
    return (
      <li className={`${isLeafNode ? "tree-leaf-node" : ""} tree-li`}>
        <span
          onClick={e => onNodeClick(e, data)}
          className={` ${
            isLeafNode ? "" : "branch-icon-text-container"
          } level${level}`}
        >
          {!isLeafNode && (
            <span className={`iconfont ${iconClass} branch-icon`} />
          )}
          <span>
            {render && typeof render === "function"
              ? render({ node: data, level })
              : name}
          </span>
        </span>
        {children}
      </li>
    );
  },
  (prev, next) => {
    console.log("Node-----", next, prev);
    const keys = ["expanded", "children", "level", "onNodeClick", "render"];
    for (let i = keys.length; i >= 0; i--) {
      if (prev[keys[i]] !== next[keys[i]]) return false;
    }
    if (next.data.rendered || next.data === prev.data) {
      return true;
    }
    return false;
  }
);

export default React.memo(props => {
  const { treeNodes, onNodeClick, render } = props;
  if ((Array.isArray(treeNodes) && !treeNodes.length) || !treeNodes) return "";

  const [nodesArrObj, setNodesArrObj] = useState({});
  const { rootNodeIndex, treeNodeArr } = nodesArrObj || {};
  const [NodesComponent, setNodesComponent] = useState(null);

  const nodeClickHandler = useCallback(
    (e, node) => {
      e.stopPropagation();
      onNodeClick(e, node);
      const newNodesArr = changeExpandStatus(node, treeNodeArr);
      if (newNodesArr && newNodesArr.length > 0) {
        setNodesArrObj({ rootNodeIndex, treeNodeArr: newNodesArr });
      }
    },
    [onNodeClick, rootNodeIndex, treeNodeArr]
  );

  useEffect(() => {
    const nodesObject = createTreeNodesArray(treeNodes);
    setNodesArrObj(nodesObject);
    setNodesComponent(
      TreeNodes({
        render,
        treeNodes: treeNodeArr,
        onNodeClick: nodeClickHandler
      })
    );
  }, [treeNodes, render, nodeClickHandler, treeNodeArr]);

  if (
    (!rootNodeIndex && rootNodeIndex !== 0) ||
    !treeNodeArr ||
    !treeNodeArr.length ||
    NodesComponent
  )
    return "";

  return (
    <ul className="tree-container">
      <NodesComponent currentParent={rootNodeIndex} currentLevel={0} />
    </ul>
  );
});
