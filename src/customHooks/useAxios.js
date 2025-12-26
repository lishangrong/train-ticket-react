import { useState, useEffect} from 'react'
import axios from 'axios'

// 封装 axios 发送网络请求的自定义 Hook
function useAxios(url) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState()
  useEffect(() => {
    // 利用 axios 发送网络请求
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    axios.get(url)
    .then(res => setData(res))
    .catch(err => setError(err))
    .finally(() => setLoading(false))
  }, [url]) // 依赖里有 {} || [] 引用类型

  return [loading, data, error]
}

export default useAxios