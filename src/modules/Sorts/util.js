export default {
  isValidArray(arr) {
    if (!arr || !Array.isArray(arr) || !arr.length) return false;
    return true;
  },
  compare(a, b, compare) {
    if (typeof compare === "function") {
      return compare(a, b);
    } else if (a < b) {
      return -1;
    } else if (a === b) {
      return 0;
    }
    return 1;
  },
  swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
};
