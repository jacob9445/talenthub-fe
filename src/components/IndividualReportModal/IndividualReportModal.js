import React from 'react'
import { connectModal } from 'redux-modal'
import { FormattedNumber, FormattedDate } from 'react-intl'
import { Table, TableRow, TableHead, TableBody, TableCell, Typography } from '@material-ui/core'
import * as R from 'ramda'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'

import useStyles from './styles'
import { periodOptions } from 'config/constants'

const getPeriodLabel = period =>
  R.compose(R.prop('label'), R.defaultTo({}), R.find(R.propEq('value', period)))(periodOptions)

const IndividualReportModal = ({ show, handleHide, project_earning, period, developer, earning }) => {
  const classes = useStyles()
  const column = ['Project Title', 'Earning']
  return (
    <Dialog open={show} onClose={handleHide}>
      <DialogTitle id="form-dialog-title">Earning Report</DialogTitle>
      <DialogContent className={classes.paper}>
        <Typography gutterBottom>Name: {developer}</Typography>
        <Typography gutterBottom>
          Period:
          {period.from && period.from ? (
            <>
              <FormattedDate value={period.from} /> {'-'}
              <FormattedDate value={period.to} />
            </>
          ) : (
            getPeriodLabel(period.period)
          )}
        </Typography>
        <Typography gutterBottom>
          Amount: <FormattedNumber format="currency" value={earning} />
        </Typography>
        {project_earning && project_earning.length ? (
          <Table className="mb-0">
            <TableHead>
              <TableRow>
                {column.map(key => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {project_earning.map(data => (
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
      <DialogActions>
        <Button onClick={handleHide} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

IndividualReportModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  project_earning: PropTypes.array.isRequired
}

export default connectModal({ name: 'IndividualReportModal', destroyOnHide: false })(IndividualReportModal)
