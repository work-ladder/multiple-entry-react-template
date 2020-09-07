import React from 'react'
import './index.less'
import './index.scss'
// import axios from 'axios'
import Child from './child'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  // UNSAFE_componentWillMount () {
  //   axios({
  //     url: '/api/list'
  //   }).then(res => console.log('mock模拟数据', res))
  //     .catch(err => console.log(err))
  // }

  render () {
    return (
      <div className='page1'>
        这是页面1
        <Child />
        <div className='test'>aaa</div>
      </div>
    )
  }
}

export default App
