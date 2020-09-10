import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import React from 'react'
import { render } from '@gem-mine/durex'

import './route'
import './config/durex'

import App from './App'

render(<App />, document.querySelector('#app'))
