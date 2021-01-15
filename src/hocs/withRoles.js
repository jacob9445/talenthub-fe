import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Redirect } from 'react-router'
import { meSelector } from 'store/modules/auth'
import { ROLES, URL_PREFIXES} from 'config/constants'
const selector = createStructuredSelector({
  me: meSelector
})

export const isAdminOrRedir = (Component) => {
  const Wrapper = ({me, ...props}) => me.role === ROLES.ADMIN ? <Component {...props}/> : <Redirect to={`${URL_PREFIXES[me.role]}/dashboard`}/>
  return connect(selector)(Wrapper)
}

export const isTeamManagerOrRedir = (Component) => {
  const Wrapper = ({me, ...props}) => me.role === ROLES.TEAM_MANAGER ? <Component {...props}/> : <Redirect to={`${URL_PREFIXES[me.role]}/dashboard`}/>
  return connect(selector)(Wrapper)
}

export const isDeveloperOrRedir = (Component) => {
  const Wrapper = ({me, ...props}) => me.role === ROLES.DEVELOPER ? <Component {...props}/> : <Redirect to={`${URL_PREFIXES[me.role]}/dashboard`}/>
  return connect(selector)(Wrapper)
}