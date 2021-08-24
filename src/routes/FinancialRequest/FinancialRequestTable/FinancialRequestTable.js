import React, { useCallback, useEffect, useState } from 'react'
import { Edit as EditIcon, Cancel as CancelIcon, Check as ApproveIcon, Close as DeclineIcon } from '@material-ui/icons'
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
import PropTypes from 'prop-types'

import useStyles from './styles'
import {
  FINANCIALREQUEST_TYPE_LABELS,
  FINANCIALREQUEST_STATUS_LABELS,
  ROLES,
  FINANCIALREQUEST_STATUS,
  FINANCIALREQUEST_TYPE,
  URL_PREFIXES
} from 'config/constants'
import Spinner from 'components/Spinner'
import { FormattedDate, FormattedTime, FormattedNumber } from 'react-intl'

function FinancialRequestTable({
  data,
  me,
  onCancel,
  onApprove,
  onDecline,
  history,
  location,
  fromDashboard,
  pagination,
  onChangePage,
  onChangeRowsPerPage
}) {
  const classes = useStyles()
  const columns = ['Time', 'Project', 'Sender', 'To', 'Amount', 'Type', 'Status', 'Actions']

  const showFinancialRequestDetail = useCallback(
    id => () => {
      history.push(`/${URL_PREFIXES[me.role]}/financial-requests/${id}/detail`, location.pathname)
    },
    [history, location.pathname, me.role]
  )

  const [results, setResults] = useState([])

  useEffect(() => {
    if (fromDashboard) {
      setResults(data)
    } else {
      data && setResults(data.results)
    }
  }, [fromDashboard, setResults, data])

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
          {results.map(({ id, type, status, amount, address, requested_at, requester, project }) => (
            <TableRow key={id}>
              <TableCell>
                <FormattedDate value={requested_at} />
              </TableCell>
              <TableCell>{type !== FINANCIALREQUEST_TYPE.SENDPAYMENT ? project.title : null}</TableCell>
              <TableCell>{`${requester.first_name} ${requester.last_name}`}</TableCell>
              <TableCell>{address}</TableCell>
              <TableCell>
                <FormattedNumber format="currency" value={amount} />
              </TableCell>
              <TableCell>{FINANCIALREQUEST_TYPE_LABELS[type]}</TableCell>
              <TableCell>{FINANCIALREQUEST_STATUS_LABELS[status]}</TableCell>
              <TableCell>
                {status === FINANCIALREQUEST_STATUS.PENDING ? (
                  <Tooltip key={`${id}Edit`} title="Edit" placement="top">
                    <IconButton onClick={showFinancialRequestDetail(id)}>
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                ) : null}
                {ROLES.ADMIN !== me.role && requester.id === me.id && status === FINANCIALREQUEST_STATUS.PENDING ? (
                  <Tooltip key={`${id}Cancel`} title="Cancel" placement="top">
                    <IconButton onClick={() => onCancel(id)}>
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                ) : null}
                {ROLES.ADMIN === me.role && status === FINANCIALREQUEST_STATUS.PENDING ? (
                  <>
                    <Tooltip key={`${id}Approve`} title="Approve" placement="top">
                      <IconButton onClick={() => onApprove(id, amount, type)}>
                        <ApproveIcon className={classes.success} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip key={`${id}Decline`} title="Decline" placement="top">
                      <IconButton onClick={() => onDecline(id)}>
                        <DeclineIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {!fromDashboard && (
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
        )}
      </Table>
    )
  } else {
    return <Spinner />
  }
}

export default withRouter(FinancialRequestTable)

FinancialRequestTable.propTypes = {
  data: PropTypes.object,
  me: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onApprove: PropTypes.func,
  onCancel: PropTypes.func,
  onDecline: PropTypes.func
}

FinancialRequestTable.defaultProps = {
  fromDashboard: false
}
