import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Supp from "./Components/Supp";
import Footer from "./Components/Footer";
import MacBookPro1 from "./Components/MacBookPro1";
function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
        <Home />
        <Supp />
        <MacBookPro1 />
        <Footer />
      </div>
    </div>
  );
}

export default App;
