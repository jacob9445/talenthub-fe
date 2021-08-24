import React from 'react'
import Typography from '@material-ui/core/Typography'

const LabelValue =  ({ label, children }) => (
  <div>
    <Typography variant="caption">{label}</Typography>
    <Typography variant="body1" gutterBottom>
      {children}
    </Typography>
  </div>
)
export default LabelValue
