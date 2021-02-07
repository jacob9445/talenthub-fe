import React, { useMemo } from 'react'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { Link, withRouter } from 'react-router-dom'
import { Table, TableRow, TableHead, TableBody, TableCell, IconButton, Tooltip, Chip } from '@material-ui/core'
import PropTypes from 'prop-types'

import { ROLES } from 'config/constants'
import Spinner from 'components/Spinner'

function PartnersTable({ data, myRole, handleDelete, match: { path } }) {
  const columns = useMemo(
    () =>
      myRole === ROLES.DEVELOPER
        ? ['Full Name', 'Email', 'Address', 'Dob', 'Phone Number', 'Contact Method', 'Actions']
        : ['Full Name', 'Email', 'Address', 'Dob', 'Phone Number', 'Contact Method', 'Owner', 'Actions'],
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
          {data.map(({ id, full_name, email, address, dob, phone_num, contact_method, owner }) => (
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

export default withRouter(PartnersTable)

PartnersTable.propTypes = {
  data: PropTypes.array,
  myRole: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}
