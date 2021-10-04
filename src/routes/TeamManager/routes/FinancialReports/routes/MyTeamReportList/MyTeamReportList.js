import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { CloudDownload } from '@material-ui/icons'
import { Grid, Button, Tooltip } from '@material-ui/core'
import { Formik } from 'formik'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  developersEarningLoadingSelector,
  developersEarningSelector,
  getDevelopersEarningReport,
  getTotalEarningReport,
  totalEarningLoadingSelector,
  totalEarningSelector,
  downloadDevelopersEarning
} from 'store/modules/report'
import { meSelector } from 'store/modules/auth'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import { periodOptions } from 'config/constants'
import DateRangePickerForm, { validationSchema } from 'components/DateRangePickerForm'
import IndividualReportTable from 'routes/Admin/routes/Reports/components/IndividualReportTable'
import SimpleSelect from 'components/SimpleSelect'
import Spinner from 'components/Spinner'
import useStyles from './styles'
import Widget from 'components/Widget'
import withPaginationInfo from 'hocs/withPaginationInfo'

const MyTeamReportList = ({
  me,
  totalEarning,
  isTotalEarningLoading,
  developersEarning,
  isDevelopersEarningLoading,
  getDevelopersEarningReport,
  getTotalEarningReport,
  downloadDevelopersEarning,
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
      getDevelopersEarningReport({
        params: {
          period,
          pagination
        }
      })
      getTotalEarningReport({
        params: {
          period
        }
      })
    }
    if (from) {
      getDevelopersEarningReport({
        params: {
          period,
          pagination,
          from,
          to
        }
      })
      getTotalEarningReport({
        params: {
          period,
          from,
          to
        }
      })
    }
  }, [getDevelopersEarningReport, getTotalEarningReport, pagination, queryObj])

  const handlePeriodChange = useCallback(
    event => {
      const { page, page_size } = queryObj
      const period = event.target.value
      if (period !== 'custom') {
        setShowCustom(false)
        history.push({
          search: jsonToQueryString({
            period,
            page,
            page_size
          })
        })
      } else {
        setShowCustom(true)
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

  const handleDownload = useCallback(() => {
    const { from, to, period } = queryObj
    if (!from) {
      downloadDevelopersEarning({
        teamName: me.team.name,
        params: {
          period
        }
      })
    } else {
      downloadDevelopersEarning({
        teamName: me.team.name,
        params: {
          period: 'custom',
          from,
          to
        }
      })
    }
  }, [downloadDevelopersEarning, queryObj, me])

  if (isTotalEarningLoading || isDevelopersEarningLoading) {
    return <Spinner />
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="My Team Reports" disableWidgetMenu>
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
                  label="Period"
                  value={queryObj.period}
                  options={periodOptions}
                  onChange={handlePeriodChange}
                />
              </Grid>
            </Grid>
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
            <IndividualReportTable
              totalEarning={totalEarning}
              developersEarning={developersEarning}
              pagination={pagination}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
              period={queryObj}
            />
          </Widget>
        </Grid>
      </Grid>
    )
  }
}

const actions = {
  getTotalEarningReport,
  getDevelopersEarningReport,
  downloadDevelopersEarning
}

const selector = createStructuredSelector({
  me: meSelector,
  totalEarning: totalEarningSelector,
  isTotalEarningLoading: totalEarningLoadingSelector,
  developersEarning: developersEarningSelector,
  isDevelopersEarningLoading: developersEarningLoadingSelector
})

MyTeamReportList.propTypes = {
  getTotalEarningReport: PropTypes.func.isRequired,
  getDevelopersEarningReport: PropTypes.func.isRequired,
  totalEarning: PropTypes.object,
  isTotalEarningLoading: PropTypes.bool.isRequired,
  developersEarning: PropTypes.object,
  isDevelopersEarningLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default compose(withRouter, withPaginationInfo, connect(selector, actions))(MyTeamReportList)
