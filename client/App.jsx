import React from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Login from '../imports/ui/layouts/Login'

import Antapaccay_Home from '../imports/ui/layouts/antapaccay/Antapaccay_Home'
import Pluton_Home from '../imports/ui/layouts/pluton/Pluton_Home'
import Admin_Home from '../imports/ui/layouts/admin/Admin_Home'

const App = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/ntpccy' render={_ => (
                    (localStorage.getItem('rmain_user_spa') == 'Antapaccay' && localStorage.getItem('rmain_user_role') == 'Tecnico' || localStorage.getItem('rmain_user_role') == 'Admin' || localStorage.getItem('rmain_user_role') == 'Hyperadmin') ? (<Antapaccay_Home />) : (<Redirect to='/login' />)
                )} />
                <Route path='/pltn' render={_ => (
                    (localStorage.getItem('rmain_user_spa') == 'Pluton' && localStorage.getItem('rmain_user_role') == 'Tecnico' || localStorage.getItem('rmain_user_role') == 'Admin' || localStorage.getItem('rmain_user_role') == 'Hyperadmin') ? (<Pluton_Home />) : (<Redirect to='/login' />)
                )} />
                <Route path='/admin' render={_=>(
                    (localStorage.getItem('rmain_user_role') == 'Admin' || localStorage.getItem('rmain_user_role') == 'Hyperadmin') ? (<Admin_Home />) : (<Redirect to='/login' />)                    
                )} />
                <Route path='/login' component={Login} />
                <Route render={_ => (<Redirect to='/login' />)} />
            </Switch>
        </BrowserRouter>
    )
}

export default App

