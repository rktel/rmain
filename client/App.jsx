import React from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Login from '../imports/ui/layouts/Login'

import Antapaccay_Home from '../imports/ui/layouts/antapaccay/Antapaccay_Home'
import Pluton_Home from '../imports/ui/layouts/pluton/Pluton_Home'

const App = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/ntpccy' render={_ => {
                    Meteor.call('getPersonal', (error, personal) => {
                        console.log(personal)
                        if (!error && personal) {
                            if (personal.role && personal.spa) {
                                return <Antapaccay_Home/>
                            } else {
                                return <Redirect to='/login' />
                            }
                        }
                    })
                }} />
                <Route path='/pltn' render={_ => (
                    Meteor.userId() ? (<Pluton_Home />) : (<Redirect to='/login' />)
                )} />
                <Route path='/login' component={Login} />
                <Route render={_ => (<Redirect to='/login' />)} />
            </Switch>
        </BrowserRouter>
    )
}

export default App

