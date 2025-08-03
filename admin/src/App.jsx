import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Layout from './layout/Layout'
import Books from './pages/Books';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import AddBook from "./pages/AddBook";

const App = () => {
  return (
    <>
      <Router>
        <Routes>

          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />} >
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path='/books' element={<Books />}/>
              <Route path='/orders' element={<Orders />}/>
              <Route path='/customers' element={<Customers />}/>
              <Route path='/add-book' element={<AddBook />}/>
              <Route path="/edit-book/:bookId" element={<AddBook />} />
            </Route>
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App