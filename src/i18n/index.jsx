import React, { Component } from 'react'
import intl from '@gem-mine/intl'
import { LANGUAGE } from './config'

const locales = {}
Object.keys(LANGUAGE).forEach((key) => {
  // 如果语言包很小，建议全部使用本地化
  locales[key] = require(`./${key}`).default
})

class I18N extends Component {
  state = {
    initDone: false
  }

  componentDidMount () {
    // 国际化资源 ready
    intl.init({ locales }).then(() => {
      this.setState({ initDone: true })
    })
  }

  render () {
    if (this.state.initDone) {
      return this.props.children
    } else {
      return <></>
    }
  }
}

export default I18N
