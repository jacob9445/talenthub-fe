import React, { useCallback, useMemo } from 'react'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'
import { Table, TableRow, TableHead, TableBody, TableCell, Tooltip, IconButton, Button } from '@material-ui/core'
import PropTypes from 'prop-types'

import { ROLES, PROJECT_STATUS_LABELS, PROJECT_TYPE_LABELS, URL_PREFIXES } from 'config/constants'
import Spinner from 'components/Spinner'

function ProjectTable({ data, myRole, onDelete, history, location, disableActions }) {
  const columns = useMemo(() => {
    function getColumns(role, disableActions) {
      let columns = ['Title', 'Type', 'Weakly Limit', 'Price', 'Status']
      if ([ROLES.ADMIN, ROLES.TEAM_MANAGER].includes(role)) columns.push('Project Starter')
      if (!disableActions) columns.push('Actions')
      return columns
    }

    return getColumns(myRole, disableActions)
  }, [myRole, disableActions])

  const showProjectDetail = useCallback(
    id => () => {
      history.push(`/${URL_PREFIXES[myRole]}/projects/${id}/detail`, location.pathname)
    },
    [history, location.pathname, myRole]
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
          {data.map(({ id, title, type, weakly_limit, price, status, project_starter }) => (
            <TableRow key={id}>
              <TableCell>
                <Button onClick={showProjectDetail(id)}>{title}</Button>
              </TableCell>
              <TableCell>{PROJECT_TYPE_LABELS[type]}</TableCell>
              <TableCell>{weakly_limit}</TableCell>
              <TableCell>{price}</TableCell>
              <TableCell>{PROJECT_STATUS_LABELS[status]}</TableCell>
              {[ROLES.ADMIN, ROLES.TEAM_MANAGER].includes(myRole) ? (
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
      </Table>
    )
  } else {
    return <Spinner />
  }
}

export default withRouter(ProjectTable)

ProjectTable.propTypes = {
  data: PropTypes.array,
  myRole: PropTypes.number.isRequired,
  handleDelete: PropTypes.func,
  history: PropTypes.object.isRequired,
  disableActions: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
}

ProjectTable.defaultProps = {
  disableActions: false
}
