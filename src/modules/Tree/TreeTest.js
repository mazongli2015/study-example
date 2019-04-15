import React from "react";
import Tree from "./components/Tree";
import "./TreeTest.css";

export default class TreeTest extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      objectData: {
        id: 0,
        name: "根节点",
        pid: -1,
        children: [
          {
            id: 1,
            name: "节点0-1",
            pid: 0,
            children: [
              {
                id: 6,
                name: "节点0-1-6",
                pid: 1
              }
            ]
          },
          {
            id: 2,
            name: "节点0-2",
            pid: 0
          },
          {
            id: 3,
            name: "节点0-3",
            pid: 0,
            children: [
              {
                id: 4,
                name: "节点0-3-4",
                pid: 3
              },
              {
                id: 5,
                name: "节点0-3-5",
                pid: 3
              }
            ]
          }
        ]
      },
      arrayData: [
        {
          id: 5,
          name: "节点0-3-5",
          pid: 3
        },
        {
          id: 4,
          name: "节点0-3-4",
          pid: 3
        },
        {
          id: 0,
          name: "根节点",
          pid: -1
        },
        {
          id: 6,
          name: "节点0-1-6",
          pid: 1
        },
        {
          id: 2,
          name: "节点0-2",
          pid: 0
        },
        {
          id: 3,
          name: "节点0-3",
          pid: 0
        },
        {
          id: 1,
          name: "节点0-1",
          pid: 0
        }
      ]
    };
  }

  onNodeClick = (e, node) => {
    console.info("TreeTest---onNodeClick---", node);
  };

  render() {
    return (
      <div id="tree">
        <h3>数组格式的节点数据：</h3>
        <Tree onNodeClick={this.onNodeClick} treeNodes={this.state.arrayData} />
        <h3>Object格式的节点数据：</h3>
        <Tree
          onNodeClick={this.onNodeClick}
          treeNodes={this.state.objectData}
        />
      </div>
    );
  }
}
