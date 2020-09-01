import React from 'react'
import './index.scss'
import axios from 'axios'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    axios({
      url: '/api/list'
    }).then(res => console.log('mock模拟数据', res))
      .catch(err => console.log(err))
  }

  render () {
    return (
      <div className='page1'>
        这是页面1
      </div>
    )
  }
}

export default App
