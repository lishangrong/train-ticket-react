import React from "react";

const ThemeContext = React.createContext('light')

function ThemeLink() {
  return <ThemeContext.Consumer>
    {value => <p> link's theme is {value}</p> }
  </ThemeContext.Consumer>
}

class ThemeButton extends React.Component {
  // 指定contextType 读取当前的 theme context
  // static contextType = ThemeContext // 也可以用 hemeButton.contextType = ThemeContext 
  render() {
    const theme = this.context // React会网上找到最近的theme Provide 然后使用它的值
    return <div>
      <p>button's theme is {theme}</p>
    </div>
  }
}
ThemeButton.contextType = ThemeContext // 确定contextType 读取当前的 theme context

function Toolbar() {
  return (
    <div>
      <ThemeButton />
      <ThemeLink />
    </div>
  )
}
class ContextDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'light'
    }
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <Toolbar />
        <hr />
        <button onClick={this.onChangeTheme}>change theme</button>
      </ThemeContext.Provider>
    )
  }
  onChangeTheme = () => {
    this.setState({
      theme: this.state.theme === 'light' ? 'dark' : 'light'
    })
  }
}

export default ContextDemo