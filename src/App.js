import  React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes'
import { history } from './store'
function App() {
  return (
    <Router history={history}> 
      <Routes />
    </Router>
  )
}

export default App;
