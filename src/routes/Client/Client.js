import React, { useEffect, useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { show } from 'redux-modal'

import Widget from 'components/Widget'
import ClientTable from './ClientTable'
import Spinner from 'components/Spinner'
import { getClients, deleteClientAndRefresh, clientsSelector, clientsLoadingSelector } from 'store/modules/client'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

const Clients = ({ getClients, deleteClientAndRefresh, clients, isClientsLoading, me, show }) => {
  useEffect(() => {
    getClients()
  }, [getClients])

  const handleDelete = useCallback(
    id => {
      show('confirmModal', {
        confirmation: 'Are you sure to delete the client?',
        proceed: () => {
          deleteClientAndRefresh(id)
        }
      })
    },
    [show, deleteClientAndRefresh]
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
              <Button color="primary" component={Link} to={`/${URL_PREFIXES[me.role]}/clients/new`}>
                Add Client
              </Button>
            }>
            <ClientTable data={clients} myRole={me.role} handleDelete={handleDelete} />
          </Widget>
        </Grid>
      </Grid>
    )
}

const actions = {
  getClients,
  deleteClientAndRefresh,
  show
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
  me: PropTypes.object,
  show: PropTypes.func.isRequired
}

export default connect(
  selectors,
  actions
)(Clients)
