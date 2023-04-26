import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App06'
import './index.css'
import store from './store/Store06'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
