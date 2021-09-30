import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getTeamsEarningReport, teamsEarningSelector, teamsEarningLoadingSelector } from 'store/modules/report'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import { periodOptions } from 'config/constants'
import DateRangePickerForm, { validationSchema } from 'components/DateRangePickerForm'
import SimpleSelect from 'components/SimpleSelect'
import Spinner from 'components/Spinner'
import TeamReportTable from '../../components/TeamReportTable'
import useStyles from './styles'
import Widget from 'components/Widget'

const TeamReportList = ({ teamsReport, getTeamsEarningReport, isTeamsReportLoading, location, history }) => {
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
    if (!from) {
      getTeamsEarningReport({
        params: {
          period
        }
      })
    } else {
      getTeamsEarningReport({
        params: {
          period: 'custom',
          from,
          to
        }
      })
    }
  }, [getTeamsEarningReport, queryObj])

  const handlePeriodChange = useCallback(
    event => {
      const period = event.target.value
      if (period !== 'custom') {
        setShowCustom(0)
        history.push({
          search: jsonToQueryString({
            period
          })
        })
      } else {
        setShowCustom(1)
      }
    },
    [history]
  )

  const handleSubmit = useCallback(
    (formValues, formActions) => {
      if (!formValues.from || !formValues.to) {
        return
      } else {
        history.push({
          search: jsonToQueryString({
            period: 'custom',
            from: formValues.from,
            to: formValues.to
          })
        })
      }
    },
    [history]
  )

  const initialValues = {
    from: queryObj.from || null,
    to: queryObj.to || null
  }

  if (isTeamsReportLoading) {
    return <Spinner />
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget
            title="Teams"
            disableWidgetMenu
            WidgetButton={
              <Grid container spacing={2} alignItems="center" justify="flex-end">
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
            <TeamReportTable data={teamsReport} />
          </Widget>
        </Grid>
      </Grid>
    )
  }
}

const actions = {
  getTeamsEarningReport
}

const selector = createStructuredSelector({
  teamsReport: teamsEarningSelector,
  isTeamsReportLoading: teamsEarningLoadingSelector
})

TeamReportList.propTypes = {
  teamsReport: PropTypes.array,
  getTeamsReport: PropTypes.func,
  isTeamsReportLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default compose(withRouter, connect(selector, actions))(TeamReportList)
