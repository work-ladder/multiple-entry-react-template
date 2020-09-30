import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import I18N from '../../i18n'

ReactDOM.render(
  <I18N>
    <App />
  </I18N>,
  document.getElementById('app')
)
