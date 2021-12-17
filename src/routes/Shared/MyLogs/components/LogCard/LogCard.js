import React, { useCallback, useEffect, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import useStyles from './styles'
import PropTypes from 'prop-types'

const LogCard = ({ title, content, onSave, editable }) => {
  const [contentValue, setContentValue] = useState(content || '')
  const [editMode, setEditMode] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    setContentValue(content)
  }, [content])

  const handleSave = useCallback(() => {
    setEditMode(false)
    onSave(contentValue)
  }, [contentValue, onSave])

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h2" className={classes.title}>
          {title}
        </Typography>
        {editMode ? (
          <TextField
            multiline
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={contentValue}
            rows={10}
            onChange={e => setContentValue(e.target.value)}
          />
        ) : (
          <Typography component="pre" className={classes.typography}>
            {content || `No ${title} added yet`}
          </Typography>
        )}
      </CardContent>
      {editable && (
        <CardActions className={classes.cardActions}>
          {editMode ? (
            <>
              <Button variant="text" color="primary" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button variant="text" color="primary" onClick={handleSave}>
                Save
              </Button>
            </>
          ) : (
            <Button variant="text" color="primary" onClick={() => setEditMode(true)}>
              {content ? 'Edit' : 'Add'}
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  )
}

LogCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  onSave: PropTypes.func
}

LogCard.defaultProps = {
  editable: true
}
export default LogCard
