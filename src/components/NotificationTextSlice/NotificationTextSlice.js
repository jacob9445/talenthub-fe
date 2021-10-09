import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'

import { getFullName } from 'helpers/utils'
import { NOTIFICATION_CONFIG } from 'config/constants'
import useStyles from './styles'

const NotificationTextSlice = ({ notification, path, closeNC, slice }) => {
  const classes = useStyles()
  const handleCloseNC = useCallback(() => closeNC(), [closeNC])

  if (slice === '{{creator}}') {
    return (
      <Link
        className={classes.link}
        to={`${path}/users/${notification.creator.id}/detail`}
        color="primary"
        onClick={handleCloseNC}>
        {getFullName(notification.creator)}
      </Link>
    )
  } else if (slice === '{{object}}') {
    return (
      <Link
        className={classes.link}
        color="primary"
        to={`${path}/${NOTIFICATION_CONFIG[notification.content_name]['path']}/${
          notification.content_object.id
        }/detail`}
        onClick={handleCloseNC}>
        {NOTIFICATION_CONFIG[notification.content_name]['objectName']}
      </Link>
    )
  } else {
    return <>{slice}</>
  }
}

export default NotificationTextSlice
