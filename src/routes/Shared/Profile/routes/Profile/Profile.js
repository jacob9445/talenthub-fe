import React, { useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { withRouter } from 'react-router'
import { show } from 'redux-modal'
import { Link } from 'react-router-dom'
import { Grid, Button } from '@material-ui/core'
import { Formik } from 'formik'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withPaginationInfo from 'hocs/withPaginationInfo'
import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import SearchForm from 'components/SearchForm'
import ProfileTable from '../../components/ProfileTable'
import { URL_PREFIXES } from 'config/constants'
import { meSelector } from 'store/modules/auth'
import { ListDataType } from 'helpers/prop-types'
import { jsonToQueryString, parseQueryString } from 'helpers/utils'
import { getProfiles, profileSelector, profileLoadingSelector, deleteProfileAndRefresh } from 'store/modules/profile'

const Profile = ({
  getProfiles,
  profiles,
  me,
  isLoading,
  deleteProfileAndRefresh,
  show,
  pagination,
  onChangePage,
  onChangeRowsPerPage,
  history,
  location
}) => {
  const initialValues = useMemo(() => {
    return R.pick(['search'], parseQueryString(location.search))
  }, [location])

  useEffect(() => {
    getProfiles({
      params: { ...pagination, ...initialValues }
    })
  }, [getProfiles, pagination, initialValues])

  const handleDelete = useCallback(
    id => {
      show('confirmModal', {
        confirmation: 'Are you sure to delete the profile?',
        proceed: () => {
          deleteProfileAndRefresh(id)
        }
      })
    },
    [show, deleteProfileAndRefresh]
  )

  const handleSubmit = useCallback(
    (formValues, formActinos) => {
      history.push({
        search: jsonToQueryString({
          ...pagination,
          ...formValues
        })
      })
    },
    [history, pagination]
  )

  if (isLoading) return <Spinner />
  else
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            title="Profiles"
            disableWidgetMenu
            noBodyPadding
            WidgetButton={
              <Button color="primary" component={Link} to={`/${URL_PREFIXES[me.role]}/profiles/new`}>
                Add Profile
              </Button>
            }>
            <Formik initialValues={initialValues} component={SearchForm} onSubmit={handleSubmit} />
            <ProfileTable
              data={profiles}
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

Profile.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  deleteProfileAndRefresh: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  profiles: ListDataType,
  me: PropTypes.object,
  show: PropTypes.func.isRequired,
  pagination: PropTypes.object
}

const actions = {
  getProfiles,
  deleteProfileAndRefresh,
  show
}

const selectors = createStructuredSelector({
  profiles: profileSelector,
  isLoading: profileLoadingSelector,
  me: meSelector
})

export default compose(withRouter, withPaginationInfo, connect(selectors, actions))(Profile)
