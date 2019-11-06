import React from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Login from '../imports/ui/layouts/Login'

import Antapaccay_Home from '../imports/ui/layouts/antapaccay/Antapaccay_Home'
import Pluton_Home from '../imports/ui/layouts/pluton/Pluton_Home'

const App = () => {

    return (
        <BrowserRouter>

            {!Meteor.userId() ? <Redirect to='/login' /> : <Switch>
                <Route path='/ntpccy' exact component={Antapaccay_Home} />
                <Route path='/pltn' exact component={Pluton_Home} />
                <Route path='/login' component={Login} />
            </Switch>}
        </BrowserRouter>
    )
}

export default App

