import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// no strict mode for dev
ReactDOM.createRoot(document.getElementById('root')).render(
    <App />,
)
// strict mode for production
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
