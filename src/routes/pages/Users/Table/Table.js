import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";

import  useStyles from './styles'

const role_patterns = [
  {
    id: 0,
    role: null,
    color: ''
  },
  {
    id: 1, //Admin
    role: 'AD',
    color: 'success',
  },
  {
    id: 2, //Team Manager
    role: 'TM',
    color: 'warning'
  },
  {
    id: 3, //Developer
    role: 'DV',
    color: 'secondary'
  }
]


const columns = ['Username', 'Email', 'First Name', 'Last Name', 'Role']

export default function TableComponent({ data }) {
  const classes = useStyles();

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
          data ? data.map(({username, email, first_name, last_name, role}) => (
            <TableRow key={email}>
              <TableCell className="pl-3 fw-normal">{username}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{first_name}</TableCell>
              <TableCell>{last_name}</TableCell>
              <TableCell>
                <Chip label={role_patterns[role].role} classes={{root: classes[role_patterns[role].color]}}/>
              </TableCell>
            </TableRow>
          )) : <h6> No Data </h6>
        }
      </TableBody>
    </Table>
  );
}
