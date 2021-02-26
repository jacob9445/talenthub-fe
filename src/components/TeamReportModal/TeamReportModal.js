import React from 'react'
import { connectModal } from 'redux-modal'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import PropTypes from 'prop-types'
import { Table, TableRow, TableHead, TableBody, TableCell } from '@material-ui/core'

const TeamReportModal = ({ show, handleHide, earning }) => {
  const column = ["Full Name", "Earning"]

  return (
    <Dialog open={show} onClose={handleHide}>
      <DialogTitle id="form-dialog-title">Report</DialogTitle>
      <DialogContent>
        <Table className="mb-0">
          <TableHead>
            <TableRow>
              {column.map(key => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {earning.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.full_name}</TableCell>
                <TableCell>{data.earning}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleHide} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

TeamReportModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  earning: PropTypes.array.isRequired
}

export default connectModal({ name: 'TeamReportModal', destroyOnHide: false })(TeamReportModal)
