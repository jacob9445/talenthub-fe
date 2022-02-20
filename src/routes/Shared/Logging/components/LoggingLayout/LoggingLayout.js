import { Grid } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { meSelector } from 'store/modules/auth'
import LogsTable from '../../components/LogsTable'
import Widget from 'components/Widget'
import useStyles from './styles'
import PeriodButtonGroup from 'components/PeriodButtonGroup'
import { ROLES } from 'config/constants'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { ListDataType } from 'helpers/prop-types'

const LoggingLayout = ({ title, interval, logs, actions, me, pagination, onChangePage, onChangeRowsPerPage }) => {
  let classes = useStyles()

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
            <PeriodButtonGroup selectedPeriod={interval} me={me} loggingOrMyLogs="logging" />
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
