import React from 'react'
// import './index.scss'
import axios from 'axios'
import { Button } from 'fish'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    axios({
      url: '/api/list'
    }).then(res => console.log('mock模拟数据', res))
      .catch(err => console.log(err))
  }

  render () {
    return (
      <div className='page1'>
        这是页面1
        <Button>测试</Button>
      </div>
    )
  }
}

export default App
