import React, { useMemo } from 'react'
import { Table, TableRow, TableHead, TableBody, TableCell, Button } from '@material-ui/core'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spinner from 'components/Spinner'
import { CLIENT_TYPE_LABELS, CLIENT_TYPES, URL_PREFIXES } from 'config/constants'
import { ROLES } from 'config/constants'

export default function ClientsTable({ data, myRole, handleDelete }) {
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
                <Button component={Link} to={`/${URL_PREFIXES[myRole]}/clients/${id}/detail`}>
                  <EditIcon color="primary" />
                </Button>
                <Button onClick={() => handleDelete(id)}>
                  <DeleteIcon color="secondary" />
                </Button>
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

ClientsTable.propTypes = {
  data: PropTypes.array,
  myRole: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired
}
