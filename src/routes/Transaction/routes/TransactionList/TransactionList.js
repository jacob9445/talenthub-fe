import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { show } from 'redux-modal'

import Widget from 'components/Widget'
import TransactionTable from 'components/TransactionTable'
import Spinner from 'components/Spinner'
import { getTransactions, transactionsSelector, transactionsLoadingSelector } from 'store/modules/transaction'
import { meSelector } from 'store/modules/auth'
import withPaginationInfo from 'hocs/withPaginationInfo'

const TransactionList = ({
  getTransactions,
  transactions,
  isTransactionLoading,
  me,
  pagination,
  onChangePage,
  onChangeRowsPerPage
}) => {
  useEffect(() => {
    getTransactions({
      me: me,
      params: pagination
    })
  }, [getTransactions, me, pagination])

  if (isTransactionLoading) return <Spinner />
  else
    return transactions ? (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Widget title="Transaction" disableWidgetMenu>
              <TransactionTable
                data={transactions}
                me={me}
                pagination={pagination}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
              />
            </Widget>
          </Grid>
        </Grid>
      </>
    ) : null
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
  transactions: PropTypes.object,
  isTransactionLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired,
  show: PropTypes.func.isRequired,
  pagination: PropTypes.object
}

export default compose(
  withRouter,
  withPaginationInfo,
  connect(
    selector,
    actions
  )
)(TransactionList)
