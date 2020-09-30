import React from 'react'
import { Select } from 'antd'
import './index.scss'
import intl from '@gem-mine/intl'

const { Option } = Select

class App extends React.Component {
  handleChange = (value) => {
    intl.setLocale(value)
  }

  render () {
    return (
      <div className='main'>
        <span className='switch'>{`${intl.get('switch')}:`}</span>
        <Select defaultValue={intl.getLocale().currentLocale} style={{ width: 120 }} onChange={this.handleChange}>
          <Option value='zh-CN'>中文</Option>
          <Option value='en-US'>english</Option>
        </Select>
        <h2 className='page'>
          {intl.get('intl')}
        </h2>
      </div>
    )
  }
}

export default App
