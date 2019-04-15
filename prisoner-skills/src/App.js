import React, { Component } from 'react'
import Register from './components/auth/register'
import Prisons from './components/prisons'
import Prisoners from './components/prisoners'
import Navigation from './components/navigation'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navigation />
        <Register />
        <Prisons />
        <Prisoners />
      </div>
    )
  }
}

export default App
