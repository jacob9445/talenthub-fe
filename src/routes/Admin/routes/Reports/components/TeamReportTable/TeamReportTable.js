import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { FormattedNumber } from 'react-intl'
import { show } from 'redux-modal'
import { Table, TableRow, TableHead, TableBody, TableCell } from '@material-ui/core'
import { withRouter } from 'react-router'
import * as R from 'ramda'
import PropTypes from 'prop-types'

import Spinner from 'components/Spinner'
import useStyles from './styles'

const getTotal = R.compose(R.sum, R.map(R.prop('earnings')), R.defaultTo([]))

function TeamReportTable({ data, show, location, history, match: { path } }) {
  const columns = ['Team Name', 'Earning']
  const classes = useStyles()
  const totalEarning = getTotal(data)
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
              <TableCell>
                <strong>Total Earning</strong>
              </TableCell>
              <TableCell>
                <strong>
                  <FormattedNumber format="currency" value={totalEarning} />
                </strong>
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map(key => (
                <TableCell key={key}>
                  <strong>{key}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(({ id, name, earnings }) => {
              return (
                <TableRow key={id} hover onClick={handleRowClick(id)} className={classes.tableRow}>
                  <TableCell>{name}</TableCell>
                  <TableCell>
                    <FormattedNumber format="currency" value={earnings} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
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
