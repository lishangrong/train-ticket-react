import { useState, useEffect } from 'react'

function useMousePosition() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  useEffect(() => {
    function mousemoveHandler(event) {
      setX(event.clientX)
      setY(event.clientY)
    }
    // 绑定事件
    document.body.addEventListener('mousemove', mousemoveHandler)

    // 解绑事件
    return () => document.body.removeEventListener('mousemove', mousemoveHandler)
  }, [])

  return [x, y]
}

export default useMousePosition