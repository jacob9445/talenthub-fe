import React, { useCallback } from 'react'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  Tooltip,
  IconButton
} from '@material-ui/core'
import PropTypes from 'prop-types'

import { URL_PREFIXES, PAYMENT_PLATFORM_TYPE } from 'config/constants'
import Spinner from 'components/Spinner'
import { ListDataType } from 'helpers/prop-types'

function ProjectTable({ data, role, onDelete, history, location, pagination, onChangePage, onChangeRowsPerPage }) {
  const columns = ['Platform', 'Address', 'Display Name']

  const showProjectDetail = useCallback(
    id => () => {
      history.push(`/${URL_PREFIXES[role]}/projects/${id}/detail`, location.pathname)
    },
    [history, location.pathname, role]
  )

  if (data) {
    const { results } = data
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
          {results.map(({ id, platform, address, displayName }) => (
            <TableRow key={id} hover onClick={showProjectDetail(id)}>
              <TableCell>{PAYMENT_PLATFORM_TYPE[platform]}</TableCell>
              <TableCell>{address}</TableCell>
              <TableCell>{displayName}</TableCell>
              <TableCell>
                <Tooltip key={`${id}Edit`} title="Edit" placement="top">
                  <IconButton onClick={showProjectDetail(id)}>
                    <EditIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip key={`${id}Delete`} title="Delete" placement="top">
                  <IconButton onClick={() => onDelete(id)}>
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

export default withRouter(ProjectTable)

ProjectTable.propTypes = {
  data: ListDataType,
  role: PropTypes.number.isRequired,
  handleDelete: PropTypes.func,
  history: PropTypes.object.isRequired,
  disableActions: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
}
