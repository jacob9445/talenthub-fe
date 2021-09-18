import React, { useMemo } from 'react'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { Link, withRouter } from 'react-router-dom'
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  IconButton,
  Tooltip,
  Chip
} from '@material-ui/core'
import PropTypes from 'prop-types'

import { ROLES } from 'config/constants'
import Spinner from 'components/Spinner'
import { ListDataType } from 'helpers/prop-types'
import { getFullName } from 'helpers/utils'

function PartnerTable({ data, role, handleDelete, match: { path }, pagination, onChangePage, onChangeRowsPerPage }) {
  const columns = useMemo(
    () =>
      role === ROLES.DEVELOPER
        ? ['Full Name', 'Email', 'Address', 'Date of Birth', 'Phone Number', 'Contact Method', 'Actions']
        : ['Full Name', 'Email', 'Address', 'Date of Birth', 'Phone Number', 'Contact Method', 'Owner', 'Actions'],
    [role]
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
          {data.results.map(({ id, full_name, email, address, dob, phone_num, contact_method, owner }) => (
            <TableRow key={id} hover>
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
              {role === ROLES.DEVELOPER ? null : <TableCell>{getFullName(owner)}</TableCell>}
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
        <TableFooter>
          <TableRow>
            <TablePagination //This pagination is zero-based.
              rowsPerPageOptions={[2, 5, 10, 25]}
              count={data.count}
              rowsPerPage={pagination.page_size}
              page={pagination.page - 1}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    )
  } else {
    return <Spinner />
  }
}

export default withRouter(PartnerTable)

PartnerTable.propTypes = {
  data: ListDataType,
  role: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}
