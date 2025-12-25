import React, {useState, useMemo, memo} from "react";

// 子组件
// function Child({userInfo}) {
//   console.log('Child render....', userInfo);
//   return <div>
//     <p> This is child {userInfo.name} {userInfo.age} </p>
//   </div>
// }


// 优化-memo： 类似 class PureComponent，对 props 进行浅层比较
const Child = memo(function Child({userInfo}) {
  console.log('Child render....', userInfo);
  return <div>
    <p> This is child {userInfo.name} {userInfo.age} </p>
  </div>
})
// 父组件
function App() {
  console.log('parent render....');
  const [count, setCount] = useState(0)
  const [name, setName] = useState('lisr')
  // const userInfo = { name, age: 20 }
  // 优化，使用 useMemo 缓存数据
  const userInfo = useMemo(() => {
    return { name, age: 21 }
  }, [name])

  return <div>
    <p> count is {count} 
      <button onClick={() => setCount(count + 1)}>click </button>
    </p>
    <Child userInfo={userInfo}/>
  </div>
}

export default App