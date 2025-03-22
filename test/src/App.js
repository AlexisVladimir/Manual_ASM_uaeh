import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
// Puedes eliminar Home si no lo necesitas
// import Home from './pages/Home';

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Si quieres que MainPage sea la raíz, usa path="/" */}
      <Route path="/" element={<MainPage />} />
      {/* O mantén /main como la ruta principal */}
      {/* <Route path="/main" element={<MainPage />} */}
    </Routes>
  </Router>
);

export default AppRoutes;