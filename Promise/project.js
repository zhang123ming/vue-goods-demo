
const fs = require('fs')

// 每当 new 一个 Promise 实例的时候，就会立即 执行这个 异步操作中的代码
// 也就是说，new 的时候，除了能够得到 一个 promise 实例之外，还会立即调用 我们为 Promise 构造函数传递的那个 function，执行这个 function 中的 异步操作代码；
 var promise = new Promise(function () {
  fs.readFile('./files/2.txt', 'utf-8', (err, dataStr) => {
    if (err) throw err
    console.log(dataStr)
  })
}) 
