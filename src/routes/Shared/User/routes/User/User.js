import React, { useEffect, useCallback } from 'react'
import { Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { show } from 'redux-modal'
import { compose } from 'redux'

import { getUsers, usersSelector, deleteUserAndRefresh } from 'store/modules/user'
import { meSelector } from 'store/modules/auth'
import UserTable from '../../components/UserTable'
import Widget from 'components/Widget'
import { ROLES } from 'config/constants'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { ListDataType } from 'helpers/prop-types'

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

const User = ({ getUsers, users, me, deleteUserAndRefresh, show, pagination, onChangePage, onChangeRowsPerPage }) => {
  let classes = useStyles()
  useEffect(() => {
    getUsers({
      role: me.role,
      params: pagination
    })
  }, [getUsers, me.role, pagination])

  const handleDelete = useCallback(
    id => {
      show('confirmModal', {
        confirmation: 'Are you sure to delete the user?',
        proceed: () => {
          deleteUserAndRefresh({ id })
        }
      })
    },
    [show, deleteUserAndRefresh]
  )

  return (
    <>
      {/* <PageTitle title="Users" /> */}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            title="Users"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableOverflow}
            disableWidgetMenu
            disableWidgetButton={me.role !== ROLES.ADMIN}
            WidgetButton={
              <Button color="primary" component={Link} to="/admin/users/new">
                Add User
              </Button>
            }>
            <UserTable
              data={users}
              role={me.role}
              handleDelete={handleDelete}
              pagination={pagination}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  )
}

const actions = {
  getUsers,
  deleteUserAndRefresh,
  show
}

const selectors = createStructuredSelector({
  users: usersSelector,
  me: meSelector
})

User.propTypes = {
  users: ListDataType,
  me: PropTypes.object,
  getUsers: PropTypes.func.isRequired,
  deleteUserAndRefresh: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
}

export default compose(withPaginationInfo, connect(selectors, actions))(User)
