import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { show } from 'redux-modal'
import { FormattedNumber, FormattedTime, FormattedDate } from 'react-intl'

import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import {
  getTransactionDetail,
  transactionDetailLoadingSelector,
  transactionDetailSelector
} from 'store/modules/transaction'
import { meSelector } from 'store/modules/auth'
import { getPlatformLabel, getFullName } from 'helpers/utils'
import { URL_PREFIXES, ROLES } from 'config/constants'
import LabelValue from 'components/LabelValue'
import { FINANCIALREQUEST_TYPE_LABELS, FINANCIALREQUEST_TYPE } from 'config/constants'

const TransactionDetail = ({
  getTransactionDetail,
  transactionDetail,
  isTransactionDetailLoading,
  match: { params },
  me
}) => {
  useEffect(() => {
    getTransactionDetail(params.id)
  }, [getTransactionDetail, params])
  const fr = transactionDetail?.financial_request
  const myRole = me?.role
  if (isTransactionDetailLoading) return <Spinner />
  else
    return (
      transactionDetail && (
        <>
          <Grid container>
            <Grid item xs={12}>
              <Widget title="Transaction Detail" disableWidgetMenu>
                <Grid container>
                  <Grid item sm={6}>
                    <LabelValue label="Date">
                      <FormattedDate value={transactionDetail.created_at} format="dayMonthAndYear" />{' '}
                      <FormattedTime value={transactionDetail.created_at} />
                    </LabelValue>
                    <LabelValue label="Gross Amount">
                      <FormattedNumber format="currency" value={transactionDetail.gross_amount} />
                    </LabelValue>
                    <LabelValue label="Net Amount">
                      <FormattedNumber format="currency" value={transactionDetail.net_amount} />
                    </LabelValue>
                    <LabelValue label="Payment Platform">
                      {getPlatformLabel(transactionDetail.payment_platform)}
                    </LabelValue>
                    <LabelValue label="Description">{transactionDetail.description}</LabelValue>
                  </Grid>
                  <Grid item sm={6}>
                    <LabelValue label="Financial Request Type">{FINANCIALREQUEST_TYPE_LABELS[fr.type]}</LabelValue>
                    <LabelValue label="Requested Amount">
                      <FormattedNumber format="currency" value={fr.amount} />
                    </LabelValue>
                    <LabelValue label={fr.type === FINANCIALREQUEST_TYPE.SENDPAYMENT ? 'Partner' : 'Client'}>
                      <Link to={`/${URL_PREFIXES[myRole]}/clients/${fr.counter_party.id}/detail`}>
                        {fr.counter_party.full_name}
                      </Link>
                    </LabelValue>
                    <LabelValue label="Requested by">
                      {myRole === ROLES.DEVELOPER ? (
                        getFullName(fr.requester)
                      ) : (
                        <Link to={`/${URL_PREFIXES[myRole]}/users/${fr.requester.id}/detail`}>
                          {getFullName(fr.requester)}
                        </Link>
                      )}
                    </LabelValue>
                    {fr.type !== FINANCIALREQUEST_TYPE.SENDPAYMENT && (
                      <LabelValue label="Associated Project">
                        <Link to={`/${URL_PREFIXES[myRole]}/projects/${fr.project.id}/detail`}>{fr.project.title}</Link>
                      </LabelValue>
                    )}
                  </Grid>
                </Grid>
              </Widget>
            </Grid>
          </Grid>
        </>
      )
    )
}

const actions = {
  getTransactionDetail,
  show
}

const selector = createStructuredSelector({
  transactionDetail: transactionDetailSelector,
  isTransactionDetailLoading: transactionDetailLoadingSelector,
  me: meSelector
})

TransactionDetail.propTypes = {
  getTransactionDetail: PropTypes.func.isRequired,
  transactionDetail: PropTypes.object,
  isTransactionDetailLoading: PropTypes.bool.isRequired,
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
