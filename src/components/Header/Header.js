import React, { useCallback, useState } from 'react'
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@material-ui/core'
import { Menu as MenuIcon, Person as AccountIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons'
import Badge from '@material-ui/core/Badge'
import { NotificationsActive, NotificationsNone } from '@material-ui/icons'
import classNames from 'classnames'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import useStyles from './styles'
import { Typography } from '../Wrappers'
import { openNC } from 'store/modules/notification'
import { useLayoutState, useLayoutDispatch, toggleSidebar } from 'context/LayoutContext'
import { authLogout } from 'store/modules/auth'
import { meSelector } from 'store/modules/auth/selectors'
import { notificationsSelector } from 'store/modules/notification'

function Header({ me, authLogout, openNC, notifications }) {
  var classes = useStyles()

  // global
  var layoutState = useLayoutState()
  var layoutDispatch = useLayoutDispatch()

  // local
  var [profileMenu, setProfileMenu] = useState(null)
  const handleLogout = useCallback(() => {
    authLogout()
  }, [authLogout])

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(classes.headerMenuButtonSandwich, classes.headerMenuButtonCollapse)}>
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(classes.headerIcon, classes.headerIconCollapse)
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(classes.headerIcon, classes.headerIconCollapse)
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Talents Hub
        </Typography>
        <div className={classes.grow} />
        <IconButton color="inherit" className={classes.badge} onClick={() => openNC()}>
          {notifications && notifications.count !== 0 ? (
            <Badge badgeContent={notifications.results.length} color="secondary">
              <NotificationsActive classes={{ root: classes.notificaionIcon }} />
            </Badge>
          ) : (
            <NotificationsNone classes={{ root: classes.notificaionIcon }} />
          )}
        </IconButton>

        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="me-menu"
          onClick={e => setProfileMenu(e.currentTarget)}>
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>

        <Menu
          id="me-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem>
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {`${me.first_name} ${me.last_name}`}
            </Typography>
            <Typography className={classes.profileMenuLink} component="a" color="primary" href="https://flatlogic.com">
              {me.email}
            </Typography>
          </div>
          <MenuItem className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
            <AccountIcon className={classes.profileMenuIcon} /> me
          </MenuItem>
          <div className={classes.profileMenuUser}>
            <Link to="/" className={classes.profileMenuLink} color="primary" onClick={handleLogout}>
              Sign Out
            </Link>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

const actions = {
  authLogout,
  openNC
}
const selectors = createStructuredSelector({
  me: meSelector,
  notifications: notificationsSelector
})

Header.propTypes = {
  authLogout: PropTypes.func.isRequired,
  me: PropTypes.object.isRequired
}

export default connect(selectors, actions)(Header)
