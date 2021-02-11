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
import { getTransactions, transactionsSelector, transactionsLoadingSelector } from 'store/modules/transaction'
import { meSelector } from 'store/modules/auth'
import ApproveRequestModal from 'components/ApproveRequestModal'

const TransactionList = ({ getTransactions, transactions, isTransactionLoading, me }) => {
  useEffect(() => {
    getTransactions(me)
  }, [getTransactions, me])

  if (isTransactionLoading) return <Spinner />
  else
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Widget title="Transaction" disableWidgetMenu>
              <TransactionTable data={transactions} me={me} />
            </Widget>
          </Grid>
        </Grid>
        <ApproveRequestModal />
      </>
    )
}

const actions = {
  getTransactions,
  show
}

const selector = createStructuredSelector({
  transactions: transactionsSelector,
  isTransactionLoading: transactionsLoadingSelector,
  me: meSelector
})

TransactionList.propTypes = {
  getTransactions: PropTypes.func.isRequired,
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
)(TransactionList)
