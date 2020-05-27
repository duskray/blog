# 关于useEffect，以身试法

这是一篇关于useEffect的笔记

## Function组件的渲染

考虑如下代码

```jsx
const Example = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      console.log(count);
    }, 3000);
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}

ReactDOM.render(<Example />, document.getElementById('root'))
```

[Run](https://codepen.io/duskray/pen/NWPdZVx)

似乎……

## 没有数据绑定

实际上我们执行的是

```js
console.log(3)
```

常规js方法也符合这一行为

```js
function clg(param) {
  const id = param.id;
  setTimeout(() => {
    alert(id);
  }, 3000);
}

clg({id: 1})
clg({id: 2})
clg({id: 3})
```

渲染是一个独立行为，props、state在单次渲染中保持不变，即使是渲染中的异步函数调用使用的也是本次渲染的count值。

这就解释了为什么我们需要使用setState方法更新state而非直接修改，它能确保在单次渲染中state不受污染。

我曾经认为对于一个组件effect是不变的，而事实上每次渲染的effect都不相同


```js
const Example = () => {
  React.useEffect(() => {
    setTimeout(() => {
      console.log(1)
    }, 3000)
  })
}

const Example = () => {
  React.useEffect(() => {
    setTimeout(() => {
      console.log(2)
    }, 3000)
  })
}

const Example = () => {
  React.useEffect(() => {
    setTimeout(() => {
      console.log(3)
    }, 3000)
  })
}
```

## Class和Function仅仅是写法的差异么

考虑如下代码

```jsx
class Example extends React.Component {
  state = {
    count: 0
  }

  componentDidUpdate() {
    setTimeout(() => {
      console.log(this.state.count);
    }, 3000);
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({
          count: this.state.count + 1
        })}>
          +1
        </button>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Example />, rootElement);

```

[Run](https://codepen.io/duskray/pen/wvBgLYv)

this.state.count会使用最新的count值，而非本次渲染。这是由于对于class，React会修改this.state的指向以保持最新。


## 怎么修

Class可以使用闭包模仿Function行为

[像这样](https://codepen.io/duskray/pen/qBEpGdR)

Function可以使用Ref获取最新的state

```js
const latestCount = useRef(count);

useEffect(() => {
  latestCount.current = count;
  setTimeout(() => {
    console.log(latestCount.current)
  }, 3000)
})
```

不过，这违背Function的常规模型且依赖时间次序，慎

## effect的清理

对于state.id = 1，执行id + 1

我本以为React会在清理执行结束后才开始第二次渲染

不过与印象不太一致，effect清理的过程是

> 渲染({id: 2}) => 清理({id: 1}) => 执行({id: 2})的effect

清理函数属于上一次渲染，因此其访问的也是上一次state

这可以使应用显得流畅

## 哲学！

我总是会使用Class的模型处理Function

就像曾经用Jquery的模型处理React

某种程度上来说，传统js开发是处理过程，而React则处理结果

根据数据进行渲染，mount、update应该并没有什么区别

这么想的话，Function的生命周期似乎……有点奇怪

## 生命周期？

在初期开发Function的时候，我常常会想，这里我需要一个didMount，那么Function里我该怎么写，这不太对劲

使用Function似乎不该去模仿生命周期行为

Function仅仅获取数据，同步，渲染

## 没有shouldUpdate，那Function的性能？

显然，React并不能区分effect函数是否更新，因此我们需要useEffect的第二个参数deps

如果本次渲染时deps与上一次渲染时相同，React会跳过本次effect

不过，我们不该忽略react-hooks/exhaustive-deps规则，effect使用的任何依赖都应该包含在deps中

这可以避免effect在"该执行的时候不执行"，但是会有一些别的问题，比如无限循环，或者频繁effect的性能问题

如果我们要实现一个计时器，我们可能会这样

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(id);
}, [count])
```

显然，当count改变时，我们会先clearInterval然后再setInterval，这确实能实现需求但是这很不理想

## 处理依赖

我们可以试着消除依赖

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(count => count + 1);
  }, 1000);
  return () => clearInterval(id);
}, []);
```

但是更复杂的情况怎么办

## 比如

如果我们有多个依赖，仍然考虑计数器，如果我们需要在页面设置步长

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + step);
  }, 1000);
  return () => clearInterval(id);
}, [step]);
```

虽然它也能正常完成需求，但我们修改step后依然会导致上述问题：不必要的clearInterval

## 考虑使用reducer

引入reducer可以让我们仅仅“描述行为”，而非“更新状态”

```jsx
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
}

const initialState = {
  count: 0,
  step: 1,
};

const reducer = (state, action) => {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}
```

## 你确定这有用？

是的，我们不再依赖任何状态，而React会确保dispatch不可变，直到组件销毁

> 既然不可变，effect的deps不写入dispatch似乎也没什么问题，不过编码规范不建议这么做
> 
> 如果未来我们有一个足够先进的编译器，我们就可以不必手动指定deps，统一行为总是好的

使用action描述行为，effect和state便可完成解耦

## 另一种情况

如果我们的effect依赖props的值，比如props.step

这时我们可以将reducer定义在组件内部，并在reducer内部访问props

```jsx
const reducer = (state, action) => {
  if (action.type === 'tick') {
    return state + step;
  } else {
    throw new Error();
  }
}
```

## 等等！

我们已经知道，单次渲染的state和props不变

那dispatch调用时，reducer怎么知道未来的props？

这是因为，dispatch调用时React仅仅记录action，而在下一次渲染时reducer才会被调用

因此，在这种情况下dispatch仍然是不可变的，写入deps不会引起额外的性能损耗

总之，useReducer将描述行为和状态更新分离，移除了effect不必要的依赖

## 更常见的情况

如果我依赖了一个外部方法，比如antd-form的相关处理，由于每次渲染都会获取一个新的方法，这会导致频繁的effect调用甚至无限循环

换言之，deps失效了

这时，如果函数没有使用组件内的任何值，我们可以定义在组件外部

```jsx
function getFetchUrl(query) {
  return 'https://hn.algolia.com/api/v1/search?query=' + query;
}

function SearchResults() {
  useEffect(() => {
    const url = getFetchUrl('react');
    // ...
  }, [])
}
```

或者，更多的时候

## 使用useCallback

```jsx
export const useFetch = (
  fn: (params: Params) => Promise<any>,
  options: optionsType = defaultOptions
): manualStateType => {
  const [state, set] = useState<stateType>({
    loading: false,
  })

  const run = useCallback((params: Params) => {
    return new Promise((resolve, reject) => {
      // ...
    })
  }, [query])

  return { ...state, run }
}
```

useCallback为我们的方法添加了一层依赖检查，使方法本身“不变”，如此，避免effect的重复执行

此时，我们通过useEffect和uesCallback建立了同步

如果query改变，run也会同步改变，最终变化会同步到组件effect，我们可以在effect内重新执行run获取新的数据

## 数据流，同步，是Function的心智模型

想象一下Class如何实现

fetchData是来自props方法，他接受一个参数query

显然我们无法通过 this.props.fetchData !== prevProps.fetchData 观察到任何变化

他们始终相等，query改变时我们在组件内部无法感知，无法重新发送请求

除非我们将query也引入props，但是query又并不参与组建渲染，仅仅是为了告诉我们fetchData改变了

## 我们习惯于传递非必要的props

以至于忘了这并不合理

我们传递props可能仅仅为了判断状态，因为我们不知道传入的 this.props.fetchData 是否依赖状态

使用useCallback，useMemo之类的Hook，则可以减少类似的情况

## 确实，我人出了问题

类似的，我曾经使用ref或者key = key + 1来在组件外部触发一个内部方法，现在看来使用Function可能是更好的选择

在使用Function和Hook时，不再去模仿Class的生命周期，转而使用数据流和同步思维，或许更有帮助。

## 参考

[By Dan Abramov](https://github.com/gaearon/overreacted.io/blob/master/src/pages/a-complete-guide-to-useeffect/index.md)
