import React from "react";
import PropTypes from "prop-types";

class Mouse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        x: 0,
        y: 0
      }
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }

  render() {
    return (
      <div style={{ height: '500px'}} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    )
  }
}

Mouse.propTypes = {
  render: PropTypes.func.isRequired
}


const App = (props) => {
  return (
    <div style={{ height: '500px'}}>
      <p>{props.a}</p>
      {/* render是一个函数组件 */}
      <Mouse render={
        ({x, y}) => <h1> The mouse position is {x}, {y}</h1>
      }/>
    </div>
  )
}
/**
 * 即， 定义了 Mouse 组件， 只有获取 x y 的功能
 * 至于 Mouse 组件如何渲染，App 说了算，通过 render prop 的方式 告诉 Mouse
 */
export default App