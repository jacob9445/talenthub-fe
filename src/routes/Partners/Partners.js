import React, { useEffect, useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import PartnersTable from './PartnersTable'
import Spinner from 'components/Spinner'
import { getPartners, deletePartnerAndRefresh, partnersSelector, partnersLoadingSelector } from 'store/modules/partners'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

const Partners = ({ getPartners, deletePartnerAndRefresh, partners, isPartnersLoading, me }) => {
  useEffect(() => {
    getPartners(me)
  }, [getPartners, me])

  const handleDelete = useCallback(
    id => {
      deletePartnerAndRefresh({ id, role: me.role })
    },
    [deletePartnerAndRefresh, me.role]
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
              <Button color="primary" component={Link} to={`/${URL_PREFIXES[me.role]}/partners/create`}>
                Add Partner
              </Button>
            }>
            <PartnersTable data={partners} myRole={me.role} handleDelete={handleDelete} />
          </Widget>
        </Grid>
      </Grid>
    )
}

const actions = {
  getPartners,
  deletePartnerAndRefresh
}

const selectors = createStructuredSelector({
  partners: partnersSelector,
  isPartnersLoading: partnersLoadingSelector,
  me: meSelector
})

Partners.propTypes = {
  getPartners: PropTypes.func.isRequired,
  deletePartnerAndRefresh: PropTypes.func.isRequired,
  partners: PropTypes.array,
  isPartnersLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired
}

export default connect(
  selectors,
  actions
)(Partners)
