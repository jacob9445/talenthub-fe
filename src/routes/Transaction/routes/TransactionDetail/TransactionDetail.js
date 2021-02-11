import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { show } from 'redux-modal'

import Widget from 'components/Widget'
import TransactionTable from '../../components/TransactionTable'
import Spinner from 'components/Spinner'
import { getTransactionDetail, transactionsSelector, transactionsLoadingSelector } from 'store/modules/transaction'
import { meSelector } from 'store/modules/auth'

const TransactionDetail = ({ getTransactionDetail, transactions, isTransactionLoading, me }) => {
  useEffect(() => {
    getTransactionDetail(me)
  }, [getTransactionDetail, me])

  if (isTransactionLoading) return <Spinner />
  else
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Widget title="TransactionDetail" disableWidgetMenu>
              <TransactionTable data={transactions} me={me} />
            </Widget>
          </Grid>
        </Grid>
      </>
    )
}

const actions = {
  getTransactionDetail,
  show
}

const selector = createStructuredSelector({
  transactions: transactionsSelector,
  isTransactionLoading: transactionsLoadingSelector,
  me: meSelector
})

TransactionDetail.propTypes = {
  getTransactionDetail: PropTypes.func.isRequired,
  transactions: PropTypes.array,
  isTransactionLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired,
  show: PropTypes.func.isRequired
}

export default compose(
  withRouter,
  connect(
    selector,
    actions
  )
)(TransactionDetail)
