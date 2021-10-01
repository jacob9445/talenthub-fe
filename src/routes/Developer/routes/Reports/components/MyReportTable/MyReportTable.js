import React from 'react'
import { FormattedNumber } from 'react-intl'
import { Table, TableRow, TableHead, TableBody, TableCell } from '@material-ui/core'
import PropTypes from 'prop-types'

const MyReportTable = ({ earning, projectEarnings }) => {
  const column = ['Project Title', 'Earning']
  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {column.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {projectEarnings &&
          projectEarnings.map(project_earning => (
            <TableRow key={project_earning.id}>
              <TableCell>{project_earning.title}</TableCell>
              <TableCell>
                <FormattedNumber format="currency" value={project_earning.project_earning} />
              </TableCell>
            </TableRow>
          ))}
        <TableRow>
          <TableCell>
            <strong>Total</strong>
          </TableCell>
          <TableCell>
            <strong>
              <FormattedNumber format="currency" value={earning ? earning[0].earning : 0} />
            </strong>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

MyReportTable.propTypes = {
  earning: PropTypes.array,
  projectEarnings: PropTypes.array
}

export default MyReportTable
