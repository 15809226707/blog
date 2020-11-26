# js浮点数计算加减乘除精度损失解决方法

```javascript

/**
 * js浮点数计算加减乘除精度损失解决方法
 * 
 * @param {Number} a 数值a
 * @param {Number} b 数值b
 * @param {String} computeType 加减乘除类型 add加  subtract减  multiply乘  divide除
 * @return {Number} 返回计算结果，floatNumber(0.11, 0.03, 'add')
 * 
 */
 const floatNumber = (a, b, computeType) =>{
    const isInteger= obj =>{
        return Math.floor(obj) === obj
    }
    const toInteger= floatNum =>{
        const ret = {times: 1, num: 0}
        if (isInteger(floatNum)) {
            ret.num = floatNum
            return ret
        }
        const strfi  = floatNum + ''
        const dotPos = strfi.indexOf('.')
        const len    = strfi.substr(dotPos+1).length
        const times  = Math.pow(10, len)
        const intNum = parseInt(floatNum * times + 0.5, 10)
        ret.times  = times
        ret.num    = intNum
        return ret
    }
    const operation=(a, b, computeType) =>{
        const o1 = toInteger(a)
        const o2 = toInteger(b)
        const n1 = o1.num
        const n2 = o2.num
        const t1 = o1.times
        const t2 = o2.times
        const max = t1 > t2 ? t1 : t2
        let result = null
        switch (computeType) {
            case 'add':
                if (t1 === t2) { // 两个小数位数相同
                    result = n1 + n2
                } else if (t1 > t2) { // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2)
                } else { // o1 小数位 小于 o2
                    result = n1 * (t2 / t1) + n2
                }
                return result / max
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2)
                } else {
                    result = n1 * (t2 / t1) - n2
                }
                return result / max
            case 'multiply':
                result = (n1 * n2) / (t1 * t2)
                return result
            case 'divide':
                result = (n1 / n2) * (t2 / t1)
                return result
        }

    }

    return operation(a, b, computeType)
}




```
