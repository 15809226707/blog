# js生成任意位数随机数

```javascript

/**
 * 生成任意位数随机数(数字)
 * 
 * @param {Number} n 可选长度位数
 * @return {Number} 返回随机值
 * 
 */
 const randomNumber =n =>{
      let rnd = '';
      for (let i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10);
      }
      return rnd;
}

/**
 * 随机生成一个自定义长度，不重复的字母加数字组合，可用来做id标识
 * 
 * @param {Number} randomLength 可选长度位数，默认10
 * @return {String} 返回随机值
 * 
 */
 const randomId =(randomLength = 10) =>{
    return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
},



```
