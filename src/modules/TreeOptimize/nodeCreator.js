export default (n, maxNchildren, minNChildren = 1) => {
  const nodes = [
    {
      id: 0,
      name: "节点0",
      pid: -1
    }
  ];
  let i = 1;
  let lastNchildren = 1;
  while (i < n) {
    let j = 0;
    let len = parseInt(Math.random() * maxNchildren, 10);
    len = minNChildren < len ? len : minNChildren;
    const parent = nodes.length - 1;
    while (j < len * lastNchildren && i < n) {
      nodes.push({
        id: i,
        name: `节点${i}`,
        pid: parent - parseInt(j/len, 10),
      });
      i++;
      j++;
    }
    lastNchildren = len;
  }
  return nodes;
};
