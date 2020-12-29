import  React from 'react'
import { BrowserRouter} from 'react-router-dom'
import Routes from './routes'
import { history } from './store'
function App() {
  return (
    <BrowserRouter history={history}> 
      <Routes />
    </BrowserRouter>
  )
}

export default App;
