import React from 'react'
import { Edit as EditIcon, Cancel as CancelIcon, Check as ApproveIcon, Close as DeclineIcon } from '@material-ui/icons'
import { Link, withRouter } from 'react-router-dom'
import { Table, TableRow, TableHead, TableBody, TableCell, Tooltip, IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'

import useStyles from './styles'
import {
  FINANCIALREQUEST_TYPE_LABELS,
  FINANCIALREQUEST_STATUS_LABELS,
  ROLES,
  FINANCIALREQUEST_STATUS,
  FINANCIALREQUEST_TYPE
} from 'config/constants'
import Spinner from 'components/Spinner'
import { FormattedDate, FormattedTime, FormattedNumber } from 'react-intl'

function FinancialRequestTable({ data, me, onCancel, onApprove, onDecline, match: { path } }) {
  const classes = useStyles()
  const columns = ['Type', 'Status', 'Amount', 'To', 'Requested time', 'Sender', 'Project', 'Actions']
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
          {data.map(({ id, type, status, amount, counter_party, requested_at, requester, project }) => (
            <TableRow key={id}>
              <TableCell>{FINANCIALREQUEST_TYPE_LABELS[type]}</TableCell>
              <TableCell>{FINANCIALREQUEST_STATUS_LABELS[status]}</TableCell>
              <TableCell>
                <FormattedNumber format="currency" value={amount} />
              </TableCell>
              <TableCell>{counter_party.full_name}</TableCell>
              <TableCell>
                <FormattedDate value={requested_at} format="shortDMY" /> <FormattedTime value={requested_at} />
              </TableCell>
              <TableCell>{`${requester.first_name} ${requester.last_name}`}</TableCell>
              <TableCell>{type !== FINANCIALREQUEST_TYPE.SENDPAYMENT ? project.title : null}</TableCell>
              <TableCell>
                {status === FINANCIALREQUEST_STATUS.PENDING ? (
                  <Tooltip key={`${id}Edit`} title="Edit" placement="top">
                    <IconButton component={Link} to={`${path}/${id}/detail`}>
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                ) : null}
                {requester.id === me.id && status === FINANCIALREQUEST_STATUS.PENDING ? (
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
      </Table>
    )
  } else {
    return <Spinner />
  }
}

export default withRouter(FinancialRequestTable)

FinancialRequestTable.propTypes = {
  data: PropTypes.array,
  me: PropTypes.object.isRequired,
  match: PropTypes.object,
  onApprove: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired
}
