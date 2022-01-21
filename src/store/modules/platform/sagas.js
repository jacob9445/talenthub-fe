import { put, takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import * as Types from './types'
import { showMessage } from '../message'
import { roleBasedPath, confirm } from 'helpers/sagaHelpers'

const getPlatforms = createApiCallSaga({
  type: Types.GET_PLATFORMS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('platforms/')
  },
  selectorKey: 'platforms',
  allowedParamKeys: ['page', 'page_size']
})

const deletePlatform = createApiCallSaga({
  type: Types.DELETE_PLATFORM,
  method: 'DELETE',
  path: function*({ payload }) {
    return yield roleBasedPath(`platforms/${payload.id}/`)
  }
})

const deletePlatformAndRefresh = function*(action) {
  const confirmed = yield confirm(action.payload.message)
  if (confirmed) {
    yield deletePlatform(action)
    yield getPlatforms(action)
  }
}

const getPlatformDetail = createApiCallSaga({
  type: Types.GET_PLATFORM_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`platforms/${payload}/`)
  },
  selectorKey: 'platformDetail'
})

const updatePlatform = createApiCallSaga({
  type: Types.UPDATE_PLATFORM,
  method: 'PATCH',
  path: function*({ payload }) {
    return yield roleBasedPath(`platforms/${payload.id}/`)
  },
  selectorKey: 'platformDetail'
})

const createPlatform = createApiCallSaga({
  type: Types.CREATE_PLATFORM,
  method: 'POST',
  path: function*({ payload }) {
    return yield roleBasedPath(`platforms/`)
  },
  success: function*(resData) {
    yield put(
      showMessage({
        message: 'Platform created successfully!'
      })
    )
  }
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_PLATFORMS, getPlatforms)
  yield takeLatest(Types.DELETE_PLATFORM, deletePlatform)
  yield takeLatest(Types.DELETE_PLATFORM_AND_REFRESH, deletePlatformAndRefresh)
  yield takeLatest(Types.GET_PLATFORM_DETAIL, getPlatformDetail)
  yield takeLatest(Types.UPDATE_PLATFORM, updatePlatform)
  yield takeLatest(Types.CREATE_PLATFORM, createPlatform)
}
