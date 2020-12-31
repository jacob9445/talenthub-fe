import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import  { createStructuredSelector} from 'reselect'
import  { connect } from 'react-redux'

// import PageTitle from "components/PageTitle";s
import { getUsers, usersSelector } from 'store/modules/users'
import { meSelector } from 'store/modules/auth'
import Table from './Table'
import Widget from "components/Widget"

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

const Users = ({getUsers, users, me}) => {

  let classes = useStyles()
  useEffect(() => {
    getUsers({role: me.role})
  }, [getUsers, me.role])
  
  return (
    <>
      {/* <PageTitle title="Users" /> */}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Users" upperTitle noBodyPadding bodyClass={classes.tableOverflow} disableWidgetMenu>
            <Table data={users} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

const actions = {
  getUsers
}

const selectors = createStructuredSelector({
  users: usersSelector,
  me: meSelector,
})

export default connect(selectors, actions)(Users)