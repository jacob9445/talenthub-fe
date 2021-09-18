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

import useStyles from './styles'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { profile_type_patterns, gender_patterns } from 'config/constants'
import Spinner from 'components/Spinner'
import { ListDataType } from 'helpers/prop-types'
import { getFullName } from 'helpers/utils'

const columns = ['Owner', 'Full Name', 'Type', 'Address', 'Country', 'Date of Birth', 'Gender', 'Actions']

function ProfileTable({ data, handleDelete, match: { path }, pagination, onChangePage, onChangeRowsPerPage }) {
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
          {data.results.map(({ id, profile_type, first_name, last_name, address, country, dob, gender, user }) => (
            <TableRow key={id} hover>
              <TableCell>{getFullName(user)}</TableCell>
              <TableCell>
                {first_name} {last_name}
              </TableCell>
              <TableCell>
                <Chip
                  label={profile_type_patterns[profile_type].type}
                  classes={{ root: classes[profile_type_patterns[profile_type].color] }}
                />
              </TableCell>
              <TableCell>{address}</TableCell>
              <TableCell>{country}</TableCell>
              <TableCell>{dob}</TableCell>
              <TableCell>{gender_patterns[gender]}</TableCell>
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

ProfileTable.propTypes = {
  data: ListDataType,
  handleDelete: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

export default withRouter(ProfileTable)
