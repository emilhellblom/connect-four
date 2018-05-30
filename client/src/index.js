import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import {Provider} from 'react-redux'
import store from './store'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';



const theme = createMuiTheme({
  palette: {
    type: 'dark',
	},
	 overrides: {
    primary: 'green',
  //   // Name of the component ⚛️ / style shee
  //   MuiButton: {
  //     // Name of the rule
  //     root: {
  //       // Some CSS
  //       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  //       borderRadius: 3,
  //       border: 0,
  //       color: 'white',
  //       height: 48,
  //       padding: '0 30px',
  //       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  //     },
  //   },
  },
});

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
)
registerServiceWorker()
