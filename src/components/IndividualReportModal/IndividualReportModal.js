import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectModal } from 'redux-modal'
import { createStructuredSelector } from 'reselect'
import { FormattedNumber, FormattedDate } from 'react-intl'
import { Table, TableRow, TableHead, TableBody, TableCell, Typography } from '@material-ui/core'
import * as R from 'ramda'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'

import {
  getIndividualDeveloperEarningReport,
  getIndividualDeveloperProjectEarningReport,
  individualDeveloperEarningLoadingSelector,
  individualDeveloperEarningSelector,
  individualDeveloperProjectEarningLoadingSelector,
  individualDeveloperProjectEarningSelector
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
          {projectEarning && projectEarning.project_earnings.length ? (
            <Table className="mb-0">
              <TableHead>
                <TableRow>
                  {column.map(key => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {projectEarning.project_earnings.map(data => (
                  <TableRow key={data.id}>
                    <TableCell>{data.project_title}</TableCell>
                    <TableCell>
                      <FormattedNumber format="currency" value={data.earning} />
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
  getIndividualDeveloperProjectEarningReport
}

IndividualReportModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  earning: PropTypes.object.isRequired,
  projectEarning: PropTypes.object.isRequired,
  isEarningLoading: PropTypes.bool.isRequired,
  isProjectEarningLoading: PropTypes.bool.isRequired
}

export default compose(
  connectModal({ name: 'IndividualReportModal', destroyOnHide: false }),
  connect(selector, actions)
)(IndividualReportModal)
