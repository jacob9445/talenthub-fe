import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Grid, Tooltip } from '@material-ui/core'
import { CloudDownload } from '@material-ui/icons'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { show } from 'redux-modal'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import DateRangePickerForm, { validationSchema } from 'components/DateRangePickerForm'
import Widget from 'components/Widget'
import TransactionTable from 'components/TransactionTable'
import SimpleSelect from 'components/SimpleSelect'
import Spinner from 'components/Spinner'
import useStyles from './styles'
import {
  getTransactions,
  transactionsSelector,
  transactionsLoadingSelector,
  downloadTransactions
} from 'store/modules/transaction'
import { meSelector } from 'store/modules/auth'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { ListDataType } from 'helpers/prop-types'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import { periodOptions, FINANCIALREQUEST_TYPE_OPTIONS, FINANCIALREQUEST_TYPE } from 'config/constants'

const TransactionList = ({
  getTransactions,
  transactions,
  isTransactionLoading,
  downloadTransactions,
  me,
  pagination,
  onChangePage,
  onChangeRowsPerPage,
  location,
  history
}) => {
  const queryObj = useMemo(
    () => ({
      period: 'this-month',
      ...parseQueryString(location.search)
    }),
    [location.search]
  )

  const initialShowCustom = queryObj.period === 'custom' ? 1 : 0
  const initialValues = {
    from: queryObj.from || null,
    to: queryObj.to || null
  }
  const [showCustom, setShowCustom] = useState(initialShowCustom)
  const classes = useStyles()

  useEffect(() => {
    const { type = 'all', from, to, period } = queryObj
    if (!from && period !== 'custom') {
      getTransactions({
        me,
        params: {
          ...pagination,
          type: type === 'all' ? undefined : type,
          period
        }
      })
    }
    if (from && to) {
      getTransactions({
        me,
        params: {
          ...pagination,
          type: type === 'all' ? undefined : type,
          period,
          from,
          to
        }
      })
    }
  }, [getTransactions, me, pagination, queryObj])

  const handlePeriodChange = useCallback(
    event => {
      const { type, page, page_size } = queryObj
      const period = event.target.value
      if (period !== 'custom') {
        setShowCustom(0)
        history.push({
          search: jsonToQueryString({
            type,
            period,
            page,
            page_size
          })
        })
      } else {
        setShowCustom(1)
        history.push({
          search: jsonToQueryString({
            period
          })
        })
      }
    },
    [history, queryObj]
  )

  const handleSubmit = useCallback(
    (formValues, formActions) => {
      if (!formValues.from || !formValues.to) {
        return
      } else {
        const { type, page, page_size } = queryObj
        history.push({
          search: jsonToQueryString({
            type,
            period: 'custom',
            from: formValues.from,
            to: formValues.to,
            page,
            page_size
          })
        })
      }
    },
    [history, queryObj]
  )

  const financialRequestTypeOptions = useMemo(
    () => [
      { value: 'all', label: 'All' },
      ...FINANCIALREQUEST_TYPE_OPTIONS.filter(typeOption => typeOption.value !== FINANCIALREQUEST_TYPE.SENDINVOICE)
    ],
    []
  )

  const handleTypeChange = useCallback(
    event => {
      const { period, from, to } = queryObj
      const type = event.target.value
      if (type !== 'all') {
        history.push({
          search: jsonToQueryString({
            type,
            period,
            from,
            to
          })
        })
      } else {
        if (period === 'custom') {
          history.push({
            search: jsonToQueryString({
              period,
              from,
              to
            })
          })
        } else {
          history.push({
            search: jsonToQueryString({
              period
            })
          })
        }
      }
    },
    [history, queryObj]
  )
  const handleDownload = useCallback(() => {
    const { from, to, period, type } = queryObj
    if (!from) {
      downloadTransactions({
        fileName: me.team.name,
        params: {
          period,
          type
        }
      })
    } else {
      downloadTransactions({
        fileName: me.team.name,
        params: {
          period: 'custom',
          from,
          to,
          type
        }
      })
    }
  }, [downloadTransactions, queryObj, me])

  if (isTransactionLoading) return <Spinner />
  else
    return transactions ? (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Widget
              title="Transactions"
              disableWidgetMenu
              WidgetButton={
                <Grid container spacing={2} alignItems="stretch" justify="flex-end">
                  <Grid item>
                    <Tooltip title="Export as CSV" placement="top">
                      <Button onClick={handleDownload} variant="outlined" color="primary" className={classes.download}>
                        <CloudDownload />
                        &nbsp;Export
                      </Button>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <SimpleSelect
                      label="Type"
                      value={queryObj.type || 'all'}
                      options={financialRequestTypeOptions}
                      onChange={handleTypeChange}
                    />
                  </Grid>
                  <Grid item>
                    <SimpleSelect
                      label="Period"
                      value={queryObj.period}
                      options={periodOptions}
                      onChange={handlePeriodChange}
                    />
                  </Grid>
                </Grid>
              }>
              {showCustom ? (
                <div className={classes.dateRangeFilter}>
                  <Formik
                    component={DateRangePickerForm}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  />
                </div>
              ) : null}
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
  downloadTransactions,
  show
}

const selector = createStructuredSelector({
  transactions: transactionsSelector,
  isTransactionLoading: transactionsLoadingSelector,
  me: meSelector
})

TransactionList.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  transactions: ListDataType,
  isTransactionLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired,
  show: PropTypes.func.isRequired,
  pagination: PropTypes.object,
  downloadTransactions: PropTypes.func.isRequired
}

export default compose(withRouter, withPaginationInfo, connect(selector, actions))(TransactionList)
