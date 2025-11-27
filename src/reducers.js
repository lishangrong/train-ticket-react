  const reducers = {
    // state 只指 todos
    todos(state, action){
      const {type, payload} = action
      switch(type) {
        case 'set':
          return payload
        case 'add':
          return [...state, payload]
        case 'remove':
          return  state.filter(todo => {
              return todo.id !== payload
            })
        case 'toggle':
          return  state.map(todo => {
              return todo.id === payload ? {
                ...todo,
                complete: !todo.complete
              } : todo
            })
      
      }
      return state
    },
    incrementCount(state, action) {
      // state 指 incrementCount
      const { type } = action
      switch(type) {
        case 'set':
        case 'add':
          return state + 1
      }
      return state
    }
  }

function combineReducers(reducers) {
  // state： 包含所有数据
  return function reducer(state, action) {
    const changed = {}
    for (const key in reducers) {
      changed[key]= reducers[key](state[key], action)
    }

    return {
      ...state,
      ...changed
    }
  }
}

export default combineReducers(reducers)