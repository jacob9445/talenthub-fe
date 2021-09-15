import React, { useEffect, useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { show } from 'redux-modal'

import Widget from 'components/Widget'
import ClientTable from '../../components/ClientTable'
import Spinner from 'components/Spinner'
import { getClients, deleteClientAndRefresh, clientsSelector, clientsLoadingSelector } from 'store/modules/client'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { ListDataType } from 'helpers/prop-types'

const ClientList = ({
  getClients,
  deleteClientAndRefresh,
  clients,
  isClientsLoading,
  me,
  show,
  pagination,
  onChangePage,
  onChangeRowsPerPage
}) => {
  useEffect(() => {
    getClients({
      params: pagination
    })
  }, [getClients, pagination])

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
            <ClientTable
              data={clients}
              role={me.role}
              handleDelete={handleDelete}
              pagination={pagination}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
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

ClientList.propTypes = {
  getClients: PropTypes.func.isRequired,
  deleteClientAndRefresh: PropTypes.func.isRequired,
  clients: ListDataType,
  isClientsLoading: PropTypes.bool.isRequired,
  me: PropTypes.object,
  show: PropTypes.func.isRequired,
  pagination: PropTypes.object
}

export default compose(withPaginationInfo, connect(selectors, actions))(ClientList)
