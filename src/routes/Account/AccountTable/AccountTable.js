import React from 'react'
import { Table, TableRow, TableHead, TableBody, TableCell, Tooltip, IconButton } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { ROLES, PLATFORM_LABELS } from 'config/constants'
import Spinner from 'components/Spinner'

const columns = ['Profile', 'Platform Type', 'Email', 'Password', 'Location', 'Recovery Email', 'URL', 'Actions']

function AccountTable({ data, myRole, handleDelete, match: { path } }) {
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

AccountTable.propTypes = {
  data: PropTypes.array,
  myRole: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

export default withRouter(AccountTable)
