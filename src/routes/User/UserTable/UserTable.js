import React from 'react'
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  Chip,
  Tooltip,
  IconButton
} from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import useStyles from './styles'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { ROLES } from 'config/constants'
import Spinner from 'components/Spinner'
import { ListDataType } from 'helpers/prop-types'

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

const columns = ['Full name', 'Email', 'Role', 'Actions']

function UserTable({ data, myRole, handleDelete, match: { path }, pagination, onChangePage, onChangeRowsPerPage }) {
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
          {data.results.map(({ id, email, first_name, last_name, role }) => (
            <TableRow key={email} hover>
              <TableCell>
                {first_name} {last_name}
              </TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>
                <Chip label={role_patterns[role].role} classes={{ root: classes[role_patterns[role].color] }} />
              </TableCell>
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

UserTable.propTypes = {
  data: ListDataType,
  myRole: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
}

export default compose(withRouter)(UserTable)
