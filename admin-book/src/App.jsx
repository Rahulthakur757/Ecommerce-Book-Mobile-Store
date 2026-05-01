import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login';
import DefaultLayout from './DefaultLayout';

function App() {
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Login></Login> }></Route>
      <Route path='*' element={ <DefaultLayout></DefaultLayout>}></Route>
    </Routes>
    </BrowserRouter>
    </>
    
  )
}
export default App