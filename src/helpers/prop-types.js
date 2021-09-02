import PropTypes from 'prop-types'

export const ListDataType = PropTypes.shape({
  results: PropTypes.array.isRequired,
  prev: PropTypes.string,
  next: PropTypes.string,
  count: PropTypes.number
})
