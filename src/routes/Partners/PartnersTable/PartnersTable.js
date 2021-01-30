import React from 'react'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { Link, withRouter } from 'react-router-dom'
import { Table, TableRow, TableHead, TableBody, TableCell, Button, Tooltip, Chip } from '@material-ui/core'
import PropTypes from 'prop-types'

import Spinner from 'components/Spinner'

const columns = ['Full Name', 'Email', 'Address', 'Data Of Birth', 'Phone Number', 'Contact Method', 'Actions']

function PartnersTable({ data, myRole, handleDelete, match: { path } }) {
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
          {data.map(({ id, full_name, email, address, dob, phone_num, contact_method }) => (
            <TableRow key={id}>
              <TableCell>{full_name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{address}</TableCell>
              <TableCell>{dob}</TableCell>
              <TableCell>{phone_num}</TableCell>
              <TableCell>
                {(contact_method || []).map(method => (
                  <Tooltip key={method.id} title={method.id} placement="top">
                    <Chip label={method.type} variant="outlined" />
                  </Tooltip>
                ))}
              </TableCell>
              <TableCell>
                <Button component={Link} to={`${path}/${id}/detail`}>
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

export default withRouter(PartnersTable)

PartnersTable.propTypes = {
  data: PropTypes.array,
  myRole: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  match: PropTypes.object
}
