import React from 'react'
import { Table, TableRow, TableHead, TableBody, TableCell, Button } from '@material-ui/core'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spinner from 'components/Spinner'
import { CLIENT_TYPE_LABELS, ROLES } from 'config/constants'

const columns = ['Full Name', 'Type', 'Company Name', 'Started at', 'Actions']

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
          {data.map(({ id, full_name, type, company_name, started_at }) => (
            <TableRow key={id}>
              <TableCell>{full_name}</TableCell>
              <TableCell>{CLIENT_TYPE_LABELS[type]}</TableCell>
              <TableCell>{company_name}</TableCell>
              <TableCell>{started_at}</TableCell>
              {[ROLES.DEVELOPER].includes(myRole) && (
                <TableCell>
                  <Button component={Link} to={`/developer/clients/${id}/detail`}>
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
