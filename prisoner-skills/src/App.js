import React, { Component } from 'react'
import Register from './components/auth/register'
import Prisons from './components/prisons'
import Prison from './components/prison'
import Navigation from './components/navigation'
import { Route } from 'react-router-dom'
import Login from './components/auth/login'
import Prisoner from './components/prisoner'
import { GUEST } from './data'

console.log(GUEST)
class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navigation />

        <Route path='/signup' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/prisons' component={Prisons} exact />
        <Route path='/prison/:prison_id' component={Prison} exact />
        <Route
          path='/prison/:prison_id/prisoner/:prisoner_id'
          component={Prisoner}
          exact
        />
      </div>
    )
  }
}

export default App
