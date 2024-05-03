import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Page from './components/Page'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Login/>} path='/login'/>
          <Route element={<Signup/>} path='/signup'/>
          <Route element={<Page/>} path=''/>
        </Routes>
      </Router>
    </>
  )
}

export default App
