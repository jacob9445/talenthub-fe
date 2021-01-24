import React, { useEffect, useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import ClientsTable from './ClientsTable'
import Spinner from 'components/Spinner'
import { getClients, deleteClientAndRefresh, clientsSelector, clientsLoadingSelector } from 'store/modules/clients'
import { meSelector } from 'store/modules/auth'

const Clients = ({ getClients, deleteClientAndRefresh, clients, isClientsLoading, me }) => {
  useEffect(() => {
    getClients()
  }, [getClients])

  const handleDelete = useCallback(
    id => {
      deleteClientAndRefresh(id)
    },
    [deleteClientAndRefresh]
  )

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
  getClients,
  deleteClientAndRefresh
}

const selectors = createStructuredSelector({
  clients: clientsSelector,
  isClientsLoading: clientsLoadingSelector,
  me: meSelector
})

Clients.propTypes = {
  getClients: PropTypes.func.isRequired,
  deleteClientAndRefresh: PropTypes.func.isRequired,
  clients: PropTypes.array,
  isClientsLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired
}

export default connect(
  selectors,
  actions
)(Clients)
