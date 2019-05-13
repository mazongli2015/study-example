import React, { useRef, useState, useMemo } from "react";

const WorkerTest = () => {
  const [n, setN] = useState(10);
  const [circles, setCircles] = useState([]);
  const [width, setWidth] = useState('97%');

  const myWorker = useMemo(() => {
    return new Worker("worker.js");
  }, []);
  let svgContainer = useRef();

  const box = useMemo(() => {
    const pBox = document.getElementById("view").getBoundingClientRect();
    return { height: pBox.height * 0.79, width: pBox.width };
  }, []);

  myWorker.onmessage = e => {
    setCircles(e.data);
    const curCircles = e.data;
    if (!curCircles || curCircles.length ===0)return;
    let distanceX;
    if (curCircles.length === 1) {
      distanceX = distanceX[0].endX - distanceX[0].startX;
    } else {
      distanceX = distanceX[distanceX.length - 1].endX - distanceX[0].startX;
    }
 
    setWidth(distanceX + 1);
    let circlesStr = '';

    if (svgContainer) {
      svgContainer.innerHTML = circlesStr;
    }
  };

  return (
    <>
      <div id="svgDiv" style={{ overflowX: "auto", overflowY: "hidden", height: "80%", width }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="100%"
          height="99.7%"
          ref={ref => {
            svgContainer = ref;
          }}
        />
      </div>

      <input value={n} onChange={e => setN(e.target.value)} type="text" />
      <button
        onClick={() => {
          svgContainer.innerHTML = "";
          myWorker.postMessage({
            n,
            box
          });
        }}
      >
        确定
      </button>
      <p>
        <button onClick={() => alert(1)}>测试</button>
      </p>
    </>
  );
};

export default WorkerTest;
