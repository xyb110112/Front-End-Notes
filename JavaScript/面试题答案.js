//------------------------START(千分位化)---------------------------

/**
 * 将数字千分位化，例如将1234567数字变成千分位格式1,234,567(利用正则)
 * @param {String|Number} num
 * @returns {Any}
 */
const formatNumberByRegExp = (num) => {
  if (typeof num === 'string' || typeof num === 'number') {
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};
/**
 * 将数字千分位化，例如将1234567数字变成千分位格式1,234,567(利用栈)
 * @param {String|Number} num
 * @returns {Any}
 */
const formatNumberByStack = (num) => {
  if (typeof num === 'string' || typeof num === 'number') {
    let numStr = String(num);
    let result = '';
    const stack = numStr.split('');
    let n = 0;
    while (stack.length) {
      const char = stack.pop();
      result = char + result;
      n++;
      if (n === 3) {
        result = ',' + result;
        n = 0;
      }
    }
    return result.startsWith(',') ? result.substring(1) : result;
  }
};

//------------------------END(千分位化)-----------------------------

//------------------------START(转换树)---------------------------

/**
 * 将数据结构为[
              { id: '1', parentId: '0' },
              { id: '1-1', parentId: '1' },
            ]
 * 改成树状结构为
            [
              {
                id: '1',
                parentId: '0',
                children: [
                  {
                    id: '1-1',
                    parentId: '1',
                  },
                ],
              },
            ]
 * @param {Array} arr 
 */
const transFlatToTree = (arr = []) => {
  if (!Array.isArray(arr)) {
    return;
  }
  const result = [];
  const map = Object.create(null);
  for (const node of arr) {
    map[node.id] = node;
  }
  for (const node of arr) {
    const { parentId } = node;
    const parentNode = map[parentId];
    if (!parentNode) {
      result.push(node);
    } else {
      (parentNode.children || (parentNode.children = [])).push(node);
    }
  }
  return result;
};

//------------------------END(转换树)-----------------------------

//------------------------START(扁平化数组)---------------------------

/**
 * 扁平化数组
 * @param     {Array}   arr       原数组
 * @param     {Number}  depth     扁平层数
 * @returns   {Array}
 */
const flatArray = (arr = [], depth = Infinity) => {
  return depth > 0
    ? arr.reduce((acc, cur) => {
        return acc.concat(Array.isArray(cur) ? flatArray(cur, depth - 1) : cur);
      }, [])
    : arr.slice();
};

//------------------------END(扁平化数组)---------------------------

//------------------------START(Vue EventBus)------------------------

class EventBus {
  constructor() {
    this.events = Object.create(null);
  }
  on(name, fn) {
    (this.events[name] || (this.events[name] = [])).push(fn);
    return this;
  }
  emit(name, ...args) {
    if (this.events[name]) {
      this.events[name].forEach((fn) => {
        fn(...args);
      });
    }
    return this;
  }
  once(name, fn) {
    const that = this;
    function on() {
      that.off(name, on);
      fn.apply(that, arguments);
    }
    this.on(name, on);
    return this;
  }
  off(name, fn) {
    if (!name) {
      this.events = Object.create(null);
      return this;
    }
    const cbs = this.events[name];
    if (!cbs) {
      return this;
    }
    if (!fn) {
      this.events[name] = null;
      return this;
    }
    let cb;
    let i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return this;
  }
}

//------------------------END(Vue EventBus)------------------------

//------------------------START(串行执行Promise)------------------------

/**
 * 串行执行promise(利用reduce)
 * @param {Array} promiseList
 */
const runPromiseBySequence = (promiseList) => {
  promiseList.reduce((pre, cur) => pre.then(() => cur()), Promise.resolve());
};

/**
 * 串行执行promise(利用 async await)
 * @param {Array} promiseList
 */
const runPromiseBySequence2 = async (promiseList) => {
  for (const promise of promiseList) {
    await promise();
  }
};
/**
 * 创建promise
 * @param       {Number}    time        延长时间
 * @param       {Any}       payload     打印参数
 * @returns     {Function}
 */
const createPromise = (time, payload) => () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log('promise', payload);
      resolve();
    }, time)
  );

//------------------------END(串行执行Promise)------------------------

//------------------------START(并发请求)--------------------------

class Scheduler {
  constructor(limit = 2) {
    this.taskList = [];
    this.limit = limit;
    this.runningCount = 0;
  }
  add(promiseCreator) {
    return new Promise((resolve) => {
      this.taskList.push({ promiseCreator, resolve });
    });
  }
  run() {
    if (this.taskList.length && this.runningCount < this.limit) {
      this.runningCount++;
      let { promiseCreator, resolve } = this.taskList.shift();
      Promise.resolve(promiseCreator()).then((res) => {
        resolve(res);
        this.runningCount--;
        this.run();
      });
    }
  }

  start() {
    for (let i = 0; i < this.limit; i++) {
      this.run();
    }
  }
}

const scheduler = new Scheduler();

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });
const addTask = (time, order) => {
  scheduler
    .add(() => timeout(time))
    .then(() => console.log(time, 'time, order', order));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

// scheduler.start();

/* output: 2 3 1 4
一开始，1、2两个任务进入队列
500ms时，2完成，输出2，任务3进队
800ms时，3完成，输出3，任务4进队
1000ms时，1完成，输出1
1200ms时，4完成，输出4 
*/

//------------------------END(并发请求)------------------------

//------------------------START(数字转为汉字))--------------------------

const ArabNumber2Chinese = {
  ary0: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
  ary1: ['', '十', '百', '千'],
  ary2: ['', '万', '亿', '兆'],
  transfer: function (name) {
    const ary = name.split('').reverse();
    let zero = '';
    let newary = '';
    let i4 = -1;
    for (let i = 0; i < ary.length; i++) {
      if (i % 4 === 0) {
        //首先判断万级单位，每隔四个字符就让万级单位数组索引号递增
        i4++;
        newary = this.ary2[i4] + newary; //将万级单位存入该字符的读法中去
        zero = ''; //在万级单位位置的“0”肯定是不用的读的，所以设置零的读法为空
      }
      //关于0的处理与判断
      if (ary[i] === '0') {
        //如果读出的字符是“0”，执行如下判断这个“0”是否读作“零”
        switch (i % 4) {
          case 0:
            //如果位置索引能被4整除，表示它所处位置是万级单位位置，这个位置的0的读法在前面就已经设置好了，所以这里直接跳过
            break;
          case 1:
          case 2:
          case 3:
            //如果不被4整除，那么都执行这段判断代码：如果它的下一位数字（针对当前字符串来说是上一个字符，因为之前执行了反转）也是0，那么跳过，否则读作“零”
            if (ary[i - 1] != '0') {
              zero = '零';
            }
            break;
        }

        newary = zero + newary;
        zero = '';
      } else {
        //如果不是“0” 就将该当字符转换成数值型,并作为数组ary0的索引号,以得到与之对应的中文读法，其后再跟上它的的一级单位（空、十、百还是千）最后再加上前面已存入的读法内容。
        newary = this.ary0[parseInt(ary[i])] + this.ary1[i % 4] + newary;
      }
    }
    return newary.startsWith('零') ? newary.substring(1) : newary;
  },
};

console.log(ArabNumber2Chinese.transfer('1204'));

//------------------------END(数字转为汉字))--------------------------
