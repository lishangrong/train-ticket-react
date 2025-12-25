import React, {useState, useMemo, memo, useCallback} from "react";

// 优化-memo： 类似 class PureComponent，对 props 进行浅层比较
const Child = memo(function Child({userInfo, onChange}) {
  console.log('Child render....', userInfo);
  return <div>
    <p> This is child {userInfo.name} {userInfo.age} </p>
    <input onChange={onChange}></input>
  </div>
})
// 父组件
function App() {
  console.log('parent render....');
  const [count, setCount] = useState(0)
  const [name, setName] = useState('lisr')

  // 优化，使用 useMemo 缓存数据
  const userInfo = useMemo(() => {
    return { name, age: 21 }
  }, [name])

  // count 更新，子组件默认更新
  // function onChange(e) {
  //   console.log(e.target.value);
  // }

  // 使用useCallback
  const onChange = useCallback(e => {
    console.log(e.target.value);
  }, [])

  return <div>
    <p> count is {count} 
      <button onClick={() => setCount(count + 1)}>click </button>
    </p>
    <Child userInfo={userInfo} onChange={onChange}/>
  </div>
}

export default App