import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Cancel as CancelIcon } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button'

import { fromMsgStrToArray } from 'helpers/utils'
import { NOTIFICATION_CONFIG } from 'config/constants'
import NotificationTextSlice from 'components/NotificationTextSlice'
import useStyles from './styles'

const NotificationCard = props => {
  const { notification, path, index, closeNC, setStatusRead } = props
  const classes = useStyles()

  const handleCloseNC = useCallback(() => closeNC(), [closeNC])
  const handleSetRead = useCallback(() => setStatusRead({ id: notification.id }), [setStatusRead, notification])

  return NOTIFICATION_CONFIG[notification.content_name] && notification.content_object ? (
    <Card className={classes.card} key={index} color="textSecondary">
      <CardHeader className={classes.title} title={NOTIFICATION_CONFIG[notification.content_name]['title']} />
      <CardContent className={classes.content}>
        <Typography color="textSecondary" variant="body1">
          {fromMsgStrToArray(notification.message).map((part, idx) => (
            <NotificationTextSlice key={idx} {...props} slice={part} />
          ))}
        </Typography>
        <IconButton className={classes.cancelIcon} onClick={handleSetRead}>
          <CancelIcon />
        </IconButton>
      </CardContent>
      <CardActions>
        <Button
          className={classes.detail}
          component={Link}
          to={`${path}/${NOTIFICATION_CONFIG[notification.content_name]['path']}/${
            notification.content_object.id
          }/detail`}
          onClick={handleCloseNC}>
          See detail
        </Button>
      </CardActions>
    </Card>
  ) : (
    <Card className={classes.card} key={index} color="textSecondary">
      <CardContent className={classes.content}>
        <Typography color="textSecondary" variant="body1">
          Unknown notification
        </Typography>
        <IconButton className={classes.cancelIcon} onClick={handleSetRead}>
          <CancelIcon />
        </IconButton>
      </CardContent>
    </Card>
  )
}

export default NotificationCard
