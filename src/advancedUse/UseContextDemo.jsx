import React, {useContext} from "react";

const thems = {
  light: {
    foreground: '#000',
    background: '#eee'
  },
  dark: {
    foreground: '#fff',
    background: '#222'
  }
}
// 创建 
const ThemeContext = React.createContext(thems.light)

function ThemeButton() {
  const theme = useContext(ThemeContext)
  return <button 
          style={{background: theme.background, color: theme.foreground}}
        > hello world</button>
}

function ToolBar() {
  return <div>
    <ThemeButton />
  </div>

}
function App() {
  return <ThemeContext.Provider value={thems.dark}>
    <ToolBar />
  </ThemeContext.Provider>

}

export default App