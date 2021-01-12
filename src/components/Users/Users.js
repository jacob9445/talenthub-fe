import React, { useEffect, useCallback } from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import  { createStructuredSelector} from 'reselect'
import  { connect } from 'react-redux'

// import PageTitle from "components/PageTitle";s
import { getUsers, usersSelector, deleteUserAndRefresh } from 'store/modules/users'
import { meSelector } from 'store/modules/auth'
import Table from './Table'
import Widget from "components/Widget"
import { ROLES } from 'config/constants'
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

const Users = ({getUsers, users, me, deleteUserAndRefresh}) => {

  let classes = useStyles()
  useEffect(() => {
    getUsers({role: me.role})
  }, [getUsers, me.role])
  
  const handleDelete = useCallback((id) => {
    deleteUserAndRefresh({id})
  }, [deleteUserAndRefresh])
  return (
    <>
      {/* <PageTitle title="Users" /> */}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget 
            title='Users' 
            upperTitle noBodyPadding 
            bodyClass={classes.tableOverflow} 
            disableWidgetMenu
            disableWidgetButton={me.role !== ROLES.ADMIN}
            WidgetButton={
              <Button
                color='primary'
              >
                Add User
              </Button>
            }
          >
            <Table data={users} myRole={me.role} handleDelete={handleDelete}/>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

const actions = {
  getUsers,
  deleteUserAndRefresh
}

const selectors = createStructuredSelector({
  users: usersSelector,
  me: meSelector,
})

export default connect(selectors, actions)(Users)