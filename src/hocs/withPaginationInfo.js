import React, { useCallback, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'

const withPaginationInfo = WrappedComponent => {
  const Wrapper = props => {
    const { location, history } = props
    const { page = 1, page_size = 10 } = parseQueryString(location.search)
    const pagination = useMemo(
      () => ({
        page: parseInt(page),
        page_size: parseInt(page_size)
      }),
      [page, page_size]
    )

    const handleChangePage = useCallback(
      (event, page) => {
        history.push({
          search: jsonToQueryString({
            ...pagination,
            page: page + 1
          })
        })
      },
      [history, pagination]
    )

    const handleChangeRowsPerPage = useCallback(
      event => {
        if (event.target.value !== pagination.page_size) {
          history.push({
            search: jsonToQueryString({
              page: 1,
              page_size: event.target.value
            })
          })
        }
      },
      [pagination, history]
    )

    return (
      <WrappedComponent
        {...props}
        pagination={pagination}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    )
  }
  return withRouter(Wrapper)
}

export default withPaginationInfo
