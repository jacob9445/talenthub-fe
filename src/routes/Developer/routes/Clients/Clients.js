import React, { useEffect, useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import Widget from 'components/Widget'
import ClientsTable from './ClientsTable'
import Spinner from 'components/Spinner'
import { getClients, clientsSelector, clientsLoadingSelector } from 'store/modules/clients'
import { meSelector } from 'store/modules/auth'

const Clients = ({ getClients, clients, isClientsLoading, me }) => {
  useEffect(() => {
    getClients()
  }, [getClients])

  const handleDelete = useCallback(id => {}, [])

  if (isClientsLoading) return <Spinner />
  else
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget
            title="Clients"
            disableWidgetMenu
            WidgetButton={
              <Button color="primary" component={Link} to="/developer/clients/create">
                Add Client
              </Button>
            }>
            <ClientsTable data={clients} myRole={me.role} handleDelete={handleDelete} />
          </Widget>
        </Grid>
      </Grid>
    )
}

const actions = {
  getClients
}

const selectors = createStructuredSelector({
  clients: clientsSelector,
  isClientsLoading: clientsLoadingSelector,
  me: meSelector
})

export default connect(
  selectors,
  actions
)(Clients)
