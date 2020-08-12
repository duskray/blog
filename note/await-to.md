### 不使用 try catch 来处理 await promise
```jsx
const to = async (promise) => {
  try {
    const res = await promise
    return [null, res]
  } catch (err) {
    return [err]
  }
}
```


### function componment 的简单节流
由于function组件的特性，单纯使用throttle包装的方法将在每次渲染时重新生成，导致跨帧的节流方法无法生效  
目前尝试使用了Ref方案，姑且能解决这个问题:
```jsx
const throttleFunc = useRef(_.throttle(someFunc, 1000)).current
```

