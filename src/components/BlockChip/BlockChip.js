import { Chip } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  root: {
    margin: `${theme.spacing(1) / 2}px 0`,
    width: '100%'
  }
})

const BlockChip = withStyles(styles)(Chip)

export default BlockChip
