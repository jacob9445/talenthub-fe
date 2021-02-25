import React, { useCallback } from 'react'
import { Table, TableRow, TableHead, TableBody, TableCell, TablePagination, TableFooter } from '@material-ui/core'
import PropTypes from 'prop-types'
import { show } from 'redux-modal'
import { connect } from 'react-redux'

import Spinner from 'components/Spinner'
import useStyles from './styles'

function TeamReportTable({ data, show, pagination, onChangePage, onChangeRowsPerPage }) {
  const columns = ['Team Name', 'Earning']
  const classes = useStyles()

  const handleRowClick = useCallback(
    id => () => {
      show('ReportModal', {
        project_earning: data.results.find((value, index, array) => array[index].id === id).project_earnings
      })
    },
    [show, data]
  )

  if (data) {
    return (
      <>
        <Table className="mb-0">
          <TableHead>
            <TableRow>
              {columns.map(key => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.results.map(({ id, name, earning }) => (
              <TableRow key={id} hover onClick={handleRowClick(id)} className={classes.tableRow}>
                <TableCell>{name}</TableCell>
                <TableCell>{earning}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination //This pagination is zero-based.
                rowsPerPageOptions={[2, 5, 10, 25]}
                count={data.count}
                rowsPerPage={pagination.page_size}
                page={pagination.page - 1}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </>
    )
  } else {
    return <Spinner />
  }
}

const actions = {
  show
}

TeamReportTable.propTypes = {
  data: PropTypes.object,
  show: PropTypes.func.isRequired
}

export default connect(
  null,
  actions
)(TeamReportTable)
