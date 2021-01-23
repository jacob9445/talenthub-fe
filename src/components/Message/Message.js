import React from 'react'
import { Snackbar, IconButton, Icon, SnackbarContent } from '@material-ui/core'
import { green, amber, blue } from '@material-ui/core/colors'
import { Close as CloseIcon, CheckCircle, Warning, ErrorOutline, Info } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import classNames from 'classnames'

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
    backgroundColor: blue[600],
    color: '#ffffff'
  },
  warning: {
    backgroundColor: amber[600],
    color: '#ffffff'
  },
  messageWrapper: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const variantIcon = {
  success: <CheckCircle />,
  warning: <Warning />,
  error: <ErrorOutline />,
  info: <Info />
}

const Message = ({ hideMessage, state, options }) => {
  const classes = useStyles()
  console.log({ options })
  return (
    <Snackbar
      {...options}
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
        className={classNames(classes[options.variant])}
        message={
          <div className={classes.messageWrapper}>
            {variantIcon[options.variant] && (
              <Icon className="mr-8" color="inherit">
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

const actions = {
  hideMessage
}

const selectors = createStructuredSelector({
  state: messageStateSelector,
  options: messageOptionSelector
})

export default connect(
  selectors,
  actions
)(Message)
