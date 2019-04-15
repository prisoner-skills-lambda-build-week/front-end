import React, { Component } from 'react'
import Register from './components/auth/register'
import Prisons from './components/prisons'
import Prisoners from './components/prisoners'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <Register />
          <Prisons />
          <Prisoners />
        </header>
      </div>
    )
  }
}

export default App
