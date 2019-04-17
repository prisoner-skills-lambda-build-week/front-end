import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import '@fortawesome/fontawesome-free/js/all'
import 'bulma'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById(`root`)
)
