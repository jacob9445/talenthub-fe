import React, { useEffect, useCallback } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { show } from 'redux-modal'
import PropTypes from 'prop-types'

import { getPartners, deletePartnerAndRefresh, partnersSelector, partnersLoadingSelector } from 'store/modules/partner'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'
import PartnerTable from './PartnerTable'
import Spinner from 'components/Spinner'
import Widget from 'components/Widget'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { ListDataType } from 'helpers/prop-types'

const Partner = ({
  getPartners,
  deletePartnerAndRefresh,
  partners,
  isPartnersLoading,
  me,
  show,
  pagination,
  onChangePage,
  onChangeRowsPerPage
}) => {
  useEffect(() => {
    getPartners({
      me: me,
      params: pagination
    })
  }, [getPartners, me, pagination])

  const handleDelete = useCallback(
    id => {
      show('confirmModal', {
        confirmation: 'Are you sure to delete the partner?',
        proceed: () => {
          deletePartnerAndRefresh({ id, role: me.role })
        }
      })
    },
    [show, deletePartnerAndRefresh, me.role]
  )

  if (isPartnersLoading) return <Spinner />
  else
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget
            title="Partners"
            disableWidgetMenu
            WidgetButton={
              <Button color="primary" component={Link} to={`/${URL_PREFIXES[me.role]}/partners/new`}>
                Add Partner
              </Button>
            }>
            <PartnerTable
              data={partners}
              myRole={me.role}
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
  getPartners,
  deletePartnerAndRefresh,
  show
}

const selectors = createStructuredSelector({
  partners: partnersSelector,
  isPartnersLoading: partnersLoadingSelector,
  me: meSelector
})

Partner.propTypes = {
  getPartners: PropTypes.func.isRequired,
  deletePartnerAndRefresh: PropTypes.func.isRequired,
  partners: ListDataType,
  isPartnersLoading: PropTypes.bool.isRequired,
  me: PropTypes.object,
  show: PropTypes.func.isRequired,
  pagination: PropTypes.object
}

export default compose(withPaginationInfo, connect(selectors, actions))(Partner)
