import React from 'react'
import { Table, TableRow, TableHead, TableBody, TableCell } from '@material-ui/core'
import PropTypes from 'prop-types'

import Spinner from 'components/Spinner'

function TeamReportTable({ data }) {
  console.log({ data })
  const columns = ['Team Name', 'Earning']
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
          {data.map(({ id, name, earning }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
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

TeamReportTable.propTypes = {
  data: PropTypes.array
}

export default TeamReportTable
