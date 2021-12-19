import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { CssBaseline } from '@material-ui/core'
import { IntlProvider } from 'react-intl'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'
import DateFnsUtils from '@date-io/date-fns'
import locale from 'date-fns/locale/en-US'
import ReactDOM from 'react-dom'
import Themes from './themes'

import intlConfig from './config/intl'
import './index.css'
import App from './App'
import { LayoutProvider } from './context/LayoutContext'
import { UserProvider } from './context/UserContext'
import store from './store'

if (locale && locale.options) {
  locale.options.weekStartsOn = 1
}

ReactDOM.render(
  <LayoutProvider>
    <UserProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <Provider store={store}>
          <IntlProvider {...intlConfig}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
              <App />
            </MuiPickersUtilsProvider>
          </IntlProvider>
        </Provider>
      </ThemeProvider>
    </UserProvider>
  </LayoutProvider>,
  document.getElementById('root')
)

store.subscribe(() => {
  const state = store.getState()
  console.log('redux', state)
})
