import React, { useCallback, useMemo } from 'react'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'
import cn from 'classnames'
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

import { ROLES, PROJECT_STATUS_LABELS, PROJECT_TYPE_LABELS, URL_PREFIXES } from 'config/constants'
import Spinner from 'components/Spinner'
import useStyles from './styles'
import { ListDataType } from 'helpers/prop-types'

function ProjectTable({
  data,
  role,
  onDelete,
  history,
  location,
  disableActions,
  pagination,
  onChangePage,
  onChangeRowsPerPage
}) {
  const classes = useStyles()
  const columns = useMemo(() => {
    function getColumns(role, disableActions) {
      let columns = ['Title', 'Type', 'Weakly Limit', 'Price', 'Status']
      if ([ROLES.ADMIN, ROLES.TEAM_MANAGER].includes(role)) columns.push('Project Starter')
      if (!disableActions) columns.push('Actions')
      return columns
    }

    return getColumns(role, disableActions)
  }, [role, disableActions])

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
          {results.map(({ id, title, type, weakly_limit, price, status, project_starter }) => (
            <TableRow
              key={id}
              hover
              className={cn({ [classes.tableRow]: disableActions })}
              onClick={disableActions ? showProjectDetail(id) : undefined}>
              <TableCell>{title}</TableCell>
              <TableCell>{PROJECT_TYPE_LABELS[type]}</TableCell>
              <TableCell>{weakly_limit}</TableCell>
              <TableCell>{price}</TableCell>
              <TableCell>{PROJECT_STATUS_LABELS[status]}</TableCell>
              {[ROLES.ADMIN, ROLES.TEAM_MANAGER].includes(role) ? (
                <TableCell>{`${project_starter.first_name} ${project_starter.last_name}`}</TableCell>
              ) : null}
              {!disableActions && (
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
              )}
            </TableRow>
          ))}
        </TableBody>
        {!disableActions && (
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
        )}
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

ProjectTable.defaultProps = {
  disableActions: false
}
