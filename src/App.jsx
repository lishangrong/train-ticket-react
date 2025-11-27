import { useState, memo, useCallback, useRef, useEffect} from 'react'
import { 
  createSet,
  createAdd,
  createToggle,
  createRemove
} from './actions'
import reducer from './reducers'
import './App.css'
const LS_KEY = '_$_todos'
let store = {
  todos: [],
  incrementCount: 0
}

function bindActionCreators(actionCreators, dispatch){
  const ret = {}
  for(let key in actionCreators) {
    ret[key] = function(...args) {
      const actionCreator = actionCreators[key]
      const action = actionCreator(...args)
      dispatch(action)
    }
  }

  return ret
}

const Control = memo(function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()
  const onSubmit = (e) => {
    e.preventDefault()
    const newText = inputRef.current.value.trim()
    if(newText.length === 0) {
      return
    }
    addTodo(newText)
    inputRef.current.value = ''
  }
  return (<div className='control'>
    <h1>todos</h1>
    <form action="" onSubmit={onSubmit}>
      <input ref={inputRef} type="text" className='new-todo' placeholder='What needs to be done?' />
    </form>
  </div>)
})
function TodoItem(props) {
  const {todo: {id, text, complete}, removeTodo, toggleTodo} = props
  const onChange = () =>{
    toggleTodo(id)
  }
  const onRemove = () =>{
    removeTodo(id)
  }
  return (
    <li className='todo-item'>
      <input type="checkbox" onChange={onChange} checked={complete} />
      <label className={complete ? 'complete': ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
}
function Todos(props) {
  const {todos, removeTodo, toggleTodo} = props
  return (
    <ul className='todos'>
      {
        todos.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              toggleTodo={toggleTodo}
            />)
        })
      }
    </ul>
  )
}
function TodoList() {
  const [todos, setTodos] = useState([])
  const [incrementCount, setIncrementCount] = useState(0)

  useEffect(() => {
    Object.assign(store, {
      todos,
      incrementCount
    })
  }, [todos, incrementCount])
  const dispatch = (action) => {
    const setter = {
      todos: setTodos,
      incrementCount: setIncrementCount
    }

    if ('function' === typeof action) {
      action(dispatch, () => store)
      return
    }
    const newState = reducer(store, action)
    for (const key in newState) {
      setter[key](newState[key])
    }
  }

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    setTimeout(() => {
      dispatch(createSet(list))
    })
  }, [])
  useEffect(() =>{
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])



  return (
    <div className='todo-list'>
      <p>{incrementCount}</p>
      <Control 
      { 
        ...bindActionCreators({
          addTodo: createAdd
        }, dispatch)
      }
      />
      <Todos todos={todos} {
        ...bindActionCreators({
          removeTodo: createRemove,
          toggleTodo: createToggle
        }, dispatch)
      } />
    </div>
  )
}

export default TodoList
