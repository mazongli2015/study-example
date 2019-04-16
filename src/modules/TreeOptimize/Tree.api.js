export const isEmpty = data => {
  if (
    data === null ||
    data === undefined ||
    `${data}`.trim() === "" ||
    (data !== 0 && !data)
  ) {
    return true;
  }
  return false;
};

export const treeNode = ({ id, pid, name, ...extra }) => {
  const empty = isEmpty(id) || isEmpty(pid);
  if (empty) {
    console.error(
      { id, pid },
      "id和pid不能为null, undefined，NaN，以及空字符串."
    );
    return;
  }

  return {
    id,
    name,
    pid,
    ...extra
  };
};

/**
 * @param {object[]} arr 原始节点数组
 * @returns {Object} 改造后的节点数组增加chilren、parentIndex
 * 和index属性数组的第一个元素为根节点
 */
export const arrayToTreeNodesArray = arr => {
  if (!Array.isArray(arr)) {
    console.error("参数必须是数组");
    return;
  }

  const nodes = {};

  // 转换成普通Object形式, 记录index
  arr.forEach((item, index) => {
    const nodeItem = treeNode(item);
    if (!nodeItem) return;
    nodes[nodeItem.id] = index;
  });

  const treeNodeArr = [...arr];
  let rootNodeIndex;
  Object.keys(nodes).find(key => {
    const index = nodes[key];
    const currentNode = arr[index];
    const { pid } = currentNode;
    if (`${pid}` === "-1" && (rootNodeIndex || rootNodeIndex === 0)) {
      console.error("不止一个根节点", {
        rootNodeIndexes: [rootNodeIndex, index]
      });
      return true;
    } else if (`${pid}` === "-1") {
      rootNodeIndex = index;
    }
    let parentIndex = nodes[pid];

    treeNodeArr[index] = { ...treeNodeArr[index], parentIndex, index };
    if ((!parentIndex && parentIndex !== 0) || `${parentIndex}` === "-1")
      return false;

    if (!treeNodeArr[parentIndex].children) {
      treeNodeArr[parentIndex] = { ...treeNodeArr[parentIndex], children: [] };
    }
    treeNodeArr[parentIndex].children.push(index);
    return false;
  });

  if (rootNodeIndex || rootNodeIndex === 0) {
    treeNodeArr[rootNodeIndex].hidden = false;
    return { treeNodeArr, rootNodeIndex };
  }
  console.error("没有根节点");
  return;
};

/**
 * @param {object} treeObject 将形如{id, name, pid, children}
 * 的object数据转换为树形结构数组
 */
export const objectToTreeNodesArray = treeObject => {
  const treeNodeArr = [];
  function objectToTreeArr(sourceObject, parentIndex) {
    if (!sourceObject.children || sourceObject.children.length === 0) {
      treeNodeArr.push({
        ...sourceObject,
        parentIndex,
        index: treeNodeArr.length
      });
      return;
    }

    const { children, ...rest } = sourceObject;
    const currentNode = {
      ...rest,
      children: [],
      parentIndex,
      index: treeNodeArr.length
    };
    treeNodeArr.push(currentNode);
    for (let i = 0, len = children.length; i < len; i++) {
      currentNode.children.push(treeNodeArr.length);
      objectToTreeArr(children[i], currentNode.index);
    }
  }
  objectToTreeArr(treeObject);
  return { treeNodeArr, rootNodeIndex: 0 };
};

export const createTreeNodesArray = treeNodes => {
  if (Array.isArray(treeNodes)) {
    return arrayToTreeNodesArray(treeNodes);
  }
  if (typeof treeNodes === "object") {
    return objectToTreeNodesArray(treeNodes);
  }
};

export const changeExpandStatus = (node, treeNodes) => {
  const { children, expanded = false } = node || {};
  if (!children || children.length === 0) return;
  const nodes = [...treeNodes];
  nodes[node.index] = { ...node, expanded: !expanded };
  children.forEach(item => {
    nodes[item] = { ...nodes[item], rendered: !expanded };
  });
  return nodes;
};
