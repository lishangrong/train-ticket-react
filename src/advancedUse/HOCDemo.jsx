import React from "react";

// eslint-disable-next-line no-unused-vars
const withMouse = (Position) => {
  class withMouseComponent extends React.Component {
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
          {/* 1. 透传所有 props 2. 增加 mouse 属性 */}
          <Position {...this.props} mouse={this.state} />
        </div>
      )
    }
  }

  return withMouseComponent
}

// eslint-disable-next-line react-refresh/only-export-components
const Position = (props) => {
  const {x, y} = props.mouse // 接收 mouse 属性
  return (
    <div style={{ height: '500px' }}>
      <h1>The mouse position is ({x}, {y})</h1>
    </div>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export default withMouse(Position) // 返回高阶组件