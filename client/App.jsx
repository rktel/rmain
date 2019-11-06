import React from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Login from '../imports/ui/layouts/Login'

import Antapaccay_Home from '../imports/ui/layouts/antapaccay/Antapaccay_Home'
import Pluton_Home from '../imports/ui/layouts/pluton/Pluton_Home'

const App = () => {

    return (
        <BrowserRouter>

            <Switch>
                <Route path='/ntpccy' render={_ => (
                    Meteor.userId() ? (<Antapaccay_Home />) : (<Login />)
                )} />
                <Route path='/pltn' render={_ => (
                    Meteor.userId() ? (<Pluton_Home />) : (<Login />)
                )} />
                <Route path='/login' component={Login} />
            </Switch>
        </BrowserRouter>
    )
}

export default App

