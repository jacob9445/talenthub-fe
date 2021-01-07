import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
  Button
} from "@material-ui/core";

import useStyles from './styles'
import { Edit as EditIcon, Delete as DeleteIcon} from '@material-ui/icons'
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
    color: 'success',
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


const columns = ['Username', 'Email', 'First Name', 'Last Name', 'Role', 'Actions']

export default function TableComponent({ data, myRole, handleDelete}) {
  const classes = useStyles();

  if( data) {
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
          {
            data.map(({id, username, email, first_name, last_name, role}) => (
              <TableRow key={email}>
                <TableCell className="pl-3 fw-normal">{username}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{first_name}</TableCell>
                <TableCell>{last_name}</TableCell>
                <TableCell>
                  <Chip label={role_patterns[role].role} classes={{root: classes[role_patterns[role].color]}}/>
                </TableCell>
                {
                  myRole === ROLES.ADMIN && (
                    <TableCell>
                      <Button href={`/admin/users/${id}`}>
                        <EditIcon color='primary'/>
                      </Button>
                      <Button onClick={() => handleDelete(id)}>
                        <DeleteIcon color='secondary'/>
                      </Button>
                    </TableCell>
                  )
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    )
  } else {
    return <Spinner />
  }
  
}