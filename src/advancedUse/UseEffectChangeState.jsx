import React, {useState, useEffect, useRef} from 'react';

function UseEffectChangeState() {
  const [count, setCount] = useState(0)

  // 模拟 DidMount
  // 优化--新增变量
  // let myCount = 0
  // 优化 -推荐
  const countRef = useRef(0)
  useEffect(() => {
    console.log('useEffect....', count);
    // 定时任务 -- 一直更新为 1
    const timer = setInterval(() => {
      // console.log('setInterval...', count);
      // setCount(count + 1)
      // 优化， 但打破了纯函数的规则，不推荐
      // setCount(++myCount) 
      // 优化-推荐
      console.log('setInterval...', countRef.current);
      setCount(++countRef.current)

      // 清除定时任务
      return () => clearInterval(timer)
    }, 1000)
  }, []) // 依赖为 空

  return <div>count: {count}</div>
}

export default UseEffectChangeState