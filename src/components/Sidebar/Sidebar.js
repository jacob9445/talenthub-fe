import React, { useState, useEffect } from 'react'
import { Drawer, IconButton, List } from '@material-ui/core'
import {
  Dashboard as DashboardIcon,
  ArrowBack as ArrowBackIcon,
  Group as UserIcon,
  GroupWork as TeamIcon,
  Face as ProfileIcon,
  AccountCircle as AccountIcon,
  WorkOutline as ClientIcon,
  AccessibilityNew as PartnerIcon,
  Computer as ProjectIcon,
  ContactPhone as FRIcon,
  Money as FRequestIcon,
  EventNote as LogIcon,
  EventAvailable as ReportIcon,
  DeviceHub as PlatformIcon
} from '@material-ui/icons'
import { useTheme } from '@material-ui/styles'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import * as R from 'ramda'
import PropTypes from 'prop-types'

// styles
import useStyles from './styles'

// components
import SidebarLink from './components/SidebarLink/SidebarLink'

// context
import { useLayoutState, useLayoutDispatch, toggleSidebar } from 'context/LayoutContext'

import { ROLES } from 'config/constants'
import { meSelector } from 'store/modules/auth'

let structure = {
  [ROLES.ADMIN]: [
    {
      id: 0,
      label: 'Dashboard',
      link: `/admin/dashboard`,
      icon: <DashboardIcon />
    },
    {
      id: 1,
      label: 'Financial Requests',
      link: '/admin/financial-requests',
      icon: <FRIcon />,
      subLinks: [
        {
          label: 'Pending Requests',
          link: '/admin/financial-requests/pending'
        },
        {
          label: 'Approved Requests',
          link: '/admin/financial-requests/approved'
        },
        {
          label: 'Declined Requests',
          link: '/admin/financial-requests/declined'
        },
        {
          label: 'Canceled Requests',
          link: '/admin/financial-requests/canceled'
        },
        {
          label: 'All Requests',
          link: '/admin/financial-requests/all'
        }
      ]
    },
    {
      id: 2,
      label: 'Financial Report',
      link: '/admin/financial-reports',
      icon: <FRequestIcon />,
      subLinks: [
        {
          label: 'Transactions',
          link: '/admin/financial-reports/transactions'
        },
        {
          label: 'Individual Reports',
          link: '/admin/financial-reports/individuals'
        },
        {
          label: 'Teams',
          link: '/admin/financial-reports/teams'
        }
      ]
    },
    {
      id: 3,
      label: 'PaymentAccounts',
      link: `/admin/payment-accounts`,
      icon: <AccountIcon />
    },
    {
      id: 4,
      label: 'Users',
      link: `/admin/users`,
      icon: <UserIcon />
    },
    {
      id: 5,
      label: 'Teams',
      link: `/admin/teams`,
      icon: <TeamIcon />
    },
    {
      id: 6,
      label: 'Profiles',
      link: `/admin/profiles`,
      icon: <ProfileIcon />
    },
    {
      id: 7,
      label: 'Accounts',
      link: `/admin/accounts`,
      icon: <AccountIcon />
    },
    {
      id: 8,
      label: 'Platforms',
      link: `/admin/platforms`,
      icon: <PlatformIcon />
    },
    {
      id: 9,
      label: 'Partners',
      link: '/admin/partners',
      icon: <PartnerIcon />
    },
    {
      id: 10,
      label: 'Clients',
      link: '/admin/clients',
      icon: <ClientIcon />
    },
    {
      id: 11,
      label: 'Projects',
      link: '/admin/projects',
      icon: <ProjectIcon />
    },
    {
      id: 12,
      label: 'My logs',
      link: '/admin/my-logs',
      icon: <LogIcon />
    },
    {
      id: 13,
      label: 'Reports',
      link: '/admin/logging',
      icon: <ReportIcon />
    }
  ],
  [ROLES.TEAM_MANAGER]: [
    {
      id: 0,
      label: 'Dashboard',
      link: `/team-manager/dashboard`,
      icon: <DashboardIcon />
    },
    {
      id: 1,
      label: 'Financial Requests',
      link: '/team-manager/financial-requests',
      icon: <FRIcon />,
      subLinks: [
        {
          label: 'Pending Requests',
          link: '/team-manager/financial-requests/pending'
        },
        {
          label: 'Approved Requests',
          link: '/team-manager/financial-requests/approved'
        },
        {
          label: 'Declined Requests',
          link: '/team-manager/financial-requests/declined'
        },
        {
          label: 'Canceled Requests',
          link: '/team-manager/financial-requests/canceled'
        },
        {
          label: 'All Requests',
          link: '/team-manager/financial-requests/all'
        }
      ]
    },
    {
      id: 2,
      label: 'Financial Report',
      link: '/team-manager/financial-reports',
      icon: <FRequestIcon />,
      subLinks: [
        {
          label: 'Transactions',
          link: '/team-manager/financial-reports/transactions'
        },
        {
          label: 'My Team Report',
          link: '/team-manager/financial-reports/my-team-reports'
        }
      ]
    },
    {
      id: 3,
      label: 'Team Members',
      link: `/team-manager/users`,
      icon: <UserIcon />
    },
    {
      id: 4,
      label: 'Profiles',
      link: `/team-manager/profiles`,
      icon: <ProfileIcon />
    },
    {
      id: 5,
      label: 'Accounts',
      link: `/team-manager/accounts`,
      icon: <AccountIcon />
    },
    {
      id: 6,
      label: 'Partners',
      link: '/team-manager/partners',
      icon: <PartnerIcon />
    },
    {
      id: 7,
      label: 'Clients',
      link: '/team-manager/clients',
      icon: <ClientIcon />
    },
    {
      id: 8,
      label: 'Projects',
      link: '/team-manager/projects',
      icon: <ProjectIcon />
    },
    {
      id: 9,
      label: 'My logs',
      link: '/team-manager/my-logs',
      icon: <LogIcon />
    },
    {
      id: 10,
      label: 'Reports',
      link: '/team-manager/logging',
      icon: <ReportIcon />
    }
  ],
  [ROLES.DEVELOPER]: [
    {
      id: 0,
      label: 'Dashboard',
      link: `/developer/dashboard`,
      icon: <DashboardIcon />
    },
    {
      id: 1,
      label: 'Financial Requests',
      link: '/developer/financial-requests',
      icon: <FRIcon />,
      subLinks: [
        {
          label: 'Pending Requests',
          link: '/developer/financial-requests/pending'
        },
        {
          label: 'Approved Requests',
          link: '/developer/financial-requests/approved'
        },
        {
          label: 'Declined Requests',
          link: '/developer/financial-requests/declined'
        },
        {
          label: 'Canceled Requests',
          link: '/developer/financial-requests/canceled'
        },
        {
          label: 'All Requests',
          link: '/developer/financial-requests/all'
        }
      ]
    },
    {
      id: 2,
      label: 'Financial Report',
      link: '/developer/financial-reports',
      icon: <FRequestIcon />,
      subLinks: [
        {
          label: 'Transactions',
          link: '/developer/financial-reports/transactions'
        },
        {
          label: 'My Report',
          link: '/developer/financial-reports/my-reports'
        }
      ]
    },
    {
      id: 3,
      label: 'Profiles',
      link: `/developer/profiles`,
      icon: <ProfileIcon />
    },
    {
      id: 4,
      label: 'Accounts',
      link: `/developer/accounts`,
      icon: <AccountIcon />
    },
    {
      id: 5,
      label: 'Clients',
      link: '/developer/clients',
      icon: <ClientIcon />
    },
    {
      id: 6,
      label: 'Partners',
      link: '/developer/partners',
      icon: <PartnerIcon />
    },
    {
      id: 7,
      label: 'Projects',
      link: '/developer/projects',
      icon: <ProjectIcon />
    },
    {
      id: 8,
      label: 'My logs',
      link: '/developer/my-logs',
      icon: <LogIcon />
    }
  ]
}

function Sidebar({ location, me }) {
  var classes = useStyles()
  var theme = useTheme()

  // global
  var { isSidebarOpened } = useLayoutState()
  var layoutDispatch = useLayoutDispatch()

  // local
  var [isPermanent, setPermanent] = useState(true)

  useEffect(function() {
    window.addEventListener('resize', handleWindowWidthChange)
    handleWindowWidthChange()
    return function cleanup() {
      window.removeEventListener('resize', handleWindowWidthChange)
    }
  })

  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened
        })
      }}
      open={isSidebarOpened}>
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse)
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure[me.role].map(link => (
          <SidebarLink key={link.id} location={location} isSidebarOpened={isSidebarOpened} {...link} />
        ))}
      </List>
    </Drawer>
  )

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth
    var breakpointWidth = theme.breakpoints.values.md
    var isSmallScreen = windowWidth < breakpointWidth

    if (isSmallScreen && isPermanent) {
      setPermanent(false)
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true)
    }
  }
}

const selectors = createStructuredSelector({
  me: meSelector
})

Sidebar.propTypes = {
  location: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired
}

export default R.compose(withRouter, connect(selectors))(Sidebar)
