// import "normalize.css"

import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import React from 'react'
import { render } from '@gem-mine/durex'
// import ReactDOM from 'react-dom'

import './route'
import './config/durex'

import App from './App'

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// )
render(<App />, document.querySelector('#app'))
