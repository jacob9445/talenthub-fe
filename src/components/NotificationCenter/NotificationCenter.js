import React, { useEffect, useCallback } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import NotificationCard from 'components/NotificationCard'
import {
  getNotifications,
  setStatusRead,
  setAllRead,
  closeNC,
  notificationsSelector,
  ncOpenStatusSelector
} from 'store/modules/notification'
import useStyles from './styles'
import { withRouter } from 'react-router-dom'

const NotificationCenter = ({
  status,
  closeNC,
  notifications,
  getNotifications,
  setStatusRead,
  setAllRead,
  match: { path }
}) => {
  const classes = useStyles()
  useEffect(() => getNotifications(), [getNotifications])

  const handleReadAll = useCallback(() => setAllRead(), [setAllRead])

  return (
    <Drawer anchor="right" open={status} onClose={() => closeNC()}>
      <div tabIndex={0} role="button">
        <div className={classes.list}>
          <div className={classes.notificationHeader}>
            <h3>Notification Center</h3>
            {notifications && notifications.count !== 0 ? (
              <Button size="small" onClick={handleReadAll}>
                Read all
              </Button>
            ) : null}
          </div>
          <Divider />
          <div className={classes.notificationBody}>
            {notifications && notifications.count !== 0 ? (
              notifications.results.map((notification, index) => (
                <NotificationCard
                  key={index}
                  notification={notification}
                  classes={classes}
                  path={path}
                  index={index}
                  closeNC={closeNC}
                  setStatusRead={setStatusRead}
                />
              ))
            ) : (
              <Typography className={classes.nothing} variant="body1">
                {'No new notifications'}
              </Typography>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  )
}

const actions = {
  getNotifications,
  setStatusRead,
  setAllRead,
  closeNC
}

const selectors = createStructuredSelector({
  status: ncOpenStatusSelector,
  notifications: notificationsSelector
})

export default connect(selectors, actions)(withRouter(NotificationCenter))
