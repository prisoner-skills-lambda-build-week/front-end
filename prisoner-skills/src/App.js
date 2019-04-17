import React, { Component } from 'react'
import Register from './components/auth/register'
import Prisons from './components/prisons'
import Prison from './components/prison'
import Navigation from './components/navigation'
import { Route } from 'react-router-dom'
import Login from './components/auth/login'
import Prisoner from './components/prisoner'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navigation />
        <main
          className='container'
          style={{
            margin: `2rem auto`,
          }}>
          <Route path='/signup' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/prisons' component={Prisons} exact />
          <Route path='/prisons/:id' component={Prison} />
          <Route path='/prisoner/:id' component={Prisoner} />
        </main>
      </div>
    )
  }
}

export default App
