import React from 'react'
import { FormattedNumber } from 'react-intl'
import { Table, TableRow, TableHead, TableBody, TableCell } from '@material-ui/core'
import PropTypes from 'prop-types'

const MyReportTable = ({ data }) => {
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
        {data &&
          data.project_earnings.map(project_earning => (
            <TableRow key={project_earning.id}>
              <TableCell>{project_earning.project_title}</TableCell>
              <TableCell>
                <FormattedNumber format="currency" value={project_earning.earning} />
              </TableCell>
            </TableRow>
          ))}
        <TableRow>
          <TableCell>
            <strong>Total</strong>
          </TableCell>
          <TableCell>
            <strong>
              <FormattedNumber format="currency" value={data ? data.earning : 0} />
            </strong>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

MyReportTable.propTypes = {
  data: PropTypes.object
}

export default MyReportTable
