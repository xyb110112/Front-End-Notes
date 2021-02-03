/**
 * 冒泡排序
 * @param {Array} arr 待排序数组
 */
const bubbleSort = (arr = []) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j + 1] < arr[j]) {
        ;[arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
      }
    }
  }
  return arr
}
/**
 * 选择排序
 * @param {Array} arr 待排序数组
 */
const selectSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    ;[arr[min], arr[i]] = [arr[i], arr[min]]
  }
  return arr
}
/**
 * 插入排序
 * @param {Array} arr 待排序数组
 */
const insertSort = (arr = []) => {
  for (let i = 1; i < arr.length; i++) {
    let pre = i - 1
    let current = arr[i]
    while (pre >= 0 && current < arr[pre]) {
      arr[pre + 1] = arr[pre]
      pre--
    }
    arr[pre + 1] = current
  }
  return arr
}
/**
 * 快速排序
 * @param {Array} arr 待排序数组
 */
const quickSort = (arr = []) => {
  const length = arr.length
  if (length < 2) {
    return arr
  }
  const left = []
  const right = []
  const middleIndex = Math.floor(length / 2)
  const middle = arr.splice(middleIndex, 1)[0]
  for (const item of arr) {
    if (item < middle) {
      left.push(item)
    } else {
      right.push(item)
    }
  }
  return [...quickSort(left), middle, ...quickSort(right)]
}
/**
 * 合并数组
 * @param {Array} left  左侧数组
 * @param {Array} right 右侧数组
 */
const merge = (left = [], right = []) => {
  const result = []
  while (left.length && right.length) {
    left[0] < right[0] ? result.push(left.shift()) : result.push(right.shift())
  }
  return result.concat(left, right)
}
/**
 * 归并排序
 * @param {Array} arr 待排序数组
 */
const mergeSort = (arr = []) => {
  const len = arr.length
  if (len < 2) {
    return arr
  }
  const middle = Math.floor(len / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}
/**
 * 构造大堆
 * @param {Array}   arr   待排序数组
 * @param {Number}  i     当前索引
 * @param {Number}  len   数组长度
 */
const heapify = (arr, i, len) => {
  //将当前值保存
  var temp = arr[i]
  //从i结点的左子结点开始，也就是2i+1处开始
  for (var j = 2 * i + 1; j < len; j = 2 * j + 1) {
    //如果左子结点小于右子结点，j指向右子结点
    if (j + 1 < len && arr[j] < arr[j + 1]) {
      j++
    }
    //如果子节点大于父节点，将子节点值赋给父节点（不用进行交换）值和索引都赋值
    if (arr[j] > temp) {
      arr[i] = arr[j]
      i = j
    } else {
      break
    }
  }
  arr[i] = temp //将temp值放到最终的位置
}
/**
 * 堆排序
 * @param {Array} arr 待排序数组
 */
const heapSort = (arr = []) => {
  //构造大顶堆
  //从最后一个非叶子结点开始,叶结点自然不用调整
  //从第一个非叶子结点从下至上，从右至左调整结构
  for (var i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
    heapify(arr, i, arr.length)
  }
  //交换堆顶元素与末尾元素；不算最后一个元素，重新调整堆
  for (var k = arr.length - 1; k > 0; k--) {
    //将堆顶元素与末尾元素进行交换
    ;[arr[0], arr[k]] = [arr[k], arr[0]]
    //不算最后一个元素，重新对堆进行调整
    heapify(arr, 0, k)
    //此处不用向上面调整一样for循环，因为此处只需要调整顶点，其他点已在上一步调整好，从顶点再往下调整，
  }
  return arr
}
