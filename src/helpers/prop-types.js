import PropTypes from 'prop-types'

export const ListDataType = PropTypes.shape({
  results: PropTypes.array.isRequired,
  prev: PropTypes.string,
  next: PropTypes.string,
  count: PropTypes.number
})

export const MyLogType = PropTypes.shape({
  plan: PropTypes.string,
  achievements: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  interval: PropTypes.string.isRequired
})
