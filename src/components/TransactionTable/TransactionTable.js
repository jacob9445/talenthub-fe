import React, { useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { Table, TableRow, TableHead, TableBody, TableCell, TableFooter, TablePagination } from '@material-ui/core'
import PropTypes from 'prop-types'

import Spinner from 'components/Spinner'
import { FormattedDate,  FormattedNumber } from 'react-intl'
import { URL_PREFIXES } from 'config/constants'
import useStyles from './styles'
import { getPlatformLabel } from 'helpers/utils'

const briefText = (str, length) => (str.length > length ? str.substring(0, length) + ' ...' : str)

function TransactionTable({ data, history, me, pagination, onChangePage, onChangeRowsPerPage }) {
  const classes = useStyles()
  const columns = ['Date', 'From/To', 'Gross amount', 'Net Amount', 'Owner', 'Description', 'Payment Platform']
  const myRole = me?.role
  const handleRowClick = useCallback(
    id => () => {
      if (myRole) {
        history.push(`/${URL_PREFIXES[myRole]}/transactions/${id}/detail`)
      }
    },
    [history, myRole]
  )
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
          {data.results.map(({ id, gross_amount, net_amount, payment_platform, created_at, financial_request }) => (
            <TableRow key={id} hover onClick={handleRowClick(id)} className={classes.tableRow}>
              <TableCell>
                <FormattedDate value={created_at} />
              </TableCell>
              <TableCell>{financial_request.address}</TableCell>
              <TableCell>
                <FormattedNumber format="currency" value={gross_amount} />
              </TableCell>
              <TableCell>
                <FormattedNumber format="currency" value={net_amount} />
              </TableCell>
              <TableCell>
                {financial_request.requester.first_name} {financial_request.requester.last_name}
              </TableCell>
              <TableCell>{briefText(financial_request.description, 30)}</TableCell>
              <TableCell>{getPlatformLabel(payment_platform)}</TableCell>
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
    )
  } else {
    return <Spinner />
  }
}

TransactionTable.propTypes = {
  data: PropTypes.object,
  me: PropTypes.object.isRequired
}

export default withRouter(TransactionTable)
