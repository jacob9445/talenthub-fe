import React, { useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Cancel as CancelIcon } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
  getNotifications,
  setStatusRead,
  closeNC,
  notificationsSelector,
  ncOpenStatusSelector
} from 'store/modules/notification'
import useStyles from './styles'
import { withRouter } from 'react-router-dom'

const NotificationCenter = ({ status, closeNC, notifications, getNotifications, setStatusRead, match: { path } }) => {
  const classes = useStyles()
  useEffect(() => getNotifications(), [getNotifications])

  const messageStringIntoArrary = str => {
    var ary = []
    const first = str.indexOf('}}')
    const last = str.lastIndexOf('{{')
    ary[0] = str.slice(0, first + 2)
    ary[1] = str.slice(first + 2, last).trim()
    ary[2] = str.slice(last, str.length)
    return ary
  }

  return (
    <Drawer anchor="right" open={status} onClose={() => closeNC()}>
      <div tabIndex={0} role="button">
        <div className={classes.list}>
          <div className={classes.notificationHeader}>
            <h3>Notification Center</h3>
            {notifications && notifications.count !== 0 ? <Button size="small">Read all</Button> : null}
          </div>
          <Divider />
          <div className={classes.notificationBody}>
            {notifications && notifications.count !== 0
              ? notifications.results.map((notification, index) => (
                  <Card className={classes.card} key={index} color="textSecondary">
                    <CardHeader className={classes.title} title="Financial Request" />
                    <CardContent className={classes.content}>
                      <Typography color="textSecondary" variant="body1">
                        <Link
                          className={classes.link}
                          to={`${path}/users/${notification.creator.id}/detail`}
                          color="primary"
                          onClick={() => closeNC()}>
                          {notification.creator.first_name} {notification.creator.last_name}
                        </Link>{' '}
                        {messageStringIntoArrary(notification.message)[1]}
                        <Link
                          className={classes.link}
                          color="primary"
                          to={`${path}/financial-requests/${notification.content_object.id}/detail`}
                          onClick={() => closeNC()}>
                          {messageStringIntoArrary(notification.message)[2]}
                        </Link>
                      </Typography>
                      <IconButton className={classes.cancelIcon} onClick={() => setStatusRead({ id: notification.id })}>
                        <CancelIcon />
                      </IconButton>
                    </CardContent>
                    <CardActions>
                      <Button
                        className={classes.detail}
                        component={Link}
                        to={`${path}/financial-requests/${notification.content_object.id}/detail`}
                        onClick={() => closeNC()}>
                        See detail
                      </Button>
                    </CardActions>
                  </Card>
                ))
              : 'No new notifications'}
          </div>
        </div>
      </div>
    </Drawer>
  )
}

const actions = {
  getNotifications,
  setStatusRead,
  closeNC
}

const selectors = createStructuredSelector({
  status: ncOpenStatusSelector,
  notifications: notificationsSelector
})

export default connect(selectors, actions)(withRouter(NotificationCenter))
