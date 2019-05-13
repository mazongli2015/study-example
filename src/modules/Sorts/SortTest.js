import insertSort, { shellSort } from "./InsertSort";
import selectSort, { heapSort } from "./SelectSort";
import bubbleSort from "./BubbleSort";
import { mergeSort } from "./MergeSort";
import quickSort from "./QuickSort";

export default () => {
  const testArr = [7, 5, 30, 41, 41, 54, 64, 67, 70, 74]; // createRandomNumbers(10, 1, 100);
  console.info("原数组：", testArr);
  let res;
  console.info("升序排列----------------------------");
  // res = insertSort([...testArr]);
  // console.info("插入排序(升序)：", res);

  // res = selectSort([...testArr]);
  // console.info("简单选择排序(升序)：", res);

  // res = bubbleSort([...testArr]);
  // console.info("冒泡排序(升序)：", res);

  // res = shellSort([...testArr]);
  // console.info("希尔排序(升序)：", res);

  // res = mergeSort([...testArr]);
  // console.info("归并排序(升序)：", res);

  res = quickSort([...testArr]);
  console.info("快速排序(升序)：", res);

  res = heapSort([...testArr]);
  console.info("堆排序(升序)：", res);

  // console.info('降序排列----------------------------');
  // res = insertSort(testArr, (a, b) => b - a);
  // console.info("插入排序(降序)：", res);

  // res = selectSort([...testArr], (a, b) => b - a);
  // console.info("简单选择排序(降序)：", res);

  // res = bubbleSort([...testArr], (a, b) => b - a);
  // console.info("冒泡排序(降序)：", res);

  // res = shellSort([...testArr], (a, b) => b - a);
  // console.info("希尔排序(降序)：", res);

  // res = mergeSort([...testArr], (a, b) => b - a);
  // console.info("归并排序(降序)：", res);

  // res = quickSort([...testArr], (a, b) => b - a);
  // console.info("快速排序(降序)：", res);

  // res = heapSort([...testArr], (a, b) => b - a);
  // console.info("堆排序(降序)：", res);

  return "";
};

const createRandomNumbers = (n, max, min) => {
  if (n <= 0) return [];
  let i = n;
  const res = [];
  while (i > 0) {
    res.push(parseInt(Math.random() * (max - min) + min, 10));
    i--;
  }
  return res;
};
