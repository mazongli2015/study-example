import util from "./util";

// 避免改变arr的结构
export default (arr, compare) => {
  if (!util.isValidArray(arr)) return;
  const res = [arr[0]];
  for (let i = 1, len = arr.length; i < len; i++) {
    res.push(arr[i]);
    for (let j = i; j >= 1; j--) {
      let flag = 0;
      if (compare && typeof compare === "function") {
        flag = compare(res[j], res[j - 1]);
      } else if (res[j] > res[j - 1]) {
        flag = 1;
      } else {
        flag = -1;
      }
      if (flag >= 0) {
        break;
      } else {
        const tmp = res[j];
        res[j] = res[j - 1];
        res[j - 1] = tmp;
      }
    }
  }
  return res;
};

// 直接改变arr的结构
export const insertSort = (arr, compare) => {
  if (!util.isValidArray(arr)) return;
  for (let i = 1, len = arr.length; i < len; i++) {
    for (let j = i; j >= 1; j--) {
      let flag = 0;
      if (compare && typeof compare === "function") {
        flag = compare(arr[j], arr[j - 1]);
      } else if (arr[j] > arr[j - 1]) {
        flag = 1;
      } else {
        flag = -1;
      }
      if (flag >= 0) {
        break;
      } else {
        const tmp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = tmp;
      }
    }
  }
  return arr;
};

// 希尔排序法
export const shellSort = (arr, compare) => {
  let gap = parseInt(arr.length / 2, 10);
  while (gap >= 1) {
    for (let i = 0, len = arr.length; i < len - gap; i += gap) {
      for (let j = i + gap; j >= gap && j < len; j -= gap) {
        let flag = 0;
        if (typeof compare === "function") {
          flag = compare(arr[j], arr[j - gap]);
        } else if (arr[j] < arr[j - gap]) {
          flag = -1;
        }
        if (flag < 0) {
          const tmp = arr[j];
          arr[j] = arr[j - gap];
          arr[j - gap] = tmp;
        }
      }
    }
    gap = parseInt(gap / 2, 10);
  }
  return arr;
};
