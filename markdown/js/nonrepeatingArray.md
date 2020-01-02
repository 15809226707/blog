# js数组去重(复杂数据有ID的情况下)

```javascript
 // 方式一(hash)
 function nonrepeatingArray(repeatArray){
      const hash = {};
      const temp = [];
      for (let i = 0; i < repeatArray.length; i++) {
          if (!hash[repeatArray[i].id]) {
              hash[repeatArray[i].id] = true;
              temp.push(repeatArray[i]);
          }
      }
  
      return temp;
    }


 // 方式二(hash + reduce)
function nonrepeatingArray(repeatArray){
    const hash = {};
	return repeatArray.reduce(function(accumulator, currentValue){
	       if(!hash[currentValue.id]){
		       hash[currentValue.id]=true;
			   accumulator.push(currentValue)
           }  
           
        return accumulator		   
	
	}, []);
    }

```
```javascript

/*调用方式*/
const list=[
    {name:'张三', id:'123456789'},
    {name:'李四', id:'103456789'},
    {name:'赵云', id:'124456789'},
    {name:'李白1', id:'123556789'},
    {name:'张三', id:'123456789'},
    {name:'公孙浅雪', id:'123457789'},
    {name:'张三', id:'123456789'},
    {name:'张三', id:'123456789'}];

    console.log(nonrepeatingArray(list))

```