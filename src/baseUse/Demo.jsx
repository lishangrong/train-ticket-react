import React from "react";

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      count: 0,
      name: 'lisr',
    }

    this.nameInputRef = React.createRef()
  }

  componentDidMount() {
    this.setState({ count: this.state.count + 1 })
    console.log('1-',this.state.count); // 异步-0
    this.setState({count: this.state.count + 1})
    console.log('2-', this.state.count); // 异步-0   传入对象，多次设置会合并成一次
    setTimeout(() => {
      this.setState({count: this.state.count + 1})
      console.log('3-', this.state.count);  // 2
    }, 0)
    
    setTimeout(() => {
      this.setState({count: this.state.count + 1})
      console.log('4-',this.state.count); // 3
    }, 0)
  }


  render() {
    // return <h1 style={{fontSize: '16px'}}>{ this.state.count}</h1>
     // 原生 html
    // const rawHtml = '<span>富文本内容<i>斜体</i><b>加粗</b></span>'
    // const rawHtmlData = {
    //   __html: rawHtml  // 注意， 必须是这种格式
    // }
    // const rawHtmlElem = <div>
    //   <p dangerouslySetInnerHTML={rawHtmlData}></p>
    //   <p>{rawHtml}</p>
    // </div>
    return (
      <div>
        <input defaultValue={this.state.name} ref={this.nameInputRef}/>
        <p>state.name: {this.state.name}</p>
        <button onClick={this.alertName}> alert name</button>
      </div>
    )
  }
  alertName = () => {
    const elem = this.nameInputRef.current
    alert(elem.value)
  }
}

export default Root