import React from "react";

class EventDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'zhangsan',
      list: [
        {
          id: 'id-1',
          title: '标题1'
        },
        {
          id: 'id-2',
          title: '标题2'
        },
        {
          id: 'id-3',
          title: '标题3'
        }
      ]
    }
    this.clickHandler1 = this.clickHandler1.bind(this)
  }
  render() {
    // this - 使用bind
    // return <p onClick={this.clickHandler1}>{this.state.name}</p>
    
    // this 使用静态方法
    // return <p onClick={this.clickHandler2}>clickHandler2 {this.state.name}</p>
    
    // event
    return <a href="https:// imooc.com/" onClick={this.clickHandler3}>click me</a>

    // 传递参数-用bind(this, a, b)
    // return <ul>
    //   {this.state.list.map((item, index) => {
    //     return <li key={item.id} onClick={this.clickHandler4.bind(this, item.id, item.title)}>
    //       index {index}; title {item.title}
    //     </li>
    //   })}
    // </ul>
  }

  clickHandler1() {
    this.setState({
      name: 'lisr'
    })
  }

  clickHandler2 = () => {
    this.setState({
      name: 'lisr'
    })
  }
  clickHandler3 = (event) => {
    event.preventDefault() // 阻止默认行为
    event.stopPropagation() // 阻止冒泡
    console.log('target', event.target); // 指向当前元素，即当前元素触发
    console.log('current target', event.currentTarget);// 指向当前元素 假象！！！
    
    console.log('event', event); // 不是原生的Event, 原生的MouseEvent
    console.log('event.__proto__constructor', event.__proto__.constructor);
    

    // 原生 event 如下， 其 __proto_constructor 是MouseEvent
    console.log('nativeEvent', event.nativeEvent);
    console.log('nativeEvent target', event.nativeEvent.target); // 指向当前元素，即当前元素触发
    console.log('nativeEvent current target', event.nativeEvent.currentTarget); // 指向 document ！！！<div id="root">...</div>

    // React 事件中的Event
    // 1. event 是 SyntheticEvent 模拟出来的 DOM 事件所有能力
    // 2. event.nativeEvent 是原生事件对象
    // 3. 所有的事件，都被挂载到document 上
    // 4. 和 DOM 事件不一样，和 Vue 事件也不一样
  }
  clickHandler4(id, title, event) {
    console.log(id, title);
    console.log('event', event); // 最后追加一个参数，即可接收 event
  }

}

export default EventDemo