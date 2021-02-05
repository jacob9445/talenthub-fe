import React, { useCallback } from 'react'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'
import { Table, TableRow, TableHead, TableBody, TableCell, Button } from '@material-ui/core'
import PropTypes from 'prop-types'

import { ROLES, PROJECT_STATUS_LABELS, PROJECT_TYPE_LABELS, URL_PREFIXES } from 'config/constants'
import Spinner from 'components/Spinner'

function ProjectTable({ data, myRole, handleDelete, match: { path }, history, location }) {
  const columns = [ROLES.ADMIN, ROLES.TEAM_MANAGER].includes(myRole)
    ? ['Title', 'Type', 'Weakly Limit', 'Price', 'Status', 'Project Starter', 'Actions']
    : ['Title', 'Type', 'Weakly Limit', 'Price', 'Status', 'Actions']

  const showProjectDetail = useCallback(
    id => () => {
      history.push(`/${URL_PREFIXES[myRole]}/project/${id}/detail`, location.pathname)
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
              <TableCell>{title}</TableCell>
              <TableCell>{PROJECT_TYPE_LABELS[type]}</TableCell>
              <TableCell>{weakly_limit}</TableCell>
              <TableCell>{price}</TableCell>
              <TableCell>{PROJECT_STATUS_LABELS[status]}</TableCell>
              {[ROLES.ADMIN, ROLES.TEAM_MANAGER].includes(myRole) ? (
                <TableCell>{`${project_starter.first_name} ${project_starter.last_name}`}</TableCell>
              ) : null}
              <TableCell>
                <Button onClick={showProjectDetail(id)}>
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

export default withRouter(ProjectTable)

ProjectTable.propTypes = {
  data: PropTypes.array,
  myRole: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  match: PropTypes.object
}
