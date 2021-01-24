import React from 'react'
import { Table, TableRow, TableHead, TableBody, TableCell, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { ROLES, PLATFORM_LABELS } from 'config/constants'
import Spinner from 'components/Spinner'

const columns = ['Profile', 'Platform Type', 'Email', 'Password', 'Location', 'Recovery Email', 'URL', 'Actions']

export default function TableComponent({ data, myRole, handleDelete }) {
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
          {data.map(({ id, profile, platform_type, email, password, location, recovery_email, url }) => (
            <TableRow key={id}>
              <TableCell>{profile}</TableCell>
              <TableCell>{PLATFORM_LABELS[platform_type]}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{password}</TableCell>
              <TableCell>{location}</TableCell>
              <TableCell>{recovery_email}</TableCell>
              <TableCell>{url}</TableCell>
              {[ROLES.ADMIN, ROLES.TEAM_MANAGER].includes(myRole) && (
                <TableCell>
                  <Button component={Link} to={`/admin/accounts/${id}/detail`}>
                    <EditIcon color="primary" />
                  </Button>
                  <Button onClick={() => handleDelete(id)}>
                    <DeleteIcon color="secondary" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  } else {
    return <Spinner />
  }
}

TableComponent.propTypes = {
  data: PropTypes.array,
  myRole: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired
}
