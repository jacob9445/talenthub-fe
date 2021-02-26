import React from 'react'
import { connectModal } from 'redux-modal'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import PropTypes from 'prop-types'
import { Table, TableRow, TableHead, TableBody, TableCell, Typography } from '@material-ui/core'

import useStyles from './style'

const ReportModal = ({ show, handleHide, project_earning }) => {
  const classes = useStyles()
  const columns = ['Project Title', 'Earning']

  return (
    <Dialog open={show} onClose={handleHide}>
      <DialogTitle id="form-dialog-title">Report</DialogTitle>
      <DialogContent>
        {project_earning.length ? (
          <Table className="mb-0">
            <TableHead>
              <TableRow>
                {columns.map(key => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {project_earning.map(({ project_title, earning }) => (
                <TableRow key={project_title}>
                  <TableCell>{project_title}</TableCell>
                  <TableCell>{earning}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography className={classes.noItems} variant="body1">
            No Projects.
          </Typography>
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

ReportModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  project_earning: PropTypes.array.isRequired
}

export default connectModal({ name: 'ReportModal', destroyOnHide: false })(ReportModal)
