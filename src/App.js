import logo from './logo.svg';
import './App.css';
import Navbar from './layouts/navBarNFooter/Navbar';
import Footer from './layouts/navBarNFooter/Footer';
import Home from './layouts/Component/Home';


const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default App;