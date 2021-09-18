import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { meSelector } from 'store/modules/auth'
import LogsTable from '../../components/LogsTable'
import Widget from 'components/Widget'
import useStyles from './styles'
import SimpleSelect from 'components/SimpleSelect'
import { ROLES, LOG_OPTIONS, URL_PREFIXES } from 'config/constants'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { ListDataType } from 'helpers/prop-types'

const LoggingLayout = ({
  title,
  interval,
  logs,
  actions,
  me,
  pagination,
  location,
  history,
  onChangePage,
  onChangeRowsPerPage
}) => {
  let classes = useStyles()

  const handleLogChange = useCallback(
    event => {
      const interval = event.target.value
      history.push(`/${URL_PREFIXES[me.role]}/logging/${interval}`)
    },
    [history, me.role]
  )

  return (
    <Widget
      title={title}
      upperTitle
      noBodyPadding
      bodyClass={classes.tableOverflow}
      disableWidgetMenu
      disableWidgetButton={me.role === ROLES.DEVELOPER}
      WidgetButton={
        <Grid container className={classes.grid} spacing={2} alignItems="center" justify="flex-end">
          <Grid item>
            <SimpleSelect label="Period" value={interval} options={LOG_OPTIONS} onChange={handleLogChange} />
          </Grid>
          {actions}
        </Grid>
      }>
      <LogsTable
        data={logs}
        interval={interval}
        role={me.role}
        pagination={pagination}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Widget>
  )
}

const selectors = createStructuredSelector({
  me: meSelector
})

LoggingLayout.propTypes = {
  logs: ListDataType,
  me: PropTypes.object,
  title: PropTypes.string.isRequired,
  interval: PropTypes.string.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
}

export default compose(withPaginationInfo, connect(selectors))(LoggingLayout)
