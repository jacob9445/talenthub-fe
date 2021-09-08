import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Cancel as CancelIcon } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { NOTIFICATION_CONFIG } from 'config/constants'
import { fromMsgStrToArray } from 'helpers/utils'
import useStyles from './styles'

const renderMsgItem = (props, str, idx, classes) => {
  const { notification, path, closeNC } = props
  if (str === '{{creator}}') {
    return (
      <Link
        key={idx}
        className={classes.link}
        to={`${path}/users/${notification.creator.id}/detail`}
        color="primary"
        onClick={() => closeNC()}>
        {notification.creator.first_name} {notification.creator.last_name}
      </Link>
    )
  } else if (str === '{{object}}') {
    return (
      <Link
        key={idx}
        className={classes.link}
        color="primary"
        to={`${path}/${NOTIFICATION_CONFIG[notification.content_name]['path']}/${
          notification.content_object.id
        }/detail`}
        onClick={() => closeNC()}>
        {NOTIFICATION_CONFIG[notification.content_name]['objectName']}
      </Link>
    )
  } else {
    return str
  }
}

const NotificationCard = props => {
  const { notification, path, index, closeNC, setStatusRead } = props
  const classes = useStyles()

  return NOTIFICATION_CONFIG[notification.content_name] && notification.content_object ? (
    <Card className={classes.card} key={index} color="textSecondary">
      <CardHeader className={classes.title} title={NOTIFICATION_CONFIG[notification.content_name]['title']} />
      <CardContent className={classes.content}>
        <Typography color="textSecondary" variant="body1">
          {fromMsgStrToArray(notification.message).map((part, idx) => renderMsgItem(props, part, idx, classes))}
        </Typography>
        <IconButton className={classes.cancelIcon} onClick={() => setStatusRead({ id: notification.id })}>
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
          onClick={() => closeNC()}>
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
        <IconButton className={classes.cancelIcon} onClick={() => setStatusRead({ id: notification.id })}>
          <CancelIcon />
        </IconButton>
      </CardContent>
    </Card>
  )
}

export default NotificationCard
