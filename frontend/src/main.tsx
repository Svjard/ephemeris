import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Store } from 'redux'
import { History } from 'history'
import { ThemeProvider } from 'emotion-theming'

import Routes from './routes'
import { ApplicationState } from './store'
import LayoutContainer from './containers/LayoutContainer'
import './scss/styles.scss'

// Any additional component props go here.
interface MainProps {
  store: Store<ApplicationState>
  history: History
}

// Create an intersection type of the component props and our Redux props.
const Main: React.FC<MainProps> = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <LayoutContainer>
          {({ theme }) => (
            <ThemeProvider theme={({})}>
              <Routes />
            </ThemeProvider>
          )}
        </LayoutContainer>
      </ConnectedRouter>
    </Provider>
  )
}

export default Main
