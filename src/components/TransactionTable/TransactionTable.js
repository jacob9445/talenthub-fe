import React, { useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  Tooltip,
  IconButton
} from '@material-ui/core'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import PropTypes from 'prop-types'

import Spinner from 'components/Spinner'
import { FormattedDate, FormattedNumber } from 'react-intl'
import { URL_PREFIXES } from 'config/constants'
import useStyles from './styles'
import { getFullName } from 'helpers/utils'
import { ListDataType } from 'helpers/prop-types'

const briefText = (str, length) => (str && str.length > length ? str.substring(0, length) + '...' : str)

function TransactionTable({ data, history, me, pagination, onChangePage, onChangeRowsPerPage, location, onDelete }) {
  const classes = useStyles()
  const columns = ['Date', 'From/To', 'Gross amount', 'Net Amount', 'Owner', 'Description', 'PaymentAccount ID']
  const role = me?.role

  const showTransactionDetail = useCallback(
    id => () => {
      history.push(`/${URL_PREFIXES[role]}/financial-reports/transactions/${id}/detail`, location.pathname)
    },
    [history, location.pathname, role]
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
          {data.results.map(({ id, gross_amount, net_amount, created_at, financial_request, payment_account }) => (
            <TableRow key={id} hover className={classes.tableRow}>
              <TableCell>
                <FormattedDate value={created_at} />
              </TableCell>
              <TableCell>{financial_request?.address}</TableCell>
              <TableCell>
                <FormattedNumber format="currency" value={gross_amount} />
              </TableCell>
              <TableCell>
                <FormattedNumber format="currency" value={net_amount} />
              </TableCell>
              <TableCell>{getFullName(financial_request?.requester) || ''}</TableCell>
              <TableCell>{briefText(financial_request?.description, 30) || ''}</TableCell>
              <TableCell align="center">{`${payment_account.display_name} (${payment_account.address}) - ${payment_account.platform}`}</TableCell>
              <TableCell>
                <Tooltip key={`${id}Edit`} title="Edit" placement="top">
                  <IconButton onClick={showTransactionDetail(id)}>
                    <EditIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip key={`${id}Delete`} title="Delete" placement="top">
                  <IconButton onClick={() => onDelete(id)}>
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              </TableCell>
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
  data: ListDataType,
  me: PropTypes.object.isRequired
}

export default withRouter(TransactionTable)
