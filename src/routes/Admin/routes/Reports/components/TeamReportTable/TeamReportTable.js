import React, { useCallback } from 'react'
import { Table, TableRow, TableHead, TableBody, TableCell, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { show } from 'redux-modal'
import { connect } from 'react-redux'
import { FormattedNumber } from 'react-intl'
import Spinner from 'components/Spinner'
import useStyles from './styles'

function TeamReportTable({ data, show, location, history, match: { path } }) {
  const columns = ['Team Name', 'Earning']
  const classes = useStyles()
  let totalEarning = 0

  const handleRowClick = useCallback(
    id => () => {
      history.push(`/admin/financial-reports/individuals?team=${id}`, location.pathname)
    },
    [history, location.pathname]
  )

  if (data) {
    return (
      <>
        <Table className="mb-0">
          <TableHead>
            <TableRow>
              {columns.map(key => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(({ id, name, total }) => {
              totalEarning += total
              return (
                <TableRow key={id} hover onClick={handleRowClick(id)} className={classes.tableRow}>
                  <TableCell>
                    <FormattedNumber format="currency" value={name} />
                  </TableCell>
                  <TableCell>
                    <FormattedNumber format="currency" value={total} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Typography variant="h5" className={classes.totalEarning}>
          Total Earning: <FormattedNumber format="currency" value={totalEarning} />
        </Typography>
      </>
    )
  } else {
    return <Spinner />
  }
}

const actions = {
  show
}

TeamReportTable.propTypes = {
  data: PropTypes.array,
  show: PropTypes.func.isRequired
}

export default connect(null, actions)(withRouter(TeamReportTable))
