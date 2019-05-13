import util from "./util";

// 特殊处理最大值和最小值，直接略过等值区域的排序
export default (arr, compare) => {
  if (!util.isValidArray(arr)) return;
  try {
    sort(arr, compare, 0, arr.length - 1);
  } catch (e) {
    console.info(arr);
    console.error(e);
  }
  return arr;
};

const sort = (arr, compare, left, right) => {
  // console.info({left, right})
  if (left >= right) return;

  // 计算随机下标，对应的值作为比较基准
  const basisIndex = parseInt(Math.random() * (right - left + 1), 10) + left;
  const basis = arr[basisIndex];

  let i = left;
  let j = right;
  while (i < j) {
    // 从左边开始扫描，找比basis大的数组元素
    while (util.compare(arr[i], basis, compare) <= 0 && i <= right) {
      i++;
    }

    // 从右边开始扫描，找比basi小的数组元素
    while (util.compare(arr[j], basis, compare) >= 0 && j >= left) {
      j--;
    }

    if (i < j) {
      // console.info(`交换arr[${i}]=${arr[i]}和arr[${j}]=${arr[j]}后:`, arr);
      util.swap(arr, i, j);
      i++;
      j--;
    }
  }
  // console.info({ left, j, i, right, basisIndex, basis });
  if (i > right && j < left) {
    // 既找不到比basis大的元素也找不到比basis小的元素，说明所有的值都相等
    // console.info(
    //   "既找不到比basis大的元素也找不到比basis小的元素，说明所有的值都相等",
    //   { left, right }
    // );
    return;
  }
  if (i > right) {
    // 未找到比basis大的元素，说明basis是最大值
    if (basis !== arr[right]) {
      // console.info(
      //   `基准值是最大值，交换arr[${right}]=${arr[right]}和arr[${basisIndex}]=${
      //     arr[basisIndex]
      //   }后：`
      // );
      util.swap(arr, right, basisIndex);
    }
    // console.info(arr);
    sort(arr, compare, left, right - 1);
  } else if (j < left) {
    // 未找到比basis小的元素，说明basis是最小值
    if (basis !== arr[left]) {
      // console.info(
      //   `基准值是最小值，交换arr[${left}]=${arr[left]}和arr[${basisIndex}]=${
      //     arr[basisIndex]
      //   }后:`
      // );
      util.swap(arr, left, basisIndex);
    }
    // console.info(arr);
    sort(arr, compare, left + 1, right);
  } else {
    sort(arr, compare, left, j);
    sort(arr, compare, i, right);
  }
};

export const quickSort = (arr, compare) => {
  if (!util.isValidArray(arr)) return;
  try {
    sort2(arr, compare, 0, arr.length - 1);
  } catch (e) {
    console.info(arr);
    console.error(e);
  }
  return arr;
};

// 将基准值移动到分割点
const sort2 = (arr, compare, left, right) => {
  // console.info({left, right})
  if (left >= right) return;

  // 计算随机下标，对应的值作为比较基准,并把基准值放到最左端
  const basisIndex = parseInt(Math.random() * (right - left + 1), 10) + left;
  const basis = arr[basisIndex];
  util.swap(arr, left, basisIndex);

  let i = left;
  let j = right;

  while (i < j) {
    while (i < j && util.compare(arr[j], basis, compare) >= 0) {
      j--;
    }

    while (i < j && util.compare(arr[i], basis, compare) <= 0) {
      i++;
    }

    if (i < j) {
      util.swap(arr, i, j);
    }
  }
  util.swap(arr, left, j);
  sort2(arr, compare, left, i - 1);
  sort2(arr, compare, i + 1, right);
};
