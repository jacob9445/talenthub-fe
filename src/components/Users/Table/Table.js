import React from 'react'
import { Table, TableRow, TableHead, TableBody, TableCell, Chip, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import useStyles from './styles'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { ROLES } from 'config/constants'
import Spinner from 'components/Spinner'

const role_patterns = [
  {
    id: 0,
    role: null,
    color: ''
  },
  {
    id: ROLES.ADMIN,
    role: 'AD',
    color: 'success'
  },
  {
    id: ROLES.TEAM_MANAGER,
    role: 'TM',
    color: 'warning'
  },
  {
    id: ROLES.DEVELOPER,
    role: 'DV',
    color: 'secondary'
  }
]

const columns = ['Email', 'First Name', 'Last Name', 'Role', 'Actions']

export default function TableComponent({ data, myRole, handleDelete }) {
  const classes = useStyles()

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
          {data.map(({ id, email, first_name, last_name, role }) => (
            <TableRow key={email}>
              <TableCell>
                <Link to={`/admin/users/${id}/detail`}>{email}</Link>
              </TableCell>
              <TableCell>{first_name}</TableCell>
              <TableCell>{last_name}</TableCell>
              <TableCell>
                <Chip label={role_patterns[role].role} classes={{ root: classes[role_patterns[role].color] }} />
              </TableCell>
              {[ROLES.ADMIN, ROLES.TEAM_MANAGER].includes(myRole) && (
                <TableCell>
                  <Button component={Link} to={`/admin/users/${id}/detail`}>
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
