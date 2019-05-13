import util from "./util";

// 简单选择排序
export default (arr, compare) => {
  if (!util.isValidArray(arr)) return;
  for (let i = arr.length - 1; i >= 0; i--) {
    let max = i;
    for (let j = i - 1; j >= 0; j--) {
      let flag = 1;
      if (typeof compare === "function") {
        flag = compare(arr[max], arr[j]);
      } else if (arr[max] < arr[j]) {
        flag = -1;
      }
      if (flag < 0) {
        max = j;
      }
    }
    if (max !== i) {
      const tmp = arr[max];
      arr[max] = arr[i];
      arr[i] = tmp;
    }
  }
  return arr;
};

// 堆排序
export const heapSort = (arr, compare) => {
  let end = arr.length - 1;
  buildHeap(arr, compare);
  while (end > 0) {
    console.info(`交换arr[0]=${arr[0]},arr[${end}]=${arr[end]}后：`);
    util.swap(arr, 0, end);
    end--;
    const lastParent = Math.floor((end - 1) / 2);
    console.info(arr, `end=${end}`);
    adjustDown(arr, 0, lastParent, end, compare);
    console.info({ curParent: 0, lastParent, end });
  }
  return arr;
};

const buildHeap = (arr, compare) => {
  if (arr.length === 1) return arr;
  const end = arr.length - 1;
  const lastParent = Math.floor(arr.length / 2 - 1);
  for (let i = lastParent; i >= 0; i--) {
    adjustDown(arr, i, lastParent, end, compare);
  }
};

const adjustDown = (arr, curParent, lastParent, end, compare) => {
  if (curParent > lastParent) return;

  while (curParent <= lastParent) {
    const left = 2 * curParent + 1;
    const right = 2 * curParent + 2;
    let maxChild = left;
    if (right <= end && util.compare(arr[right], arr[left], compare) > 0) {
      maxChild = right;
    }

    if (util.compare(arr[curParent], arr[maxChild], compare) < 0) {
      util.swap(arr, curParent, maxChild);
      curParent = maxChild;
    } else {
      return;
    }
  }
};
