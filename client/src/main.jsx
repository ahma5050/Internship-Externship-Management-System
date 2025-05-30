import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemContextProvider } from './context/ThemContext.jsx'
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SocketProvider } from "./context/SocketContext";


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <PersistGate persistor={persistor}>
  <ThemContextProvider>
  <Provider store={store}>
  <SocketProvider>
    <App/>
    </SocketProvider>
    </Provider>
    </ThemContextProvider>
    </PersistGate>
  </StrictMode>,
)
