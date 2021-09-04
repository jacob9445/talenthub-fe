import React, { useCallback } from 'react'
import { Snackbar, IconButton, Icon, SnackbarContent } from '@material-ui/core'
import { green, amber, teal } from '@material-ui/core/colors'
import { Close as CloseIcon, CheckCircle, Warning, ErrorOutline, Info } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { hideMessage, messageStateSelector, messageOptionSelector } from 'store/modules/message'

const useStyles = makeStyles(theme => ({
  root: {},
  success: {
    backgroundColor: green[600],
    color: '#ffffff'
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.getContrastText(theme.palette.error.dark)
  },
  info: {
    backgroundColor: teal[600],
    color: '#ffffff'
  },
  warning: {
    backgroundColor: amber[600],
    color: '#ffffff'
  },
  messageWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  pointer: {
    cursor: 'pointer'
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}))

const variantIcon = {
  success: <CheckCircle />,
  warning: <Warning />,
  error: <ErrorOutline />,
  info: <Info />
}

const Message = ({ hideMessage, state, options, dispatch }) => {
  const classes = useStyles()
  const { actionOnClick, ...props } = options
  const handleClick = useCallback(() => {
    hideMessage()
    if (actionOnClick) dispatch(actionOnClick)
  }, [hideMessage, actionOnClick])

  return (
    <Snackbar
      {...props}
      open={state}
      onClose={hideMessage}
      classes={{
        root: classes.root
      }}
      ContentProps={{
        variant: 'body2',
        headlineMapping: {
          body1: 'div',
          body2: 'div'
        }
      }}>
      <SnackbarContent
        className={classes[options.variant]}
        message={
          <div
            className={classNames(classes.messageWrapper, { [classes.pointer]: Boolean(actionOnClick) })}
            onClick={handleClick}>
            {variantIcon[options.variant] && (
              <Icon className={classes.icon} color="inherit">
                {variantIcon[options.variant]}
              </Icon>
            )}
            {options.message}
          </div>
        }
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={hideMessage}>
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Snackbar>
  )
}

const actions = dispatch => ({
  hideMessage: () => dispatch(hideMessage()),
  dispatch
})

const selectors = createStructuredSelector({
  state: messageStateSelector,
  options: messageOptionSelector
})

Message.propTypes = {
  hideMessage: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  state: PropTypes.bool
}

export default connect(selectors, actions)(Message)
