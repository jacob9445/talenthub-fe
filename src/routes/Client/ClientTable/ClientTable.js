import React, { useMemo } from 'react'
import { Table, TableRow, TableHead, TableBody, TableCell, Tooltip, IconButton } from '@material-ui/core'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spinner from 'components/Spinner'
import { CLIENT_TYPE_LABELS, CLIENT_TYPES } from 'config/constants'
import { ROLES } from 'config/constants'

function ClientTable({ data, myRole, handleDelete, match: { path } }) {
  const columns = useMemo(
    () =>
      myRole === ROLES.DEVELOPER
        ? ['Full Name', 'Type', 'Company Name', 'Started at', 'Actions']
        : ['Full Name', 'Type', 'Company Name', 'Started at', 'Owner', 'Actions'],
    [myRole]
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
          {data.map(({ id, full_name, type, company_name, owner, started_at }) => (
            <TableRow key={id}>
              <TableCell>{full_name}</TableCell>
              <TableCell>{CLIENT_TYPE_LABELS[type]}</TableCell>
              <TableCell>{type === CLIENT_TYPES.INDIVIDUAL ? null : company_name}</TableCell>
              <TableCell>{started_at}</TableCell>
              {myRole === ROLES.DEVELOPER ? null : <TableCell>{`${owner.first_name} ${owner.last_name}`}</TableCell>}
              <TableCell>
                <Tooltip key={`${id}Edit`} title="Edit" placement="top">
                  <IconButton component={Link} to={`${path}/${id}/detail`}>
                    <EditIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip key={`${id}Delete`} title="Delete" placement="top">
                  <IconButton onClick={() => handleDelete(id)}>
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </Tooltip>
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

ClientTable.propTypes = {
  data: PropTypes.array,
  myRole: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

export default withRouter(ClientTable)
