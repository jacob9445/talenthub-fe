import React from 'react'
import { Table, TableRow, TableHead, TableBody, TableCell } from '@material-ui/core'
import PropTypes from 'prop-types'

import Spinner from 'components/Spinner'

function IndividualReportTable({ data }) {
  const columns = ['Full Name', 'Earning']
  if (data) {
    return (
      <Table className="mb-0">
        <TableHead>
          <TableRow>
            {columns.map(key => (
              <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, first_name, last_name, earning }) => (
            <TableRow key={id}>
              <TableCell>{`${first_name} ${last_name}`}</TableCell>
              <TableCell>{earning}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  } else {
    return <Spinner />
  }
}

IndividualReportTable.propTypes = {
  data: PropTypes.array
}

export default IndividualReportTable
