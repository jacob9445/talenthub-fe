import React, { useState, useEffect, useMemo} from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  Group as UserIcon,
  GroupWork as TeamIcon,
  Face as ProfileIcon,
  AccountCircle as AccountIcon
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { createStructuredSelector } from 'reselect'
import { connect} from 'react-redux'
import * as R from 'ramda'

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

import { URL_PREFIXES } from 'config/constants'
import { meSelector } from 'store/modules/auth'

function Sidebar({ location, me}) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  let structure = useMemo(() => ([
    { id: 0, 
      label: 'Dashboard',
      link: `/${URL_PREFIXES[me.role]}/dashboard`, 
      icon: <HomeIcon /> 
    },
    { id: 1, 
      label: 'Users', 
      link: `/${URL_PREFIXES[me.role]}/users`,
      icon: <UserIcon /> 
    },
    { id: 2, 
      label: 'Teams', 
      link: `/${URL_PREFIXES[me.role]}/teams`,
      icon: <TeamIcon /> 
    },
    {
      id: 3,
      label: 'Profiles',
      link: `/${URL_PREFIXES[me.role]}/profiles`,
      icon: <ProfileIcon />
    },
    {
      id: 4,
      label: 'Accounts',
      link: `/${URL_PREFIXES[me.role]}/accounts`,
      icon: <AccountIcon />
    }
  ]), [me])
  
  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

const selectors = createStructuredSelector({
  me: meSelector
})

export default R.compose(
  withRouter,
  connect(selectors),
)(Sidebar)
