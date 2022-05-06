import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import  Home  from '../src/pages/Home'
import  Form  from '../src/pages/Form'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/Form/:id" element={<Form />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
