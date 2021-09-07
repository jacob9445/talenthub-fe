import React, { useCallback, useEffect, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import useStyles from './styles'

const LogCard = ({ title, content, onSave, logId, type }) => {
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
        <Typography variant="h5" component="h2" className={classes.head}>
          {title}
        </Typography>
        {editMode ? (
          <TextField
            multiline
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={contentValue}
            row={15}
            onChange={e => setContentValue(e.target.value)}
          />
        ) : (
          <Typography component="pre" className={classes.head}>
            {content || `No ${title} added yet`}
          </Typography>
        )}
      </CardContent>
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
    </Card>
  )
}

export default LogCard
