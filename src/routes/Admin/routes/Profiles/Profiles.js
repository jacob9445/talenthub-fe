import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick, path } from 'ramda'
import Widget from 'components/Widget'
import ProfileTable from './components/Table'
import { getProfiles, profileSelector, profileLoadingSelector } from 'store/modules/profiles'
import { meSelector } from 'store/modules/auth'
import Spinner from 'components/Spinner'

const Profiles = ({ getProfiles, profiles, me, isLoading }) => {
  
  useEffect(() => {
    getProfiles()
  }, [getProfiles])

  const data = useMemo(() => {
    if(profiles) {
      return profiles.map((profile) => ({
        ...pick(['id', 'profile_type', 'first_name', 'last_name', 'address', 'country', 'dob', 'gender'])(profile),
        username: path(['user','username'])(profile)
      }))
    }
  }, [profiles])
  
  if( isLoading) return <Spinner />
  else return (
    <Widget
      title='Profiles'
      disableWidgetMenu
    >
      <ProfileTable
        data={data}
        myRole={me.role}
      />
    </Widget>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func,
  profiles: PropTypes.array,
  isLoading: PropTypes.bool,
  me: PropTypes.object
};

const actions = {
  getProfiles
}

const selectors = createStructuredSelector({
  profiles: profileSelector,
  isLoading: profileLoadingSelector,
  me: meSelector
})

export default connect(selectors, actions)(Profiles);