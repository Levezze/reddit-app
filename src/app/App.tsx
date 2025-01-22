import { Outlet } from 'react-router-dom';
import '../App.css';
import Header from './components/Header/Header';
// import AppRoutes from './routes';

function App() {
  return (
    <>
      <Header />
      {/* <Header /> */}
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App;
