import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Getproducts from './components/Getproducts';
import Addproducts from './components/Addproducts';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Notfound from './components/Notfound';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Makepayment} from './components/Makepayment';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to SokoGarden</h1>
        </header>
        <nav>
          <Link to="/" className='btn btn-primary btn-sm m-2'>Home</Link>
          <Link to="/addproducts" className='btn btn-primary btn-sm m-2'>Add Product</Link>
          <Link to="/signin" className='btn btn-primary btn-sm m-2'>Signin</Link>
          <Link to="/signup" className='btn btn-primary btn-sm m-2'>Sign Up</Link>
          
        </nav>
        {/* Below are our different Routes together with the rendered components */}
        <Routes>
          <Route path='/' element={ <Getproducts/>}/>
          <Route path='/addproducts' element={<Addproducts/>}/>
          <Route path='signup' element={<Signup/>}/>
          <Route path='signin' element={<Signin/>}/>
          <Route path='/makepayment' element={<Makepayment/>}/>
          <Route path='*' element={<Notfound/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
