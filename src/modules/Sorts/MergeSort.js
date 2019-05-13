import util from "./util";

export default (arr, compare) => {
  if (!util.isValidArray(arr)) return;
  return sort(arr, compare, 0, arr.length - 1, new Array(arr.length));
};

// 递归方式的归并排序
const sort = (arr, compare, start, end, res = []) => {
  const len = end - start;
  if (len === 0) {
    res[end] = arr[end];
  } else if (len === 1 && util.compare(arr[end], arr[start], compare) < 0) {
    res[end] = arr[start];
    arr[start] = arr[end];
    arr[end] = res[end];
  }

  if (len <= 1) return arr;

  const mid = parseInt((end - start) / 2, 10) + start;
  sort(arr, compare, start, mid, res);
  sort(arr, compare, mid + 1, end, res);
  merge(arr, compare, start, mid, end, res);

  return arr;
};

const merge = (arr, compare, start, mid, end, res) => {
  let cursorA = start;
  let cursorB = mid + 1;
  let i = start;
  while (cursorA <= mid && cursorB <= end) {
    const flag = util.compare(arr[cursorB], arr[cursorA], compare);
    if (flag >= 0) {
      res[i] = arr[cursorA];
      cursorA++;
    } else {
      res[i] = arr[cursorB];
      cursorB++;
    }
    i++;
  }

  while (cursorA <= mid) {
    res[i] = arr[cursorA];
    cursorA++;
    i++;
  }

  while (cursorB <= end) {
    res[i] = arr[cursorB];
    cursorB++;
    i++;
  }

  while (--i >= start) {
    arr[i] = res[i];
  }
};

// 非递归方式的归并排序
export const mergeSort = (arr, compare) => {
  if (!util.isValidArray(arr)) return;
  return sort2(arr, compare, new Array(arr.length));
};

const sort2 = (arr, compare, res) => {
  const len = arr.length;
  if (arr.length === 1) return arr;
  let step = 1;
  while (step < len) {
    const speed = 2 * step;
    for (let j = 0, l = len - step; j < l; j += speed) {
      let end = j + 2 * step - 1;
      end = end < len ? end : len - 1;
      const mid = step + j - 1;
      // console.info({ j, step, mid, end });
      merge(arr, compare, j, mid, end, res);
    }
    step = speed;
  }
  return arr;
};
