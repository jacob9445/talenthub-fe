import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { FormattedNumber } from 'react-intl'
import { show } from 'redux-modal'
import { Table, TableRow, TableHead, TableBody, TableCell, TablePagination, TableFooter } from '@material-ui/core'
import PropTypes from 'prop-types'

import useStyles from './styles'

function IndividualReportTable({
  totalEarning,
  developersEarning,
  show,
  pagination,
  onChangePage,
  onChangeRowsPerPage,
  period
}) {
  const columns = ['Full Name', 'Earning']
  const classes = useStyles()

  const handleRowClick = useCallback(
    id => {
      show('IndividualReportModal', {
        developerId: id,
        selectedPeriod: period
      })
    },
    [show, period]
  )
  return totalEarning && developersEarning ? (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          <TableCell>
            <strong>Total Earning</strong>
          </TableCell>
          <TableCell>
            <strong>
              <FormattedNumber format="currency" value={totalEarning.total_earnings} />
            </strong>
          </TableCell>
        </TableRow>
        <TableRow>
          {columns.map(key => (
            <TableCell key={key}>
              <strong> {key} </strong>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {developersEarning
          ? developersEarning.results.map(({ id, first_name, last_name, earning }) => (
              <TableRow key={id} hover onClick={() => handleRowClick(id)} className={classes.tableRow}>
                <TableCell>{`${last_name} ${first_name}`}</TableCell>
                <TableCell>
                  <FormattedNumber format="currency" value={earning} />
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination //This pagination is zero-based.
            rowsPerPageOptions={[2, 5, 10, 25]}
            count={developersEarning.count}
            rowsPerPage={pagination.page_size}
            page={pagination.page - 1}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </TableRow>
      </TableFooter>
    </Table>
  ) : null
}

const actions = {
  show
}

IndividualReportTable.propTypes = {
  totalEarning: PropTypes.object,
  developersEarning: PropTypes.object,
  show: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
}

export default connect(null, actions)(IndividualReportTable)
