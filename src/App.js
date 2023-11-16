// Bibliotecas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Templates
import Catalago from './templates/Catalago.jsx/Catalago';
import Carrinho from './templates/Cart/Carrinho'

function Peining() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Catalago />} />
        <Route path='/cart' element={<Carrinho/>} />
      </Routes>
    </Router>
  );
}

export default Peining;
