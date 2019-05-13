var onmessage = function(e) {
  var { n, box } = e.data;
  console.info(e.data);
  if (!n || !box) return;
  var els = createPathString(n, box);
  postMessage(els);
};

function createCircleElement(n, box) {
  var start = Date.now();
  var circles = [];
  for (var i = 0; i < n; i++) {
    var circle = generateCircleElement(box);
    circles.push(circle);
  }
  var end = Date.now();
  console.info("耗时：  " + (end - start) / 1000 + " 秒");
  return circles;
}

function generateCircleElement(box) {
  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  var config = getRandomCircle(box.height, box.width);
  circle.setAttribute("cy", config.y);
  circle.setAttribute("cx", config.x);
  circle.setAttribute("r", config.r);
  circle.setAttribute("fill", "none");
  circle.setAttribute("stroke-width", "1");
  circle.setAttribute("stroke", config.stroke);
  //circle.setAttribute('height', config.r * 2);
  //circle.setAttribute('width', config.r * 2);
  return circle;
}

function createPathString(n, box) {
  var start = Date.now();
  var path = "";
  var perPath = 1000;
  var paths = [];
  var configs = [];
  for (var j = 0; j <= n; j++) {
    configs[j] = getRandomCircle(box.height, box.width);
  }
  configs.sort((a, b) => a.x - b.x);
  let startX = configs[0].x;
  for (var i = 1; i <= n; i++) {
    path += getCirclePathString(configs[i - 1]);
    if (i % perPath === 0) {
      paths.push({
        domStr: `<path d="${path}" fill="none" stroke="blue" stroke-width="1" />`,
        startX,
        endX: configs[i - 1].x
      });
      path = "";
      startX = configs[i - 1].x;
    }
  }

  if (path) {
    paths.push({
      domStr: `<path d="${path}" fill="none" stroke="blue" stroke-width="1" />`,
      startX,
      endX: configs[n - 1].x
    });
  }
  var end = Date.now();
  console.info("耗时：  " + (end - start) / 1000 + " 秒");
  return paths;
}

function getCirclePathString(conf) {
  return `M ${conf.x - conf.r} ${conf.y} A ${conf.r} ${conf.r} 0 0 1 ${conf.x +
    conf.r} ${conf.y} A ${conf.r} ${conf.r} 0 1 1 ${conf.x - conf.r} ${
    conf.y
  } `;
}

function createCircleString(n, box) {
  var start = Date.now();
  var circles = "";
  for (var i = 0; i < n; i++) {
    var circle = generateCircleElement2(box);
    circles += circle;
  }
  var end = Date.now();
  console.info("耗时：  " + (end - start) / 1000 + " 秒");
  return circles;
}

function generateCircleElement2(box) {
  var conf = getRandomCircle(box.height, box.width);
  var circle = `<circle cy="${conf.y}" cx="${conf.x}" stroke="${conf.stroke}"
  r="${conf.r}" fill="none" stroke-width="1" ></circle>`;
  return circle;
}

function getRandomCircle(height, width) {
  var x = Math.random() * (width - 120) + 50;
  var y = Math.random() * (height - 120) + 50;

  var distanceX = Math.min(width - x, x);
  var distanceY = Math.min(height - y, y);
  var rMax = Math.min(distanceX, distanceY);

  var r = Math.random() * rMax;
  r = r > 50 ? r : 50;

  var colors = [];
  for (var i = 0; i < 3; i++) {
    colors.push(parseInt(255 * Math.random(), 10));
  }
  colors = "rgb(" + colors.join(",") + ")";

  return {
    x: x,
    y: y,
    r: r,
    stroke: colors
  };
}
