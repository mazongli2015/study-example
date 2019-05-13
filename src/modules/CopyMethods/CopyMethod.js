export const shallowCopyObject = origin => {
  return { ...origin };
};

export const deepCopyObject = (origin, cache = []) => {
  if (!origin) return origin;
  if (cache.indexOf(origin) >= 0) {
    throw new Error("含有循环结构无法深拷贝------");
    return;
  }
  if (
    typeof origin === "string" ||
    typeof origin === "number" ||
    typeof origin === "boolean"
  ) {
    return origin;
  }

  if (origin instanceof String) {
    return new String(origin.toString());
  }
  if (origin instanceof Number) {
    return new Number(origin.valueOf());
  }
  if (origin instanceof Boolean) {
    return new Boolean(origin.valueOf());
  }

  const obj = {};
  if (Array.isArray(origin)) {
    cache.push(origin);
    return origin.map(item => deepCopyObject(item, cache));
  } else if (origin instanceof Object) {
    cache.push(origin);
    Object.keys(origin).forEach(key => {
      obj[key] = deepCopyObject(origin[key], cache);
    });
    return obj;
  }
  return origin;
};

export default () => {
  const data = {
    a: "aaaaa",
    a2: new String("dsadsa"),
    b: 2434,
    b2: new Number(43243),
    c: {
      d: "2222",
      e: [1, 2, 3, 4, 5, 6],
      f: [{ aa: 1, bb: "22" }, { cc: "ccc", dd: 2 }]
    },
    g: { h: "hhhh" }
  };
  console.log("浅拷贝------", shallowCopyObject(data));
  console.log("深拷贝------", deepCopyObject(data));

  try {
    const circleObject = {};
    circleObject.a = circleObject;
    console.log("深拷贝--循环结构----", deepCopyObject(circleObject));
  } catch (e) {
    console.error(e);
  }

  try {
    const circleArray = [1];
    circleArray.push(circleArray);
    console.log("深拷贝--循环数组----", deepCopyObject(circleArray));
  } catch (e) {
    console.error(e);
  }

  return "";
};
