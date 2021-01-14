import React, { useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'ramda'
import { Formik } from 'formik'
import { pick } from 'ramda'

import { getProfileDetail, profileDetailSelector, updateProfile, profileDetailLoadingSelector } from 'store/modules/profiles'
import Widget from 'components/Widget'
import { formSubmit } from 'helpers/form';
import ProfileDetailForm from '../../components/ProfileDetailForm'
import Spinner from 'components/Spinner'

const EditProfile = ({ match: {params}, getProfileDetail, profileDetail, updateProfile, isLoading}) => {

  useEffect(() => {
    getProfileDetail(params.id)
  }, [getProfileDetail, params.id])

  const initialValues = useMemo(() => 
    profileDetail ? pick(['user_id', 'profile_type', 'first_name', 'last_name', 'address', 'country', 'dob', 'gender'], 
      profileDetail) : ({
        user_id: '',
        profile_type: '',
        first_name: '',
        last_name: '',
        address: '',
        country: '',
        dob: '',
        gender: ''
      }),
    [profileDetail]
  )
  const handleSubmit = useCallback((payload, formActions) => {
    return formSubmit( updateProfile, {
      data: payload,
      id: params.id
    }, formActions)
  }, [updateProfile, params.id])

  if( isLoading) return <Spinner />
  else return (
    <Widget 
      title='Profile Detail'
      disableWidgetMenu
    >
      <Formik
        component={ProfileDetailForm}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      />
    </Widget>
  );
};

EditProfile.propTypes = {
  params: PropTypes.string,
  getProfileDetail: PropTypes.func,
  profileDetail: PropTypes.object
};


const actions = {
  getProfileDetail,
  updateProfile
}

const selectors = createStructuredSelector({
  profileDetail: profileDetailSelector,
  isLoading: profileDetailLoadingSelector
})

export default compose(
  connect(selectors, actions),
  withRouter
)(EditProfile);