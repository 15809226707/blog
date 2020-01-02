# js生成任意位数随机数

```javascript

 function randomFn(n){
      let rnd = '';
      for (let i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10);
      }
      return rnd;
    }



```
```javascript

/*调用方式*/

 randomFn(6)

```