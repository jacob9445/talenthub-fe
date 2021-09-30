import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { Grid } from '@material-ui/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from 'components/Spinner'
import Widget from 'components/Widget'

import {
  getSelfFinancialReport,
  selfFinancialReportLoadingSelector,
  selfFinancialReportSelector
} from 'store/modules/report'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import { periodOptions } from 'config/constants'
import DateRangePickerForm, { validationSchema } from 'components/DateRangePickerForm'
import MyReportTable from '../../components/MyReportTable'
import SimpleSelect from 'components/SimpleSelect'
import useStyles from './styles'
import withPaginationInfo from 'hocs/withPaginationInfo'

const MyReportList = ({
  myReport,
  getSelfFinancialReport,
  isMyReportLoading,
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
  const [showCustom, setShowCustom] = useState(initialShowCustom)
  const classes = useStyles()

  useEffect(() => {
    const { from, to, period } = queryObj
    if (!from && period !== 'custom') {
      getSelfFinancialReport({
        params: {
          period,
          pagination
        }
      })
    }
    if (from) {
      getSelfFinancialReport({
        params: {
          period,
          ...pagination,
          from,
          to
        }
      })
    }
  }, [getSelfFinancialReport, pagination, queryObj])

  const handlePeriodChange = useCallback(
    event => {
      const period = event.target.value
      const { page, page_size } = parseQueryString(location.search)
      if (period !== 'custom') {
        setShowCustom(0)
        history.push({
          search: jsonToQueryString({
            period,
            page,
            page_size
          })
        })
      } else {
        setShowCustom(1)
        history.push({
          search: jsonToQueryString({
            period,
            page,
            page_size
          })
        })
      }
    },
    [history, location.search]
  )

  const handleSubmit = useCallback(
    (formValues, formActions) => {
      if (!formValues.from || !formValues.to) {
        return
      } else {
        const { page, page_size } = queryObj
        history.push({
          search: jsonToQueryString({
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

  const initialValues = {
    from: queryObj.from || null,
    to: queryObj.to || null
  }

  if (isMyReportLoading) {
    return <Spinner />
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="My Report" disableWidgetMenu>
            <SimpleSelect
              label="Period"
              value={queryObj.period}
              options={periodOptions}
              onChange={handlePeriodChange}
            />
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
            {myReport ? (
              <MyReportTable
                data={myReport[0]}
                pagination={pagination}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
              />
            ) : null}
          </Widget>
        </Grid>
      </Grid>
    )
  }
}

const actions = {
  getSelfFinancialReport
}

const selector = createStructuredSelector({
  myReport: selfFinancialReportSelector,
  isMyReportLoading: selfFinancialReportLoadingSelector
})

MyReportList.propTypes = {
  myReport: PropTypes.array,
  getSelfFinancialReport: PropTypes.func.isRequired,
  isMyReportLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default compose(withRouter, withPaginationInfo, connect(selector, actions))(MyReportList)
