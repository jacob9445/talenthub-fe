import React from 'react'
import { CssBaseline } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import ReactDOM from 'react-dom'
import Themes from "./themes"
import { Provider } from 'react-redux'

import './index.css'
import App from './App'
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import store from './store'


ReactDOM.render(
  <LayoutProvider>
    <UserProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </UserProvider>
  </LayoutProvider>,
  document.getElementById('root')
);

store.subscribe( ()=> console.log('redux', store.getState()));