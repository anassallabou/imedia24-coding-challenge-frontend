import './App.css';
import ProductsComponent from './components/products';
import NavbarComponent from './components/navBar';
import { UIView } from "@uirouter/react";


function App() {
  return (
    <div className="App">
        <NavbarComponent />
        <UIView />
    </div>
  );
}

export default App;
