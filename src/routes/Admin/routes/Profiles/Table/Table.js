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
import { Link } from 'react-router-dom'

import useStyles from './styles'
import { Edit as EditIcon, Delete as DeleteIcon} from '@material-ui/icons'
import { PROFILE_TYPES, GENDER, ROLES } from 'config/constants'
import Spinner from 'components/Spinner'

const profile_type_patterns = [
  {
    id: 0,
    role: null,
    color: ''
  },
  {
    id: PROFILE_TYPES.SELF,
    type: 'Self',
    color: 'success',
  },
  {
    id: PROFILE_TYPES.PARTNER,
    type: 'Partner',
    color: 'warning'
  },
]

const gender_patterns = {
  [GENDER.MALE]: 'Male',
  [GENDER.FEMALE]: 'Female' 
}

const columns = ['Username', 'Type', 'Full Name', 'Address', 'Country', 'Date of Birth', 'Gender', 'Actions']

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
          {data.map(({id, username, profile_type, first_name, last_name, address, country, dob, gender}) => (
            <TableRow key={id}>
              <TableCell>{username}</TableCell>
              <TableCell>
                <Chip 
                  label={profile_type_patterns[profile_type].type}
                  classes={{root: classes[profile_type_patterns[profile_type].color]}}
                />
              </TableCell>
              <TableCell>{first_name} {last_name}</TableCell>
              <TableCell>{address}</TableCell>
              <TableCell>{country}</TableCell>
              <TableCell>{dob}</TableCell>
              <TableCell>{gender_patterns[gender]}</TableCell>
              {[ROLES.ADMIN, ROLES.TEAM_MANAGER].includes(myRole) && (
                <TableCell>
                  <Button component={Link} to={`/admin/users/${id}/edit`}>
                    <EditIcon color='primary'/>
                  </Button>
                  <Button onClick={() => handleDelete(id)}>
                    <DeleteIcon color='secondary'/>
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
