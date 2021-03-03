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
        const { period, from, to } = parseQueryString(location.search)
        history.push({
          search: jsonToQueryString({
            period,
            from,
            to,
            ...pagination,
            page: page + 1
          })
        })
      },
      [history, pagination, location.search]
    )

    const handleChangeRowsPerPage = useCallback(
      event => {
        if (event.target.value !== pagination.page_size) {
          const { period, from, to } = parseQueryString(location.search)
          history.push({
            search: jsonToQueryString({
              period,
              from,
              to,
              page: 1,
              page_size: event.target.value
            })
          })
        }
      },
      [pagination, history, location.search]
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
