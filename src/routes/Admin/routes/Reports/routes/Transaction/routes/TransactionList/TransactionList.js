import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Grid, Tooltip } from '@material-ui/core'
import { CloudDownload } from '@material-ui/icons'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import * as R from 'ramda'
import { show } from 'redux-modal'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import DateRangePickerForm, { validationSchema } from 'components/DateRangePickerForm'
import Widget from 'components/Widget'
import TransactionTable from 'components/TransactionTable'
import SimpleSelect from 'components/SimpleSelect'
import Spinner from 'components/Spinner'
import { getTeams, teamsSelector } from 'store/modules/team'
import useStyles from './styles'
import {
  getTransactions,
  transactionsSelector,
  transactionsLoadingSelector,
  downloadTransactions,
  deleteTransactionAndRefresh
} from 'store/modules/transaction'
import { meSelector } from 'store/modules/auth'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { ListDataType } from 'helpers/prop-types'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import { periodOptions, FINANCIALREQUEST_TYPE_OPTIONS, FINANCIALREQUEST_TYPE } from 'config/constants'

const TransactionList = ({
  getTransactions,
  deleteTransactionAndRefresh,
  transactions,
  isTransactionLoading,
  downloadTransactions,
  me,
  teams,
  getTeams,
  pagination,
  onChangePage,
  onChangeRowsPerPage,
  location,
  history,
  match: { path }
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

  const getTeamName = useCallback(
    teamId =>
      R.compose(R.prop('name'), R.defaultTo({ name: 'All' }), R.find(R.propEq('id', teamId)), R.defaultTo([]))(teams),
    [teams]
  )

  const teamName = getTeamName(Number(queryObj.team))

  useEffect(() => {
    getTeams()
  }, [getTeams])

  useEffect(() => {
    const { type = 'all', from, to, team = 'all', period } = queryObj
    if (!from && period !== 'custom') {
      getTransactions({
        me,
        params: {
          ...pagination,
          period,
          team: team === 'all' ? undefined : team,
          type: type === 'all' ? undefined : type
        }
      })
    }
    if (from && to) {
      getTransactions({
        me,
        params: {
          ...pagination,
          period,
          team: team === 'all' ? undefined : team,
          type: type === 'all' ? undefined : type,
          from,
          to
        }
      })
    }
  }, [getTransactions, me, pagination, queryObj])

  const teamOptions = useMemo(
    () => [
      { value: 'all', label: 'All' },
      ...(teams
        ? teams.map(team => ({
            value: team.id.toString(),
            label: team.name
          }))
        : [])
    ],
    [teams]
  )

  const financialRequestTypeOptions = useMemo(
    () => [
      { value: 'all', label: 'All' },
      ...FINANCIALREQUEST_TYPE_OPTIONS.filter(typeOption => typeOption.value !== FINANCIALREQUEST_TYPE.SENDINVOICE)
    ],
    []
  )

  const handleDelete = useCallback(
    id => {
      deleteTransactionAndRefresh({
        id,
        role: me.role,
        message: 'Are you sure to delete the transaction?'
      })
    },
    [me.role, deleteTransactionAndRefresh]
  )

  const handleTeamChange = useCallback(
    event => {
      const { type, period, from, to } = queryObj
      const team = event.target.value
      if (team !== 'all') {
        history.push({
          search: jsonToQueryString({
            type,
            period,
            team,
            from,
            to
          })
        })
      } else {
        if (period === 'custom') {
          history.push({
            search: jsonToQueryString({
              type,
              period,
              from,
              to
            })
          })
        } else {
          history.push({
            search: jsonToQueryString({
              type,
              period
            })
          })
        }
      }
    },
    [history, queryObj]
  )

  const handleTypeChange = useCallback(
    event => {
      const { team, period, from, to } = queryObj
      const type = event.target.value
      if (type !== 'all') {
        history.push({
          search: jsonToQueryString({
            type,
            team,
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
              team,
              from,
              to
            })
          })
        } else {
          history.push({
            search: jsonToQueryString({
              period,
              team
            })
          })
        }
      }
    },
    [history, queryObj]
  )

  const handlePeriodChange = useCallback(
    event => {
      const { type, team, page, page_size } = queryObj
      const period = event.target.value
      if (period !== 'custom') {
        setShowCustom(0)
        history.push({
          search: jsonToQueryString({
            type,
            team,
            period,
            page,
            page_size
          })
        })
      } else {
        setShowCustom(1)
        history.push({
          search: jsonToQueryString({
            type,
            period,
            team
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
        const { page, page_size, type } = queryObj
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

  const handleDownload = useCallback(() => {
    const { from, to, period, team, type } = queryObj
    if (!from) {
      downloadTransactions({
        fileName: teamName,
        params: {
          period,
          team,
          type
        }
      })
    } else {
      downloadTransactions({
        fileName: teamName,
        params: {
          team,
          period: 'custom',
          from,
          to,
          type
        }
      })
    }
  }, [downloadTransactions, queryObj, teamName])

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
                <>
                  <Grid container spacing={2} alignItems="stretch" justify="flex-end">
                    <Grid item>
                      <Tooltip title="Export as CSV" placement="top">
                        <Button
                          onClick={handleDownload}
                          variant="outlined"
                          color="primary"
                          className={classes.download}>
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
                    <Grid item>
                      <SimpleSelect
                        label="Team"
                        value={queryObj.team || 'all'}
                        options={teamOptions}
                        onChange={handleTeamChange}
                      />
                    </Grid>
                    <Tooltip title="Add new transaction" placement="top">
                      <Button color="primary" variant="outlined" component={Link} to={`${path}/new`}>
                        Add
                      </Button>
                    </Tooltip>
                  </Grid>
                </>
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
                onDelete={handleDelete}
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
  deleteTransactionAndRefresh,
  getTeams,
  downloadTransactions,
  show
}

const selector = createStructuredSelector({
  transactions: transactionsSelector,
  isTransactionLoading: transactionsLoadingSelector,
  me: meSelector,
  teams: teamsSelector
})

TransactionList.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  transactions: ListDataType,
  isTransactionLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired,
  show: PropTypes.func.isRequired,
  pagination: PropTypes.object,
  teams: PropTypes.array,
  downloadTransactions: PropTypes.func.isRequired
}

export default compose(withRouter, withPaginationInfo, connect(selector, actions))(TransactionList)
