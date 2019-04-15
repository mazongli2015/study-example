import React from "react";
import { Route, Link, Switch, BrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";
import Tree from "./modules/Tree/components/Tree";
import "./styles.css";

const ruteConf = [
  {
    id: 0,
    pid: -1,
    name: "根目录"
  },
  {
    id: 1,
    pid: 0,
    name: "Tree组件",
    url: "/react-tree",
    path: "modules/Tree/TreeTest"
  },
  {
    id: 2,
    pid: 0,
    name: "动态加载",
    url: "/dynamic-load",
    path: "modules/dynamicLoad/Bar"
  },
  {
    id: 3,
    pid: 0,
    name: "React.memo用法",
    url: "/react-memo",
    path: "modules/Memo/Memo.js"
  }
];

const nodeRender = ({ node, treeNodes, level }) => {
  if (node.pid === -1 || (node.children && node.children.length))
    return <span>{node.name}</span>;
  return <Link to={node.url}>{node.name}</Link>;
};

const AsyncComponent = loadable(props => {
  console.info("RouteTree---AsyncComponent----", props);
  return import(`./${props.path}`);
});

// const i = 1;
const RouteTree = () => {
  return (
    <BrowserRouter>
      <div className="main">
        <div className="menu" id="tree">
          <Tree render={nodeRender} treeNodes={ruteConf} />
        </div>
        <div className="view">
          <Switch>
            {ruteConf.map(item => {
              if (item.pid === -1) return "";
              console.info("RouteTree-------", item.path);
              return (
                <Route
                  key={`route-${item.id}`}
                  path={item.url}
                  exact
                  render={() => <AsyncComponent path={item.path} />}
                />
              );
            })}

            {/* <Route
              key={`rotue-${ruteConf[i].id}`}
              path={ruteConf[i].url}
              exact
              render={() => <AsyncComponent path={ruteConf[i].path} />}
            /> */}
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default RouteTree;
