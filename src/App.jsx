import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Create from './pages/Create'
import Settings from './pages/Settings'
import ProtectedRoute from './contexts/ProtectedRoute'
function App() {
 
  return (
    <>
      <Router>
        <Navbar />
        <div className="pt-14 bg-gray-100">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route element={<ProtectedRoute/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/settings' element={<Settings/>}/>
          </Route>
        </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
