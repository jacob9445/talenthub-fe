import React from 'react'
import { Route, Switch } from 'react-router'
import { withRouter } from 'react-router'

import { isDeveloperOrRedir } from 'hocs/withRoles'
import Dashboard from './routes/Dashboard'

const Developer = ({match:{path}}) => {
    return (
        <Switch>
            <Route path={`${path}/dashboard`} component={Dashboard} />
        </Switch>
    )
}

export default isDeveloperOrRedir(Developer)