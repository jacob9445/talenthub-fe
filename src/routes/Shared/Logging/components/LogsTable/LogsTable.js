import React, { useCallback } from 'react'
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  Button
} from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import Spinner from 'components/Spinner'
import { truncateText } from 'helpers/utils'
import { ListDataType } from 'helpers/prop-types'
import { URL_PREFIXES } from 'config/constants'

const columns = ['Full name', 'Plan', 'Achievements', 'Action']

function LogsTable({
  data,
  history,
  location,
  match: { path },
  pagination,
  onChangePage,
  onChangeRowsPerPage,
  role,
  interval
}) {
  const handleRowClick = useCallback(
    id => e => {
      e.preventDefault()
      history.push(`/${URL_PREFIXES[role]}/logging/${interval}/${id}/detail`, `${location.pathname}${location.search}`)
    },
    [location, history, interval, role]
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
          {data.results.map(({ id, owner: { first_name, last_name }, plan, achievements }) => (
            <TableRow key={id} hover>
              <TableCell>
                {first_name} {last_name}
              </TableCell>
              <TableCell>{truncateText(plan)}</TableCell>
              <TableCell>{truncateText(achievements)}</TableCell>
              <TableCell>
                <Button
                  component={Link}
                  to={`${path}/${id}`}
                  onClick={handleRowClick(id)}
                  variant="text"
                  color="primary">
                  View
                </Button>
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

LogsTable.propTypes = {
  data: ListDataType,
  role: PropTypes.number.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
}

export default compose(withRouter)(LogsTable)
