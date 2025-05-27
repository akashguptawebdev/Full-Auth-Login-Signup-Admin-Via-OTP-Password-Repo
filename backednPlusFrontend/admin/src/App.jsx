import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store'
import { BrowserRouter as Router } from 'react-router-dom';
import RoutePage from './pages/RoutePage';
import { ToastContainer } from 'react-toastify';
function App() {

  return (
    <>
     <Provider store={store}>
     <Router>
     <RoutePage />

     <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
     </Router>
     </Provider>
    </>
  )
}

export default App
