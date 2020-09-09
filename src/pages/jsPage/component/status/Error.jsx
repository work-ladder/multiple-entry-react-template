import React from 'react'
import PropTypes from 'prop-types'

export default function Error ({ error }) {
  return (
    <div style={{ padding: '10px' }}>
      <h1>加载组件时发生了一些异常</h1>
      <h3>
        错误信息:
      </h3>
      <pre style={{ color: 'red' }}>
        {error && error.stack}
      </pre>
    </div>
  )
}

Error.propTypes = {
  error: PropTypes.object
}
