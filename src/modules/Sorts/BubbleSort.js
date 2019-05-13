import util from "./util";

export default (arr, compare) => {
  if (!util.isValidArray(arr)) return;
  for (let i = 0, len = arr.length; i < len; i++) {
    let completed = true;
    for (let j = 0, l = len - i - 1; j < l; j++) {
      let flag = 0;
      if (typeof compare === "function") {
        flag = compare(arr[j + 1], arr[j]);
      } else if (arr[j] > arr[j + 1]) {
        flag = -1;
      }
      if (flag < 0) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        completed = false;
      }
    }
    if (completed) return arr;
  }
  return arr;
};
