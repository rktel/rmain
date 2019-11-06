import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from '../imports/ui/layouts/Login'

import Antapaccay_Home from '../imports/ui/layouts/antapaccay/Antapaccay_Home'
import Pluton_Home from '../imports/ui/layouts/pluton/Pluton_Home'

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                {console.log('Hello App')}
                <Route path='/ntpccy' exact component={Antapaccay_Home} />
                <Route path='/pltn' exact component={Pluton_Home} />
                <Route path='/login' component={Login} />
            </Switch>
        </BrowserRouter>
    )
}

export default App