import React, { useCallback, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectModal } from 'redux-modal'
import { createStructuredSelector } from 'reselect'
import { FormattedNumber, FormattedDate } from 'react-intl'
import { CloudDownload } from '@material-ui/icons'
import { Table, TableRow, TableHead, TableBody, TableCell, Typography, Tooltip } from '@material-ui/core'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import * as R from 'ramda'
import PropTypes from 'prop-types'

import {
  getIndividualDeveloperEarningReport,
  getIndividualDeveloperProjectEarningReport,
  individualDeveloperEarningLoadingSelector,
  individualDeveloperEarningSelector,
  individualDeveloperProjectEarningLoadingSelector,
  individualDeveloperProjectEarningSelector,
  downloadIndividualDeveloperProjectsEarning
} from 'store/modules/report'
import { getFullName } from 'helpers/utils'
import { periodOptions } from 'config/constants'
import Spinner from 'components/Spinner'
import useStyles from './styles'

const getPeriodLabel = period =>
  R.compose(R.prop('label'), R.defaultTo({}), R.find(R.propEq('value', period)))(periodOptions)

const IndividualReportModal = ({
  earning,
  projectEarning,
  isEarningLoading,
  isProjectEarningLoading,
  getIndividualDeveloperEarningReport,
  getIndividualDeveloperProjectEarningReport,
  downloadIndividualDeveloperProjectsEarning,
  show,
  handleHide,
  selectedPeriod,
  developerId
}) => {
  const classes = useStyles()
  const column = ['Project Title', 'Earning']
  const developer = getFullName(earning)

  useEffect(() => {
    getIndividualDeveloperEarningReport({
      developerId,
      params: selectedPeriod
    })
  }, [getIndividualDeveloperEarningReport, developerId, selectedPeriod])

  useEffect(() => {
    getIndividualDeveloperProjectEarningReport({
      developerId,
      params: selectedPeriod
    })
  }, [getIndividualDeveloperProjectEarningReport, developerId, selectedPeriod])

  const handleDownload = useCallback(() => {
    const { from, to, period } = selectedPeriod
    if (!from) {
      downloadIndividualDeveloperProjectsEarning({
        developer,
        developerId: earning.id,
        params: {
          period
        }
      })
    } else {
      downloadIndividualDeveloperProjectsEarning({
        developer,
        developerId: earning.id,
        params: {
          period: 'custom',
          from,
          to
        }
      })
    }
  }, [downloadIndividualDeveloperProjectsEarning, selectedPeriod, developer, earning])

  return (
    <Dialog open={show} onClose={handleHide}>
      <DialogTitle id="form-dialog-title">Earning Report</DialogTitle>
      {isEarningLoading || isProjectEarningLoading ? (
        <Spinner />
      ) : (
        <DialogContent className={classes.paper}>
          <Typography gutterBottom>Name: {developer}</Typography>
          <Typography gutterBottom>
            Period:
            {selectedPeriod.from !== undefined && selectedPeriod.from ? (
              <>
                <FormattedDate value={selectedPeriod.from} /> {'- '}
                <FormattedDate value={selectedPeriod.to} />
              </>
            ) : (
              getPeriodLabel(selectedPeriod.period)
            )}
          </Typography>
          <Typography gutterBottom>
            Amount: <FormattedNumber format="currency" value={earning && earning.earning} />
          </Typography>
          {projectEarning && projectEarning.length ? (
            <Table className="mb-0">
              <TableHead>
                <TableRow>
                  {column.map(key => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {projectEarning.map(data => (
                  <TableRow key={data.id}>
                    <TableCell>{data.title}</TableCell>
                    <TableCell>
                      <FormattedNumber format="currency" value={data.project_earning} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography className={classes.noItems}>No projects.</Typography>
          )}
        </DialogContent>
      )}
      <DialogActions>
        <Tooltip title="Export as CSV" placement="top">
          <Button onClick={handleDownload} variant="outlined" color="primary" className={classes.download}>
            <CloudDownload />
            &nbsp;Export
          </Button>
        </Tooltip>
        <Button onClick={handleHide} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const selector = createStructuredSelector({
  earning: individualDeveloperEarningSelector,
  projectEarning: individualDeveloperProjectEarningSelector,
  isEarningLoading: individualDeveloperEarningLoadingSelector,
  isProjectEarningLoading: individualDeveloperProjectEarningLoadingSelector
})

const actions = {
  getIndividualDeveloperEarningReport,
  getIndividualDeveloperProjectEarningReport,
  downloadIndividualDeveloperProjectsEarning
}

IndividualReportModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  earning: PropTypes.object,
  projectEarning: PropTypes.object,
  isEarningLoading: PropTypes.bool.isRequired,
  isProjectEarningLoading: PropTypes.bool.isRequired
}

export default compose(
  connectModal({ name: 'IndividualReportModal', destroyOnHide: false }),
  connect(selector, actions)
)(IndividualReportModal)
